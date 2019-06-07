const { describe, it } = require('mocha')
const { assert } = require('chai')

const AmqpQueue = require('../src/amqp-queue')

describe('AmqpQueue', () => {
  describe('_checkName', () => {
    it('should pass', () => {
      const queue = new AmqpQueue({}, 'my-queue')
      queue._checkName()
    })

    it('should throw without name', () => {
      const queue = new AmqpQueue({})
      assert.throws(queue._checkName.bind(queue))
      queue.name = null
      assert.throws(queue._checkName.bind(queue))
      queue.name = undefined
      assert.throws(queue._checkName.bind(queue))
      queue.name = 0
      assert.throws(queue._checkName.bind(queue))
      queue.name = ''
      assert.throws(queue._checkName.bind(queue))
    })

    it('shouldn\'t throw with name set afterward', () => {
      const queue = new AmqpQueue({})
      queue.name = 'queue-name'
      assert.doesNotThrow(queue._checkName.bind(queue))
    })
  })

  describe('assert', () => {
    it('should pass', async () => {
      const queue = new AmqpQueue({ channel: {
        assertQueue: async () => ({
          queue: 'my-queue'
        })
      } }, 'my-queue')
      await queue.assert()
    })

    it('should throw AmqpUnreadyError', async () => {
      const queue = new AmqpQueue(null, 'my-queue')
      await assert.isRejected(queue.assert())
    })
  })
})
