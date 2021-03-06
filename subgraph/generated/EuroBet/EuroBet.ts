// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class BettingClosed extends ethereum.Event {
  get params(): BettingClosed__Params {
    return new BettingClosed__Params(this);
  }
}

export class BettingClosed__Params {
  _event: BettingClosed;

  constructor(event: BettingClosed) {
    this._event = event;
  }
}

export class CashOut extends ethereum.Event {
  get params(): CashOut__Params {
    return new CashOut__Params(this);
  }
}

export class CashOut__Params {
  _event: CashOut;

  constructor(event: CashOut) {
    this._event = event;
  }

  get cashOutAmount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get odd(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ChainlinkCancelled extends ethereum.Event {
  get params(): ChainlinkCancelled__Params {
    return new ChainlinkCancelled__Params(this);
  }
}

export class ChainlinkCancelled__Params {
  _event: ChainlinkCancelled;

  constructor(event: ChainlinkCancelled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class ChainlinkFulfilled extends ethereum.Event {
  get params(): ChainlinkFulfilled__Params {
    return new ChainlinkFulfilled__Params(this);
  }
}

export class ChainlinkFulfilled__Params {
  _event: ChainlinkFulfilled;

  constructor(event: ChainlinkFulfilled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class ChainlinkRequested extends ethereum.Event {
  get params(): ChainlinkRequested__Params {
    return new ChainlinkRequested__Params(this);
  }
}

export class ChainlinkRequested__Params {
  _event: ChainlinkRequested;

  constructor(event: ChainlinkRequested) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class EtherReceived extends ethereum.Event {
  get params(): EtherReceived__Params {
    return new EtherReceived__Params(this);
  }
}

export class EtherReceived__Params {
  _event: EtherReceived;

  constructor(event: EtherReceived) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class NewBet extends ethereum.Event {
  get params(): NewBet__Params {
    return new NewBet__Params(this);
  }
}

export class NewBet__Params {
  _event: NewBet;

  constructor(event: NewBet) {
    this._event = event;
  }

  get etherAmount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get odd(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get teamName(): string {
    return this._event.parameters[2].value.toString();
  }

  get tokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get tokenUri(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }
}

export class OddRequestReceived extends ethereum.Event {
  get params(): OddRequestReceived__Params {
    return new OddRequestReceived__Params(this);
  }
}

export class OddRequestReceived__Params {
  _event: OddRequestReceived;

  constructor(event: OddRequestReceived) {
    this._event = event;
  }

  get requestId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get odd(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OddRequestSent extends ethereum.Event {
  get params(): OddRequestSent__Params {
    return new OddRequestSent__Params(this);
  }
}

export class OddRequestSent__Params {
  _event: OddRequestSent;

  constructor(event: OddRequestSent) {
    this._event = event;
  }

  get oracle(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get fee(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get endpoint(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class Winner extends ethereum.Event {
  get params(): Winner__Params {
    return new Winner__Params(this);
  }
}

export class Winner__Params {
  _event: Winner;

  constructor(event: Winner) {
    this._event = event;
  }

  get winner(): string {
    return this._event.parameters[0].value.toString();
  }
}

export class EuroBet__decodeBetTicketNFTResult {
  value0: BigInt;
  value1: BigInt;
  value2: string;

  constructor(value0: BigInt, value1: BigInt, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }
}

export class EuroBet extends ethereum.SmartContract {
  static bind(address: Address): EuroBet {
    return new EuroBet("EuroBet", address);
  }

  decodeBetTicketNFT(ticketUri: Bytes): EuroBet__decodeBetTicketNFTResult {
    let result = super.call(
      "decodeBetTicketNFT",
      "decodeBetTicketNFT(bytes):(uint256,uint256,string)",
      [ethereum.Value.fromBytes(ticketUri)]
    );

    return new EuroBet__decodeBetTicketNFTResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toString()
    );
  }

  try_decodeBetTicketNFT(
    ticketUri: Bytes
  ): ethereum.CallResult<EuroBet__decodeBetTicketNFTResult> {
    let result = super.tryCall(
      "decodeBetTicketNFT",
      "decodeBetTicketNFT(bytes):(uint256,uint256,string)",
      [ethereum.Value.fromBytes(ticketUri)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new EuroBet__decodeBetTicketNFTResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toString()
      )
    );
  }

  endpoint(): string {
    let result = super.call("endpoint", "endpoint():(string)", []);

    return result[0].toString();
  }

  try_endpoint(): ethereum.CallResult<string> {
    let result = super.tryCall("endpoint", "endpoint():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  isBettingActive(): boolean {
    let result = super.call("isBettingActive", "isBettingActive():(bool)", []);

    return result[0].toBoolean();
  }

  try_isBettingActive(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isBettingActive",
      "isBettingActive():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  odd(): BigInt {
    let result = super.call("odd", "odd():(uint256)", []);

    return result[0].toBigInt();
  }

  try_odd(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("odd", "odd():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  requestOdd(team: string): Bytes {
    let result = super.call("requestOdd", "requestOdd(string):(bytes32)", [
      ethereum.Value.fromString(team)
    ]);

    return result[0].toBytes();
  }

  try_requestOdd(team: string): ethereum.CallResult<Bytes> {
    let result = super.tryCall("requestOdd", "requestOdd(string):(bytes32)", [
      ethereum.Value.fromString(team)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  winner(): string {
    let result = super.call("winner", "winner():(string)", []);

    return result[0].toString();
  }

  try_winner(): ethereum.CallResult<string> {
    let result = super.tryCall("winner", "winner():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _nft(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _endpoint(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CashOutCall extends ethereum.Call {
  get inputs(): CashOutCall__Inputs {
    return new CashOutCall__Inputs(this);
  }

  get outputs(): CashOutCall__Outputs {
    return new CashOutCall__Outputs(this);
  }
}

export class CashOutCall__Inputs {
  _call: CashOutCall;

  constructor(call: CashOutCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CashOutCall__Outputs {
  _call: CashOutCall;

  constructor(call: CashOutCall) {
    this._call = call;
  }
}

export class EndBettingCall extends ethereum.Call {
  get inputs(): EndBettingCall__Inputs {
    return new EndBettingCall__Inputs(this);
  }

  get outputs(): EndBettingCall__Outputs {
    return new EndBettingCall__Outputs(this);
  }
}

export class EndBettingCall__Inputs {
  _call: EndBettingCall;

  constructor(call: EndBettingCall) {
    this._call = call;
  }
}

export class EndBettingCall__Outputs {
  _call: EndBettingCall;

  constructor(call: EndBettingCall) {
    this._call = call;
  }
}

export class FulfillCall extends ethereum.Call {
  get inputs(): FulfillCall__Inputs {
    return new FulfillCall__Inputs(this);
  }

  get outputs(): FulfillCall__Outputs {
    return new FulfillCall__Outputs(this);
  }
}

export class FulfillCall__Inputs {
  _call: FulfillCall;

  constructor(call: FulfillCall) {
    this._call = call;
  }

  get _requestId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _odd(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class FulfillCall__Outputs {
  _call: FulfillCall;

  constructor(call: FulfillCall) {
    this._call = call;
  }
}

export class PlaceBetCall extends ethereum.Call {
  get inputs(): PlaceBetCall__Inputs {
    return new PlaceBetCall__Inputs(this);
  }

  get outputs(): PlaceBetCall__Outputs {
    return new PlaceBetCall__Outputs(this);
  }
}

export class PlaceBetCall__Inputs {
  _call: PlaceBetCall;

  constructor(call: PlaceBetCall) {
    this._call = call;
  }

  get team(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class PlaceBetCall__Outputs {
  _call: PlaceBetCall;

  constructor(call: PlaceBetCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get value1(): Address {
    return this._call.outputValues[1].value.toAddress();
  }

  get value2(): BigInt {
    return this._call.outputValues[2].value.toBigInt();
  }

  get value3(): Bytes {
    return this._call.outputValues[3].value.toBytes();
  }
}

export class RequestOddCall extends ethereum.Call {
  get inputs(): RequestOddCall__Inputs {
    return new RequestOddCall__Inputs(this);
  }

  get outputs(): RequestOddCall__Outputs {
    return new RequestOddCall__Outputs(this);
  }
}

export class RequestOddCall__Inputs {
  _call: RequestOddCall;

  constructor(call: RequestOddCall) {
    this._call = call;
  }

  get team(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class RequestOddCall__Outputs {
  _call: RequestOddCall;

  constructor(call: RequestOddCall) {
    this._call = call;
  }

  get requestId(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class SetEndpointCall extends ethereum.Call {
  get inputs(): SetEndpointCall__Inputs {
    return new SetEndpointCall__Inputs(this);
  }

  get outputs(): SetEndpointCall__Outputs {
    return new SetEndpointCall__Outputs(this);
  }
}

export class SetEndpointCall__Inputs {
  _call: SetEndpointCall;

  constructor(call: SetEndpointCall) {
    this._call = call;
  }

  get _endpoint(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetEndpointCall__Outputs {
  _call: SetEndpointCall;

  constructor(call: SetEndpointCall) {
    this._call = call;
  }
}

export class SetWinnerCall extends ethereum.Call {
  get inputs(): SetWinnerCall__Inputs {
    return new SetWinnerCall__Inputs(this);
  }

  get outputs(): SetWinnerCall__Outputs {
    return new SetWinnerCall__Outputs(this);
  }
}

export class SetWinnerCall__Inputs {
  _call: SetWinnerCall;

  constructor(call: SetWinnerCall) {
    this._call = call;
  }

  get _winner(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetWinnerCall__Outputs {
  _call: SetWinnerCall;

  constructor(call: SetWinnerCall) {
    this._call = call;
  }
}

export class WithdrawEtherCall extends ethereum.Call {
  get inputs(): WithdrawEtherCall__Inputs {
    return new WithdrawEtherCall__Inputs(this);
  }

  get outputs(): WithdrawEtherCall__Outputs {
    return new WithdrawEtherCall__Outputs(this);
  }
}

export class WithdrawEtherCall__Inputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawEtherCall__Outputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }
}

export class WithdrawLinkCall extends ethereum.Call {
  get inputs(): WithdrawLinkCall__Inputs {
    return new WithdrawLinkCall__Inputs(this);
  }

  get outputs(): WithdrawLinkCall__Outputs {
    return new WithdrawLinkCall__Outputs(this);
  }
}

export class WithdrawLinkCall__Inputs {
  _call: WithdrawLinkCall;

  constructor(call: WithdrawLinkCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawLinkCall__Outputs {
  _call: WithdrawLinkCall;

  constructor(call: WithdrawLinkCall) {
    this._call = call;
  }
}
