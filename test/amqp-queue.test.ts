import { describe, it } from 'mocha'

import AmqpQueue from '../src/amqp-queue'
import Amqp from '../src/amqp'
import { Replies, Channel } from 'amqplib'

describe('AmqpQueue', () => {
  describe('assert', () => {
    it('should pass', async () => {
      /* eslint-disable @typescript-eslint/consistent-type-assertions */
      const amqp: Amqp = <Amqp><unknown> {
        channel: <Channel><unknown> {
          assertQueue: async () => await (Promise.resolve(<Replies.AssertQueue>{
            queue: 'my-queue'
          }))
        }
      }

      const queue = new AmqpQueue(amqp, 'my-queue')
      await queue.assert()
    })
  })
})
