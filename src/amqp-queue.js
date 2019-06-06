const { ConfirmChannel } = require('amqplib/lib/channel_model')
const Buffer = require('buffer').Buffer

const { AmqpUnreadyError } = require('./errors')

class AmqpQueue {
  constructor (amqp, name, options) {
    this.amqp = amqp
    this.name = name

    this.options = {
      durable: true,
      defaultPersistentMessages: true,
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

    return this.amqp.channel.assertQueue(this.name, {
      durable: this.options.durable
    })
  }

  async delete () {
    this._checkChannel()

    return this.amqp.channel.deleteQueue(this.name)
  }

  async send (data, options) {
    this._checkChannel()

    const sendAsPromise = (this.amqp.channel instanceof ConfirmChannel)
      ? new Promise((resolve, reject) => {
        this.amqp.channel.sendToQueue(this.name, data, {
          persistent: this.options.defaultPersistentMessages,
          ...options
        }, (err, ok) => {
          if (err) {
            return reject(err)
          }
          resolve(ok)
        })
      })
      : this.amqp.channel.sendToQueue(this.name, data, {
        persistent: this.options.defaultPersistentMessages,
        ...options
      })

    return sendAsPromise
  }

  async sendJson (data, options) {
    const formattedData = Buffer.from(JSON.stringify(data))
    return this.send(formattedData, options)
  }

  consume (callback, options) {
    this._checkChannel()

    return this.amqp.channel.consume(this.name, callback, options)
  }

  consumeJson (callback, options) {
    this._checkChannel()

    return this.amqp.channel.consume(this.name, evtBuf => {
      const evtContentString = evtBuf.content.toString()
      const evtContentObj = JSON.parse(evtContentString)

      // eslint-disable-next-line standard/no-callback-literal
      callback({
        ...evtBuf,
        content: evtContentObj
      })
    }, options)
  }

  async ack (event) {
    this._checkChannel()

    return this.amqp.channel.ack(event)
  }
  async nack (event, requeue) {
    this._checkChannel()

    return this.amqp.channel.nack(event, false, requeue)
  }
}

module.exports = AmqpQueue
