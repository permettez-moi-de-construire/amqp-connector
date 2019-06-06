class AmqpConnectorBaseError extends Error {
  constructor (msg) {
    super(msg || 'Base amqpConnector error')
    this.name = 'AmqpConnectorBaseError'
  }
}

class AmqpUnreadyError extends AmqpConnectorBaseError {
  constructor (msg) {
    super(msg || 'Amqp should be connected and have a channel')
    this.name = 'AmqpUnreadyError'
  }
}

class AmqpUnexpectedReplyToError extends AmqpConnectorBaseError {
  constructor (msg) {
    super(msg || 'No replyTo in message properties')
    this.name = 'AmqpUnexpectedReplyToError'
  }
}

module.exports = {
  AmqpConnectorBaseError,
  AmqpUnreadyError,
  AmqpUnexpectedReplyToError
}
