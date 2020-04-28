import { connect, Connection, Channel, ConfirmChannel } from 'amqplib'
import { AmqpQueue, AmqpQueueOptions } from './amqp-queue'
import { AmqpExchange, AmqpExchangeOptions } from './amqp-exchange'

import { AmqpUnreadyError } from './errors'

interface AmqpConfig {
  confirm?: boolean
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

  static safeChannel (
    channel?: Channel | null
  ): Channel {
    if (channel == null) {
      throw new AmqpUnreadyError()
    }

    return channel
  }

  _getChannel (): Channel {
    const channel = Amqp.safeChannel(this.channel)
    return channel
  }

  async connect (
    ...args: Parameters<typeof connect>
  ): Promise<Channel> {
    this.connection = await connect(...args)

    const confirm = this.config.confirm ?? false
    this.channel = (confirm)
      ? await this.connection.createConfirmChannel()
      : await this.connection.createChannel()

    const prefetch = this.config.prefetch ?? 0
    if (prefetch > 0) {
      await this.channel.prefetch(prefetch)
    }

    return this.channel
  }

  async disconnect (): Promise<void> {
    try {
      if (this.channel != null) {
        await this.channel.close()
      }
    } finally {
      if (this.connection != null) {
        await this.connection.close()
      }
    }
  }

  defineExchange (
    exchangeName: string,
    options?: AmqpExchangeAmqpOptions
  ): AmqpExchange {
    const trueExchangeName = options?.exchangeName ?? exchangeName

    this.exchanges[exchangeName] = new AmqpExchange(this, trueExchangeName, options)

    return this.exchanges[exchangeName]
  }

  defineQueue (
    queueName: string,
    options?: AmqpQueueAmqpOptions
  ): AmqpQueue {
    const trueQueueName = options?.queueName ?? queueName

    this.queues[queueName] = new AmqpQueue(this, trueQueueName, options)

    return this.queues[queueName]
  }

  exchange (name: string): AmqpExchange | null {
    return this.exchanges[name]
  }

  queue (name: string): AmqpQueue | null {
    return this.queues[name]
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

  static isConfirm (
    channel: Channel
  ): channel is ConfirmChannel {
    // Yeah, I know, it's always true.
    // But not at runtime actually
    /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
    return !!(channel as ConfirmChannel).waitForConfirms
  }
}

export default Amqp
export {
  Amqp,
  AmqpConfig,
  AmqpQueueAmqpOptions,
  AmqpExchangeAmqpOptions
}
