import {
  Channel,
  Options,
  Replies
} from 'amqplib'
import { Amqp } from './amqp'
import { AmqpQueue } from './amqp-queue'
import { Buffer } from 'buffer'

type AmqpExchangeType = 'direct' | 'topic' | 'headers' | 'fanout'

interface _AmqpExchangeOptions extends Options.AssertExchange {
  defaultPersistentMessages?: boolean
}

interface AmqpExchangeOptions extends _AmqpExchangeOptions {
  defaultPersistentMessages?: boolean
  type?: AmqpExchangeType
}

const defaultOptions: AmqpExchangeOptions = {
  durable: true,
  defaultPersistentMessages: true
}

const defaultType: AmqpExchangeType = 'fanout'

class AmqpExchange {
  readonly amqp: Amqp
  readonly name: string
  readonly type: AmqpExchangeType
  readonly options: _AmqpExchangeOptions

  constructor (
    amqp: Amqp,
    name: string,
    options?: AmqpExchangeOptions
  ) {
    this.amqp = amqp
    this.name = name
    this.type = options?.type ?? defaultType

    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  _getAssertOptions (): Options.AssertExchange {
    const {
      defaultPersistentMessages,
      ...assertOptions
    } = this.options

    return assertOptions
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

  async assert (): Promise<Replies.AssertExchange> {
    const channel = this._getChannel()

    return await channel.assertExchange(
      this.name,
      this.type,
      this._getAssertOptions()
    )
  }

  async bindQueue (
    amqpQueue: AmqpQueue,
    bindingKey: string,
    options?: any
  ): Promise<Replies.Empty> {
    const channel = this._getChannel()

    return await channel.bindQueue(
      amqpQueue.name,
      this.name,
      bindingKey,
      options
    )
  }

  static async _sendAsPromise (
    channel: Channel,
    exchangeName: string,
    routingKey: string,
    data: Buffer,
    options: Options.Publish
  ): Promise<Replies.Empty> {
    return Amqp.isConfirm(channel)
      ? await new Promise((resolve, reject) => {
        channel.publish(exchangeName, routingKey, data, options,
          (err, ok) => {
            if (err != null) {
              return reject(err)
            }
            resolve(ok)
          }
        )
      })
      : await new Promise((resolve) => {
        channel.publish(exchangeName, routingKey, data, options)
        resolve({})
      })
  }

  async send (
    routingKey: string,
    data: Buffer,
    options?: Options.Publish
  ): Promise<Replies.Empty> {
    const channel = this._getChannel()

    return await AmqpExchange._sendAsPromise(
      channel,
      this.name,
      routingKey,
      data,
      {
        ...this._getPublishOptions(),
        ...options
      }
    )
  }

  async sendJson (
    routingKey: string,
    data: object,
    options?: Options.Publish
  ): Promise<Replies.Empty> {
    const formattedData = Buffer.from(JSON.stringify(data))

    return await this.send(
      routingKey,
      formattedData,
      options
    )
  }
}

export default AmqpExchange
export {
  AmqpExchange,
  AmqpExchangeType,
  AmqpExchangeOptions
}
