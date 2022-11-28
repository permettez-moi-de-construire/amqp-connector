import { Amqp } from './amqp'
import {
  Channel,
  Options,
  Replies,
  ConsumeMessage,
  Message
} from 'amqplib'
import { Buffer } from 'buffer'

import {
  AmqpUnexpectedReplyToError
} from './errors'
import { CustomMessageContentSerializer } from './amqp-exchange'

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

interface ConsumeCustomMessage <T> extends Omit<ConsumeMessage, 'content'> {
  content: T
}

type OnMessageCallback = (msg: ConsumeMessage) => any
type OnJsonMessageCallback = (msg: ConsumeJsonMessage) => any
type OnCustomMessageCallback <T> = (msg: ConsumeCustomMessage<T>) => any

type CustomMessageContentParser <T> = (rawContent: Buffer) => T

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

  _getAssertOptions (): Options.AssertQueue {
    const {
      defaultPersistentMessages,
      ...queueOptions
    } = this.options

    return queueOptions
  }

  _getPublishOptions (): Options.Publish {
    const {
      defaultPersistentMessages: persistent
    } = this.options

    return { persistent }
  }

  _getChannel (): Channel {
    const channel = Amqp.safeChannel(this.amqp.channel)

    return channel
  }

  async assert (): Promise<Replies.AssertQueue> {
    const channel = this._getChannel()

    return await channel.assertQueue(
      this.name,
      this._getAssertOptions()
    )
  }

  async delete (
    options?: Options.DeleteQueue
  ): Promise<Replies.DeleteQueue> {
    const channel = this._getChannel()

    return await channel.deleteQueue(
      this.name,
      options
    )
  }

  static async _sendAsPromise (
    channel: Channel,
    queueName: string,
    data: Buffer,
    options: Options.Publish
  ): Promise<Replies.Empty> {
    return Amqp.isConfirm(channel)
      ? await new Promise((resolve, reject) => {
        channel.sendToQueue(queueName, data, options,
          (err, ok) => {
            if (err != null) {
              return reject(err)
            }
            resolve(ok)
          }
        )
      })
      : await new Promise((resolve) => {
        channel.sendToQueue(queueName, data, options)
        resolve({})
      })
  }

  async send (
    data: Buffer,
    options?: Options.Publish
  ): Promise<Replies.Empty> {
    const channel = this._getChannel()

    return await AmqpQueue._sendAsPromise(
      channel,
      this.name,
      data,
      {
        ...this._getPublishOptions(),
        ...options
      }
    )
  }

  async sendJson (
    data: object,
    options?: Options.Publish
  ): Promise<Replies.Empty> {
    const formattedData = Buffer.from(JSON.stringify(data))

    return await this.send(
      formattedData,
      options
    )
  }

  async sendCustom <T> (
    data: T,
    serializer: CustomMessageContentSerializer<T>,
    options?: Options.Publish
  ): Promise<Replies.Empty> {
    const formattedData = serializer(data)

    return await this.send(
      formattedData,
      options
    )
  }

  async consume (
    callback: OnMessageCallback,
    options: Options.Consume
  ): Promise<Replies.Consume> {
    const channel = this._getChannel()

    const safeCallback = (msg: ConsumeMessage | null): void => {
      if (msg == null) {
        return
      }

      callback.call(this.amqp.channel, msg)
    }

    return await channel.consume(
      this.name,
      safeCallback,
      options
    )
  }

  async consumeJson (
    callback: OnJsonMessageCallback,
    options: Options.Consume
  ): Promise<Replies.Consume> {
    const channel = this._getChannel()

    const jsonCallback = (msg: ConsumeMessage): void => {
      const contentString = msg.content.toString()
      const contentObj = JSON.parse(contentString)

      callback.call(channel, {
        ...msg,
        content: contentObj
      })
    }

    return await this.consume(
      jsonCallback,
      options
    )
  }

  async consumeCustom <T> (
    callback: OnCustomMessageCallback<T>,
    parser: CustomMessageContentParser<T>,
    options: Options.Consume
  ): Promise<Replies.Consume> {
    const channel = this._getChannel()

    const customCallback = (msg: ConsumeMessage): void => {
      const parsedContent = parser(msg.content)

      callback.call(channel, {
        ...msg,
        content: parsedContent
      })
    }

    return await this.consume(
      customCallback,
      options
    )
  }

  async cancel (
    ...args: Parameters<Channel['cancel']>
  ): ReturnType<Channel['cancel']> {
    const channel = this._getChannel()

    return await channel.cancel(...args)
  }

  static _getReplyQueue (
    amqp: Amqp,
    originMessage: Message,
    queueOptions?: AmqpQueueOptions
  ): AmqpQueue {
    const { replyTo } = originMessage.properties

    if (replyTo == null) {
      throw new AmqpUnexpectedReplyToError()
    }

    const replyQueue = new AmqpQueue(
      amqp,
      replyTo,
      queueOptions
    )

    return replyQueue
  }

  static reply = (
    amqp: Amqp,
    originMessage: Message,
    queueOptions?: AmqpQueueOptions
  ) => async (
    data: Buffer,
    msgOptions?: Options.Publish
  ): Promise<Replies.Empty> => {
    const replyQueue = AmqpQueue._getReplyQueue(
      amqp,
      originMessage,
      queueOptions
    )

    const { correlationId } = originMessage.properties

    return await replyQueue.send(
      data,
      {
        ...msgOptions,
        correlationId
      }
    )
  }

  static replyJson = (
    amqp: Amqp,
    originMessage: Message,
    queueOptions?: AmqpQueueOptions
  ) => async (
    data: object,
    msgOptions?: Options.Publish
  ): Promise<Replies.Empty> => {
    const replyQueue = AmqpQueue._getReplyQueue(amqp, originMessage, queueOptions)

    const { correlationId } = originMessage.properties

    return await replyQueue.sendJson(
      data,
      {
        ...msgOptions,
        correlationId
      }
    )
  }

  ack (
    ...args: Parameters<Channel['ack']>
  ): ReturnType<Channel['ack']> {
    const channel = this._getChannel()

    return channel.ack(...args)
  }

  nack (
    ...args: Parameters<Channel['nack']>
  ): ReturnType<Channel['nack']> {
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
