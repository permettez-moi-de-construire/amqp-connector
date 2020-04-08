[@permettezmoideconstruire/amqp-connector](../README.md) › [Globals](../globals.md) › ["amqp-exchange"](../modules/_amqp_exchange_.md) › [AmqpExchange](_amqp_exchange_.amqpexchange.md)

# Class: AmqpExchange

## Hierarchy

* **AmqpExchange**

## Index

### Constructors

* [constructor](_amqp_exchange_.amqpexchange.md#constructor)

### Properties

* [amqp](_amqp_exchange_.amqpexchange.md#amqp)
* [name](_amqp_exchange_.amqpexchange.md#name)
* [options](_amqp_exchange_.amqpexchange.md#options)
* [type](_amqp_exchange_.amqpexchange.md#type)

### Methods

* [_getAssertOptions](_amqp_exchange_.amqpexchange.md#_getassertoptions)
* [_getChannel](_amqp_exchange_.amqpexchange.md#_getchannel)
* [_getPublishOptions](_amqp_exchange_.amqpexchange.md#_getpublishoptions)
* [assert](_amqp_exchange_.amqpexchange.md#assert)
* [bindQueue](_amqp_exchange_.amqpexchange.md#bindqueue)
* [send](_amqp_exchange_.amqpexchange.md#send)
* [sendJson](_amqp_exchange_.amqpexchange.md#sendjson)
* [_sendAsPromise](_amqp_exchange_.amqpexchange.md#static-_sendaspromise)

## Constructors

###  constructor

\+ **new AmqpExchange**(`amqp`: [Amqp](_amqp_.amqp.md), `name`: string, `options?`: [AmqpExchangeOptions](../interfaces/_amqp_exchange_.amqpexchangeoptions.md)): *[AmqpExchange](_amqp_exchange_.amqpexchange.md)*

*Defined in [src/amqp-exchange.ts:35](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`amqp` | [Amqp](_amqp_.amqp.md) |
`name` | string |
`options?` | [AmqpExchangeOptions](../interfaces/_amqp_exchange_.amqpexchangeoptions.md) |

**Returns:** *[AmqpExchange](_amqp_exchange_.amqpexchange.md)*

## Properties

###  amqp

• **amqp**: *[Amqp](_amqp_.amqp.md)*

*Defined in [src/amqp-exchange.ts:32](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L32)*

___

###  name

• **name**: *string*

*Defined in [src/amqp-exchange.ts:33](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L33)*

___

###  options

• **options**: *[_AmqpExchangeOptions](../interfaces/_amqp_exchange_._amqpexchangeoptions.md)*

*Defined in [src/amqp-exchange.ts:35](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L35)*

___

###  type

• **type**: *[AmqpExchangeType](../modules/_amqp_exchange_.md#amqpexchangetype)*

*Defined in [src/amqp-exchange.ts:34](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L34)*

## Methods

###  _getAssertOptions

▸ **_getAssertOptions**(): *AssertExchange*

*Defined in [src/amqp-exchange.ts:48](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L48)*

**Returns:** *AssertExchange*

___

###  _getChannel

▸ **_getChannel**(): *Channel*

*Defined in [src/amqp-exchange.ts:65](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L65)*

**Returns:** *Channel*

___

###  _getPublishOptions

▸ **_getPublishOptions**(): *Publish*

*Defined in [src/amqp-exchange.ts:57](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L57)*

**Returns:** *Publish*

___

###  assert

▸ **assert**(): *Promise‹AssertExchange›*

*Defined in [src/amqp-exchange.ts:71](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L71)*

**Returns:** *Promise‹AssertExchange›*

___

###  bindQueue

▸ **bindQueue**(`amqpQueue`: [AmqpQueue](_amqp_queue_.amqpqueue.md), `bindingKey`: string, `options?`: any): *Promise‹void›*

*Defined in [src/amqp-exchange.ts:81](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`amqpQueue` | [AmqpQueue](_amqp_queue_.amqpqueue.md) |
`bindingKey` | string |
`options?` | any |

**Returns:** *Promise‹void›*

___

###  send

▸ **send**(`routingKey`: string, `data`: Buffer, `options?`: Options.Publish): *Promise‹Empty›*

*Defined in [src/amqp-exchange.ts:116](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`routingKey` | string |
`data` | Buffer |
`options?` | Options.Publish |

**Returns:** *Promise‹Empty›*

___

###  sendJson

▸ **sendJson**(`routingKey`: string, `data`: object, `options?`: Options.Publish): *Promise‹Empty›*

*Defined in [src/amqp-exchange.ts:131](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`routingKey` | string |
`data` | object |
`options?` | Options.Publish |

**Returns:** *Promise‹Empty›*

___

### `Static` _sendAsPromise

▸ **_sendAsPromise**(`channel`: Channel, `exchangeName`: string, `routingKey`: string, `data`: Buffer, `options`: Publish): *Promise‹Empty›*

*Defined in [src/amqp-exchange.ts:92](https://github.com/permettez-moi-de-construire/amqp-connector/blob/3742247/src/amqp-exchange.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`channel` | Channel |
`exchangeName` | string |
`routingKey` | string |
`data` | Buffer |
`options` | Publish |

**Returns:** *Promise‹Empty›*
