[@permettezmoideconstruire/amqp-connector](../README.md) › [Globals](../globals.md) › ["amqp-queue"](../modules/_amqp_queue_.md) › [AmqpQueue](_amqp_queue_.amqpqueue.md)

# Class: AmqpQueue

## Hierarchy

* **AmqpQueue**

## Index

### Constructors

* [constructor](_amqp_queue_.amqpqueue.md#constructor)

### Properties

* [amqp](_amqp_queue_.amqpqueue.md#amqp)
* [name](_amqp_queue_.amqpqueue.md#name)
* [options](_amqp_queue_.amqpqueue.md#options)

### Methods

* [_getAssertOptions](_amqp_queue_.amqpqueue.md#_getassertoptions)
* [_getChannel](_amqp_queue_.amqpqueue.md#_getchannel)
* [_getPublishOptions](_amqp_queue_.amqpqueue.md#_getpublishoptions)
* [ack](_amqp_queue_.amqpqueue.md#ack)
* [assert](_amqp_queue_.amqpqueue.md#assert)
* [consume](_amqp_queue_.amqpqueue.md#consume)
* [consumeJson](_amqp_queue_.amqpqueue.md#consumejson)
* [delete](_amqp_queue_.amqpqueue.md#delete)
* [nack](_amqp_queue_.amqpqueue.md#nack)
* [send](_amqp_queue_.amqpqueue.md#send)
* [sendJson](_amqp_queue_.amqpqueue.md#sendjson)
* [_getReplyQueue](_amqp_queue_.amqpqueue.md#static-_getreplyqueue)
* [_sendAsPromise](_amqp_queue_.amqpqueue.md#static-_sendaspromise)
* [reply](_amqp_queue_.amqpqueue.md#static-reply)
* [replyJson](_amqp_queue_.amqpqueue.md#static-replyjson)

## Constructors

###  constructor

\+ **new AmqpQueue**(`amqp`: [Amqp](_amqp_.amqp.md), `name`: string, `userOptions?`: [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md)): *[AmqpQueue](_amqp_queue_.amqpqueue.md)*

*Defined in [src/amqp-queue.ts:37](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`amqp` | [Amqp](_amqp_.amqp.md) |
`name` | string |
`userOptions?` | [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md) |

**Returns:** *[AmqpQueue](_amqp_queue_.amqpqueue.md)*

## Properties

###  amqp

• **amqp**: *[Amqp](_amqp_.amqp.md)*

*Defined in [src/amqp-queue.ts:35](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L35)*

___

###  name

• **name**: *string*

*Defined in [src/amqp-queue.ts:36](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L36)*

___

###  options

• **options**: *[AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md)*

*Defined in [src/amqp-queue.ts:37](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L37)*

## Methods

###  _getAssertOptions

▸ **_getAssertOptions**(): *AssertQueue*

*Defined in [src/amqp-queue.ts:49](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L49)*

**Returns:** *AssertQueue*

___

###  _getChannel

▸ **_getChannel**(): *Channel*

*Defined in [src/amqp-queue.ts:66](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L66)*

**Returns:** *Channel*

___

###  _getPublishOptions

▸ **_getPublishOptions**(): *Publish*

*Defined in [src/amqp-queue.ts:58](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L58)*

**Returns:** *Publish*

___

###  ack

▸ **ack**(...`args`: Parameters‹Channel["ack"]›): *Promise‹void›*

*Defined in [src/amqp-queue.ts:214](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | Parameters‹Channel["ack"]› |

**Returns:** *Promise‹void›*

___

###  assert

▸ **assert**(): *Promise‹AssertQueue›*

*Defined in [src/amqp-queue.ts:72](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L72)*

**Returns:** *Promise‹AssertQueue›*

___

###  consume

▸ **consume**(`callback`: [OnMessageCallback](../modules/_amqp_queue_.md#onmessagecallback), `options`: Consume): *Promise‹Consume›*

*Defined in [src/amqp-queue.ts:132](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [OnMessageCallback](../modules/_amqp_queue_.md#onmessagecallback) |
`options` | Consume |

**Returns:** *Promise‹Consume›*

___

###  consumeJson

▸ **consumeJson**(`callback`: [OnJsonMessageCallback](../modules/_amqp_queue_.md#onjsonmessagecallback), `options`: Consume): *Promise‹Consume›*

*Defined in [src/amqp-queue.ts:150](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [OnJsonMessageCallback](../modules/_amqp_queue_.md#onjsonmessagecallback) |
`options` | Consume |

**Returns:** *Promise‹Consume›*

___

###  delete

▸ **delete**(`options?`: Options.DeleteQueue): *Promise‹DeleteQueue›*

*Defined in [src/amqp-queue.ts:81](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | Options.DeleteQueue |

**Returns:** *Promise‹DeleteQueue›*

___

###  nack

▸ **nack**(...`args`: Parameters‹Channel["nack"]›): *Promise‹void›*

*Defined in [src/amqp-queue.ts:220](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | Parameters‹Channel["nack"]› |

**Returns:** *Promise‹void›*

___

###  send

▸ **send**(`data`: Buffer, `options?`: Options.Publish): *Promise‹Empty›*

*Defined in [src/amqp-queue.ts:113](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Buffer |
`options?` | Options.Publish |

**Returns:** *Promise‹Empty›*

___

###  sendJson

▸ **sendJson**(`data`: object, `options?`: Options.Publish): *Promise‹Empty›*

*Defined in [src/amqp-queue.ts:127](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | object |
`options?` | Options.Publish |

**Returns:** *Promise‹Empty›*

___

### `Static` _getReplyQueue

▸ **_getReplyQueue**(`amqp`: [Amqp](_amqp_.amqp.md), `originMessage`: Message, `queueOptions?`: [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md)): *[AmqpQueue](_amqp_queue_.amqpqueue.md)‹›*

*Defined in [src/amqp-queue.ts:166](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`amqp` | [Amqp](_amqp_.amqp.md) |
`originMessage` | Message |
`queueOptions?` | [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md) |

**Returns:** *[AmqpQueue](_amqp_queue_.amqpqueue.md)‹›*

___

### `Static` _sendAsPromise

▸ **_sendAsPromise**(`channel`: Channel, `queueName`: string, `data`: Buffer, `options`: Publish): *Promise‹Empty›*

*Defined in [src/amqp-queue.ts:90](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`channel` | Channel |
`queueName` | string |
`data` | Buffer |
`options` | Publish |

**Returns:** *Promise‹Empty›*

___

### `Static` reply

▸ **reply**(`amqp`: [Amqp](_amqp_.amqp.md), `originMessage`: Message, `queueOptions?`: [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md)): *(Anonymous function)*

*Defined in [src/amqp-queue.ts:182](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`amqp` | [Amqp](_amqp_.amqp.md) |
`originMessage` | Message |
`queueOptions?` | [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md) |

**Returns:** *(Anonymous function)*

___

### `Static` replyJson

▸ **replyJson**(`amqp`: [Amqp](_amqp_.amqp.md), `originMessage`: Message, `queueOptions?`: [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md)): *(Anonymous function)*

*Defined in [src/amqp-queue.ts:198](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-queue.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`amqp` | [Amqp](_amqp_.amqp.md) |
`originMessage` | Message |
`queueOptions?` | [AmqpQueueOptions](../interfaces/_amqp_queue_.amqpqueueoptions.md) |

**Returns:** *(Anonymous function)*
