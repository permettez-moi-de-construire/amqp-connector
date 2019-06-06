const { ConfirmChannel } = require('amqplib/lib/channel_model')
const Buffer = require('buffer').Buffer

const { AmqpUnreadyError } = require('./errors')

class AmqpExchange {
  constructor (amqp, name, options) {
    this.amqp = amqp
    this.name = name

    this.options = {
      durable: true,
      defaultPersistentMessages: true,
      type: 'fanout',
      ...options
    }
  }

  _checkChannel () {
    if (!this.amqp || !this.amqp.channel) {
      throw new AmqpUnreadyError()
    }
  }

  async assert () {
    this._checkChannel()

    return this.amqp.channel.assertExchange(this.name, this.options.type, {
      durable: this.options.durable
    })
  }

  async bindQueue (amqpQueue, bindingKey, options) {
    this._checkChannel()

    await this.amqp.channel.bindQueue(
      amqpQueue.name,
      this.name,
      bindingKey,
      options
    )
  }

  async send (routingKey, data, options) {
    this._checkChannel()

    const sendAsPromise = (this.amqp.channel instanceof ConfirmChannel)
      ? new Promise((resolve, reject) => {
        this.amqp.channel.publish(this.name, routingKey, data, {
          persistent: this.options.defaultPersistentMessages,
          ...options
        }, (err, ok) => {
          if (err) {
            return reject(err)
          }
          resolve(ok)
        })
      })
      : this.amqp.channel.publish(this.name, routingKey, data, {
        persistent: this.options.defaultPersistentMessages,
        ...options
      })

    return sendAsPromise
  }

  async sendJson (routingKey, data, options) {
    const formattedData = Buffer.from(JSON.stringify(data))
    return this.send(routingKey, formattedData, options)
  }
}

module.exports = AmqpExchange
