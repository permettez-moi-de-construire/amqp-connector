import { Amqp } from './amqp'
import {
  ConfirmChannel,
  Channel,
  Options,
  Replies,
  ConsumeMessage,
  Message
} from 'amqplib'
import { Buffer } from 'buffer'

import {
  AmqpUnreadyError,
  AmqpUnexpectedReplyToError
} from './errors'

interface AmqpQueueOptions extends Options.AssertQueue {
  defaultPersistentMessages?: boolean
}

const defaultOptions: AmqpQueueOptions = {
  durable: true,
  defaultPersistentMessages: true
}

interface ConsumeJsonMessage extends Omit<ConsumeMessage, 'content'> {
  content: object
}

type _onMessage = (msg: ConsumeMessage | null) => any
type OnMessageCallback = (msg: ConsumeMessage) => any
type OnJsonMessageCallback = (msg: ConsumeJsonMessage) => any

class AmqpQueue {
  readonly amqp: Amqp
  readonly name: string
  readonly options: AmqpQueueOptions

  constructor (amqp: Amqp, name: string, userOptions?: AmqpQueueOptions) {
    this.amqp = amqp
    this.name = name

    this.options = {
      ...defaultOptions,
      ...userOptions
    }
  }

  _getAssertOptions(): Options.AssertQueue {
    const {
      defaultPersistentMessages,
      ...queueOptions
    } = this.options

    return queueOptions
  }

  _getPublishOptions(): Options.Publish {
    const {
      defaultPersistentMessages: persistent
    } = this.options

    return { persistent }
  }

  _getChannel(): Channel {
    const channel = Amqp.safeChannel(this.amqp.channel)

    return channel
  }

  async assert (): Promise<Replies.AssertQueue> {
    const channel = this._getChannel()

    return channel.assertQueue(
      this.name,
      this._getAssertOptions()
    )
  }

  async delete (options?: Options.DeleteQueue) {
    const channel = this._getChannel()

    return channel.deleteQueue(
      this.name,
      options
    )
  }

  static async _sendAsPromise (
    channel: Channel,
    queueName: string,
    data: Buffer,
    options: Options.Publish
  ) : Promise<Replies.Empty> {
    return Amqp.isConfirm(channel)
      ? new Promise((resolve, reject) => {
        channel.sendToQueue(queueName, data, options,
          (err, ok) => {
            if (err) {
              return reject(err)
            }
            resolve(ok)
          }
        )
      })
      : new Promise((resolve) => {
        channel.sendToQueue(queueName, data, options)
        resolve({})
      })
  }

  async send (data: Buffer, options?: Options.Publish) {
    const channel = this._getChannel()

    return AmqpQueue._sendAsPromise(
      channel,
      this.name,
      data,
      {
        ...this._getPublishOptions(),
        ...options
      }
    )
  }

  async sendJson (data: object, options?: Options.Publish) {
    const formattedData = Buffer.from(JSON.stringify(data))
    return this.send(formattedData, options)
  }

  consume (callback: OnMessageCallback, options: Options.Consume): Promise<Replies.Consume> {
    const channel = this._getChannel()

    const safeCallback = (msg: ConsumeMessage | null) => {
      if (!msg) {
        return
      }

      callback.call(this.amqp.channel, msg)
    }

    return channel.consume(
      this.name,
      safeCallback,
      options
    )
  }

  consumeJson (callback: OnJsonMessageCallback, options: Options.Consume) {
    const channel = this._getChannel()

    const jsonCallback = (msg: ConsumeMessage) => {
      const contentString = msg.content.toString()
      const contentObj = JSON.parse(contentString)

      callback.call(channel, {
        ...msg,
        content: contentObj
      })
    }

    return this.consume(jsonCallback, options)
  }

  static _getReplyQueue (amqp: Amqp, originMessage: Message, queueOptions?: AmqpQueueOptions) {
    const { replyTo } = originMessage.properties

    if (!replyTo) {
      throw new AmqpUnexpectedReplyToError()
    }

    const replyQueue = new AmqpQueue(
      amqp,
      replyTo,
      queueOptions
    )

    return replyQueue
  }

  static reply (amqp: Amqp, originMessage: Message, queueOptions?: AmqpQueueOptions) {
    const replyQueue = AmqpQueue._getReplyQueue(amqp, originMessage, queueOptions)

    return async (data: Buffer, msgOptions?: Options.Publish) => {
      const { correlationId } = originMessage.properties

      replyQueue.send(
        data,
        {
          ...msgOptions,
          correlationId
        }
      )
    }
  }

  static replyJson (amqp: Amqp, originMessage: Message, queueOptions?: AmqpQueueOptions) {
    const replyQueue = AmqpQueue._getReplyQueue(amqp, originMessage, queueOptions)

    return async (data: object, msgOptions?: Options.Publish) => {
      const { correlationId } = originMessage.properties

      replyQueue.sendJson(
        data,
        {
          ...msgOptions,
          correlationId
        }
      )
    }
  }

  async ack (...args: Parameters<Channel['ack']>) {
    const channel = this._getChannel()

    return channel.ack(...args)
  }

  async nack (...args: Parameters<Channel['nack']>) {
    const channel = this._getChannel()

    return channel.nack(...args)
  }
}

export default AmqpQueue
export {
  AmqpQueue,
  AmqpQueueOptions,
  ConsumeJsonMessage,
  OnMessageCallback,
  OnJsonMessageCallback
}
