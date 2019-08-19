const amqplib = require('amqplib')
const AmqpQueue = require('./amqp-queue')
const AmqpExchange = require('./amqp-exchange')

const { AmqpUnreadyError } = require('./errors')

class Amqp {
  constructor (config) {
    this.connection = null
    this.channel = null
    this.exchanges = {}
    this.queues = {}
    this.config = {
      confirm: false,
      prefetch: false,
      ...config
    }
  }

  async connect (url) {
    this.connection = await amqplib.connect(url)
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

  defineExchange (exchangeName, options) {
    const trueExchangeName = (options && options.exchangeName) || exchangeName

    this.exchanges[exchangeName] = new AmqpExchange(this, trueExchangeName, options)

    return this.exchanges[exchangeName]
  }

  defineQueue (queueName, options) {
    const trueQueueName = (options && options.queueName) || queueName

    this.queues[queueName] = new AmqpQueue(this, trueQueueName, options)

    return this.queues[queueName]
  }

  exchange (name) {
    return this.exchanges[name]
  }

  queue (name) {
    return this.queues[name]
  }

  _checkChannel () {
    if (!this.channel) {
      throw new AmqpUnreadyError()
    }
  }

  async ack (event) {
    this._checkChannel()

    return this.channel.ack(event)
  }

  async nack (event, requeue) {
    this._checkChannel()

    return this.channel.nack(event, false, requeue)
  }
}

module.exports = Amqp
