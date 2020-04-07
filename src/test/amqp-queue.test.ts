import { describe, it, beforeEach } from 'mocha'
import { assert } from 'chai'
import Bluebird from 'bluebird'

import AmqpQueue from '../amqp-queue'
import Amqp from '../amqp'
import { Replies, Channel } from 'amqplib'

describe('AmqpQueue', () => {
  let amqp: Amqp
  beforeEach(() => {
    amqp = new Amqp()
  })

  // describe('_checkName', () => {
  //   it('should pass', () => {
  //     const queue = new AmqpQueue(amqp, 'my-queue')
  //     queue._checkName()
  //   })

  //   it('should throw without name', () => {
  //     const queue = new AmqpQueue({})
  //     assert.throws(queue._checkName.bind(queue))
  //     queue.name = null
  //     assert.throws(queue._checkName.bind(queue))
  //     queue.name = undefined
  //     assert.throws(queue._checkName.bind(queue))
  //     queue.name = 0
  //     assert.throws(queue._checkName.bind(queue))
  //     queue.name = ''
  //     assert.throws(queue._checkName.bind(queue))
  //   })

  //   it('shouldn\'t throw with name set afterward', () => {
  //     const queue = new AmqpQueue({})
  //     queue.name = 'queue-name'
  //     assert.doesNotThrow(queue._checkName.bind(queue))
  //   })
  // })

  describe('assert', () => {
    it('should pass', async () => {
      const amqp = <Amqp> {
        channel: <Channel><unknown> {
          assertQueue: () => (<Bluebird<Replies.AssertQueue>> Promise.resolve(<Replies.AssertQueue>{
            queue: 'my-queue'
          }))
        }
      }

      const queue = new AmqpQueue(amqp, 'my-queue')
      await queue.assert()
    })

    // it('should pass without queue name', async () => {
    //   const amqp = <Amqp> {
    //     channel: <Channel><unknown> {
    //       assertQueue: () => (<Bluebird<Replies.AssertQueue>> Promise.resolve(<Replies.AssertQueue>{
    //         queue: 'my-queue'
    //       }))
    //     }
    //   }

    //   const queue = new AmqpQueue(amqp)
    //   await queue.assert()
    // })

    // it('should fill name', async () => {
    //   const queue = new AmqpQueue({
    //     channel: {
    //       assertQueue: async () => ({
    //         queue: 'my-queue'
    //       })
    //     }
    //   }, null)
    //   await queue.assert()
    //   assert.ok(queue.name)
    //   assert.strictEqual(queue.name, 'my-queue')
    // })
  })
})
