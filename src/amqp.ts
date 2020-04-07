import { connect, Connection, Channel, ConfirmChannel } from 'amqplib'
import { AmqpQueue, AmqpQueueOptions } from './amqp-queue'
import { AmqpExchange, AmqpExchangeOptions } from './amqp-exchange'

import { AmqpUnreadyError } from './errors'

interface AmqpConfig {
  confirm?: boolean,
  prefetch?: number
}

const defaultConfig: AmqpConfig = {
  confirm: false,
  prefetch: undefined
}

interface AmqpQueueAmqpOptions extends AmqpQueueOptions {
  queueName?: string
}

interface AmqpExchangeAmqpOptions extends AmqpExchangeOptions {
  exchangeName?: string
}

class Amqp {
  connection: Connection | null
  channel: Channel | null
  readonly exchanges: Record<string, AmqpExchange>
  readonly queues: Record<string, AmqpQueue>
  readonly config: AmqpConfig

  constructor (config?: AmqpConfig) {
    this.connection = null
    this.channel = null
    this.exchanges = {}
    this.queues = {}
    this.config = {
      ...defaultConfig,
      ...config
    }
  }

  static safeChannel (channel?: Channel | null): Channel {
    if (!channel) {
      throw new AmqpUnreadyError()
    }

    return channel
  }

  _getChannel(): Channel {
    const channel = Amqp.safeChannel(this.channel)

    return channel
  }

  async connect (...args: Parameters<typeof connect>) {
    this.connection = await connect(...args)

    this.channel = this.config.confirm
      ? await this.connection.createConfirmChannel()
      : await this.connection.createChannel()

    if (this.config.prefetch) {
      this.channel.prefetch(this.config.prefetch)
    }
  }

  async disconnect () {
    try {
      if (this.channel) {
        await this.channel.close()
      }
    } finally {
      if (this.connection) {
        await this.connection.close()
      }
    }
  }

  defineExchange (exchangeName: string, options?: AmqpExchangeAmqpOptions) {
    const trueExchangeName = (options && options.exchangeName) || exchangeName

    this.exchanges[exchangeName] = new AmqpExchange(this, trueExchangeName, options)

    return this.exchanges[exchangeName]
  }

  defineQueue (queueName: string, options?: AmqpQueueAmqpOptions) {
    const trueQueueName = (options && options.queueName) || queueName

    this.queues[queueName] = new AmqpQueue(this, trueQueueName, options)

    return this.queues[queueName]
  }

  exchange (name: string) {
    return this.exchanges[name]
  }

  queue (name: string) {
    return this.queues[name]
  }

  async ack (...args: Parameters<Channel['ack']>) {
    const channel = this._getChannel()

    return channel.ack(...args)
  }

  async nack (...args: Parameters<Channel['nack']>) {
    const channel = this._getChannel()

    return channel.nack(...args)
  }

  static isConfirm (channel: Channel) : channel is ConfirmChannel {
    return !!(channel as ConfirmChannel).waitForConfirms
  }
}

export default Amqp
export { Amqp }
