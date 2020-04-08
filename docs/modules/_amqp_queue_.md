[@permettezmoideconstruire/amqp-connector](../README.md) › [Globals](../globals.md) › ["amqp-queue"](_amqp_queue_.md)

# Module: "amqp-queue"

## Index

### Classes

* [AmqpQueue](../classes/_amqp_queue_.amqpqueue.md)

### Interfaces

* [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md)
* [ConsumeJsonMessage](../interfaces/_amqp_queue_.consumejsonmessage.md)

### Type aliases

* [OnJsonMessageCallback](_amqp_queue_.md#onjsonmessagecallback)
* [OnMessageCallback](_amqp_queue_.md#onmessagecallback)
* [_onMessage](_amqp_queue_.md#_onmessage)

### Object literals

* [defaultOptions](_amqp_queue_.md#const-defaultoptions)

## Type aliases

###  OnJsonMessageCallback

Ƭ **OnJsonMessageCallback**: *function*

*Defined in [src/amqp-queue.ts:32](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L32)*

#### Type declaration:

▸ (`msg`: [ConsumeJsonMessage](../interfaces/_amqp_queue_.consumejsonmessage.md)): *any*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | [ConsumeJsonMessage](../interfaces/_amqp_queue_.consumejsonmessage.md) |

___

###  OnMessageCallback

Ƭ **OnMessageCallback**: *function*

*Defined in [src/amqp-queue.ts:31](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L31)*

#### Type declaration:

▸ (`msg`: ConsumeMessage): *any*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | ConsumeMessage |

___

###  _onMessage

Ƭ **_onMessage**: *function*

*Defined in [src/amqp-queue.ts:30](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L30)*

#### Type declaration:

▸ (`msg`: ConsumeMessage | null): *any*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | ConsumeMessage &#124; null |

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [src/amqp-queue.ts:21](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L21)*

###  defaultPersistentMessages

• **defaultPersistentMessages**: *true* = true

*Defined in [src/amqp-queue.ts:23](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L23)*

###  durable

• **durable**: *true* = true

*Defined in [src/amqp-queue.ts:22](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L22)*
