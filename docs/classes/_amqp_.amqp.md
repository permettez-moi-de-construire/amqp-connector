[@permettezmoideconstruire/amqp-connector](../README.md) › [Globals](../globals.md) › ["amqp"](../modules/_amqp_.md) › [Amqp](_amqp_.amqp.md)

# Class: Amqp

## Hierarchy

* **Amqp**

## Index

### Constructors

* [constructor](_amqp_.amqp.md#constructor)

### Properties

* [channel](_amqp_.amqp.md#channel)
* [config](_amqp_.amqp.md#config)
* [connection](_amqp_.amqp.md#connection)
* [exchanges](_amqp_.amqp.md#exchanges)
* [queues](_amqp_.amqp.md#queues)

### Methods

* [_getChannel](_amqp_.amqp.md#_getchannel)
* [ack](_amqp_.amqp.md#ack)
* [connect](_amqp_.amqp.md#connect)
* [defineExchange](_amqp_.amqp.md#defineexchange)
* [defineQueue](_amqp_.amqp.md#definequeue)
* [disconnect](_amqp_.amqp.md#disconnect)
* [exchange](_amqp_.amqp.md#exchange)
* [nack](_amqp_.amqp.md#nack)
* [queue](_amqp_.amqp.md#queue)
* [isConfirm](_amqp_.amqp.md#static-isconfirm)
* [safeChannel](_amqp_.amqp.md#static-safechannel)

## Constructors

###  constructor

\+ **new Amqp**(`config?`: [AmqpConfig](../interfaces/_amqp_.amqpconfig.md)): *[Amqp](_amqp_.amqp.md)*

*Defined in [src/amqp.ts:30](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`config?` | [AmqpConfig](../interfaces/_amqp_.amqpconfig.md) |

**Returns:** *[Amqp](_amqp_.amqp.md)*

## Properties

###  channel

• **channel**: *Channel | null*

*Defined in [src/amqp.ts:27](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L27)*

___

###  config

• **config**: *[AmqpConfig](../interfaces/_amqp_.amqpconfig.md)*

*Defined in [src/amqp.ts:30](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L30)*

___

###  connection

• **connection**: *Connection | null*

*Defined in [src/amqp.ts:26](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L26)*

___

###  exchanges

• **exchanges**: *Record‹string, [AmqpExchange](_amqp_exchange_.amqpexchange.md)›*

*Defined in [src/amqp.ts:28](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L28)*

___

###  queues

• **queues**: *Record‹string, [AmqpQueue](_amqp_queue_.amqpqueue.md)›*

*Defined in [src/amqp.ts:29](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L29)*

## Methods

###  _getChannel

▸ **_getChannel**(): *Channel*

*Defined in [src/amqp.ts:51](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L51)*

**Returns:** *Channel*

___

###  ack

▸ **ack**(...`args`: Parameters‹Channel["ack"]›): *Promise‹void›*

*Defined in [src/amqp.ts:105](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | Parameters‹Channel["ack"]› |

**Returns:** *Promise‹void›*

___

###  connect

▸ **connect**(...`args`: Parameters‹typeof connect›): *Promise‹void›*

*Defined in [src/amqp.ts:57](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | Parameters‹typeof connect› |

**Returns:** *Promise‹void›*

___

###  defineExchange

▸ **defineExchange**(`exchangeName`: string, `options?`: [AmqpExchangeAmqpOptions](../interfaces/_amqp_.amqpexchangeamqpoptions.md)): *[AmqpExchange](_amqp_exchange_.amqpexchange.md)‹›*

*Defined in [src/amqp.ts:81](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`exchangeName` | string |
`options?` | [AmqpExchangeAmqpOptions](../interfaces/_amqp_.amqpexchangeamqpoptions.md) |

**Returns:** *[AmqpExchange](_amqp_exchange_.amqpexchange.md)‹›*

___

###  defineQueue

▸ **defineQueue**(`queueName`: string, `options?`: [AmqpQueueAmqpOptions](../interfaces/_amqp_.amqpqueueamqpoptions.md)): *[AmqpQueue](_amqp_queue_.amqpqueue.md)‹›*

*Defined in [src/amqp.ts:89](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`queueName` | string |
`options?` | [AmqpQueueAmqpOptions](../interfaces/_amqp_.amqpqueueamqpoptions.md) |

**Returns:** *[AmqpQueue](_amqp_queue_.amqpqueue.md)‹›*

___

###  disconnect

▸ **disconnect**(): *Promise‹void›*

*Defined in [src/amqp.ts:69](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L69)*

**Returns:** *Promise‹void›*

___

###  exchange

▸ **exchange**(`name`: string): *[AmqpExchange](_amqp_exchange_.amqpexchange.md)‹›*

*Defined in [src/amqp.ts:97](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[AmqpExchange](_amqp_exchange_.amqpexchange.md)‹›*

___

###  nack

▸ **nack**(...`args`: Parameters‹Channel["nack"]›): *Promise‹void›*

*Defined in [src/amqp.ts:111](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | Parameters‹Channel["nack"]› |

**Returns:** *Promise‹void›*

___

###  queue

▸ **queue**(`name`: string): *[AmqpQueue](_amqp_queue_.amqpqueue.md)‹›*

*Defined in [src/amqp.ts:101](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[AmqpQueue](_amqp_queue_.amqpqueue.md)‹›*

___

### `Static` isConfirm

▸ **isConfirm**(`channel`: Channel): *channel is ConfirmChannel*

*Defined in [src/amqp.ts:117](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`channel` | Channel |

**Returns:** *channel is ConfirmChannel*

___

### `Static` safeChannel

▸ **safeChannel**(`channel?`: Channel | null): *Channel*

*Defined in [src/amqp.ts:43](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`channel?` | Channel &#124; null |

**Returns:** *Channel*
