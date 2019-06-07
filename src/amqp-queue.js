const { ConfirmChannel } = require('amqplib/lib/channel_model')
const Buffer = require('buffer').Buffer

const {
  AmqpConnectorBaseError,
  AmqpUnreadyError,
  AmqpUnexpectedReplyToError
} = require('./errors')

const defaultOptions = {
  durable: true,
  defaultPersistentMessages: true
}

class AmqpQueue {
  constructor (amqp, name, userOptions) {
    this.amqp = amqp
    this.name = name || null

    const options = {
      ...defaultOptions,
      ...userOptions
    }

    const {
      defaultPersistentMessages,
      ...queueOptions
    } = options

    this.defaultPersistentMessages = !!defaultPersistentMessages
    this.queueOptions = queueOptions
  }

  _checkChannel () {
    if (!this.amqp || !this.amqp.channel) {
      throw new AmqpUnreadyError()
    }
  }

  _checkName () {
    if (!this.name) {
      throw new AmqpConnectorBaseError('Queue have no name. It should be either set manually, or filled when `assert()`ing the queue')
    }
  }

  async assert () {
    this._checkChannel()

    const res = await this.amqp.channel.assertQueue(this.name, {
      ...this.queueOptions
    })

    this.name = res.queue

    return res
  }

  async delete () {
    this._checkChannel()
    this._checkName()

    return this.amqp.channel.deleteQueue(this.name)
  }

  async send (data, options) {
    this._checkChannel()
    this._checkName()

    const sendAsPromise = (this.amqp.channel instanceof ConfirmChannel)
      ? new Promise((resolve, reject) => {
        this.amqp.channel.sendToQueue(this.name, data, {
          persistent: this.defaultPersistentMessages,
          ...options
        }, (err, ok) => {
          if (err) {
            return reject(err)
          }
          resolve(ok)
        })
      })
      : this.amqp.channel.sendToQueue(this.name, data, {
        persistent: this.defaultPersistentMessages,
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
    this._checkName()

    return this.amqp.channel.consume(this.name, callback, options)
  }

  consumeJson (callback, options) {
    this._checkChannel()
    this._checkName()

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

  _getReplyQueue (originMessage, queueOptions) {
    this._checkChannel()

    const { replyTo } = originMessage.properties

    if (!replyTo) {
      throw new AmqpUnexpectedReplyToError()
    }

    const replyQueueOptions = {
      ...defaultOptions,
      ...queueOptions
    }

    const replyQueue = new AmqpQueue(
      this.amqp,
      replyTo,
      replyQueueOptions
    )

    return replyQueue
  }

  _getReply (replyFn) {
    return async function (originMessage, data, queueOptions, msgOptions) {
      const { correlationId } = originMessage.properties

      return replyFn(data, {
        correlationId,
        ...msgOptions
      })
    }
  }

  async reply (originMessage, data, queueOptions, msgOptions) {
    const replyQueue = this._getReplyQueue(originMessage, queueOptions)

    const _reply = this._getReply(replyQueue.send.bind(replyQueue))

    return _reply(
      originMessage,
      data,
      queueOptions,
      msgOptions
    )
  }

  async replyJson (originMessage, data, queueOptions, msgOptions) {
    const replyQueue = this._getReplyQueue(originMessage, queueOptions)

    const _reply = this._getReply(replyQueue.sendJson.bind(replyQueue))

    return _reply(
      originMessage,
      data,
      queueOptions,
      msgOptions
    )
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
