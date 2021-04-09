import {
	EuroBet,
	BettingClosed,
	CashOut,
	ChainlinkCancelled,
	ChainlinkFulfilled,
	ChainlinkRequested,
	EtherReceived,
	NewBet,
	OddRequestReceived,
	OddRequestSent,
	Winner,
} from '../generated/EuroBet/EuroBet';
import {
	Betting,
	Bet,
	NFTBetTicket,
	ChainlinkRequest,
} from '../generated/schema';

export function handleBettingClosed(event: BettingClosed): void {
	let bettingEntity = Betting.load(event.address.toHex());

	if (bettingEntity == null) {
		bettingEntity = new Betting(event.address.toHex());
		bettingEntity.name = 'UEFA Euro 2020 Winner Bet';
		bettingEntity.description =
			'Bet which country is going to win UEFA Euro 2020. Decentralized betting powered by Chainlink oracles';
	}

	bettingEntity.isActive = false;

	bettingEntity.save();
}

export function handleCashOut(event: CashOut): void {
	let betEntity = Bet.load(event.params.tokenId.toHex());

	if (betEntity == null) {
		betEntity = new Bet(event.params.tokenId.toHex());
	}

	betEntity.cashOutAmount = event.params.cashOutAmount;
	betEntity.isWinningBet = true;

	betEntity.save();
}

export function handleChainlinkCancelled(event: ChainlinkCancelled): void {
	let chainlinkRequestEntity = ChainlinkRequest.load(
		event.transaction.hash.toHex()
	);

	if (chainlinkRequestEntity == null) {
		chainlinkRequestEntity = new ChainlinkRequest(event.params.id.toHex());
	}

	chainlinkRequestEntity.canceledTimestamp = event.block.timestamp;

	chainlinkRequestEntity.save();
}

export function handleChainlinkFulfilled(event: ChainlinkFulfilled): void {
	let chainlinkRequestEntity = ChainlinkRequest.load(
		event.transaction.hash.toHex()
	);

	if (chainlinkRequestEntity == null) {
		chainlinkRequestEntity = new ChainlinkRequest(event.params.id.toHex());
	}

	chainlinkRequestEntity.fulfilledTimestamp = event.block.timestamp;

	chainlinkRequestEntity.save();
}

export function handleChainlinkRequested(event: ChainlinkRequested): void {
	let chainlinkRequestEntity = ChainlinkRequest.load(
		event.transaction.hash.toHex()
	);

	if (chainlinkRequestEntity == null) {
		chainlinkRequestEntity = new ChainlinkRequest(event.params.id.toHex());
	}

	chainlinkRequestEntity.requestedTimestamp = event.block.timestamp;

	chainlinkRequestEntity.save();
}

export function handleEtherReceived(event: EtherReceived): void {}

export function handleNewBet(event: NewBet): void {
	let nftBetTicketEntity = new NFTBetTicket(event.transaction.hash.toHex());

	nftBetTicketEntity.contractAddress = event.params.tokenAddress;
	nftBetTicketEntity.tokenId = event.params.tokenId;
	nftBetTicketEntity.tokenUri = event.params.tokenUri;
	nftBetTicketEntity.etherAmount = event.params.etherAmount;
	nftBetTicketEntity.odd = event.params.odd;
	nftBetTicketEntity.teamName = event.params.teamName;
	nftBetTicketEntity.creator = event.transaction.from;

	nftBetTicketEntity.save();

	let betEntity = new Bet(nftBetTicketEntity.tokenId.toHex());

	betEntity.etherAmount = event.params.etherAmount;
	betEntity.odd = event.params.odd;
	betEntity.teamName = event.params.teamName;
	betEntity.nftBettingTicket = nftBetTicketEntity.id;
	betEntity.timestamp = event.block.timestamp;
	betEntity.chainlinkRequest = event.transaction.hash.toHex();

	betEntity.save();

	let bettingEntity = Betting.load(event.address.toHex());

	if (bettingEntity == null) {
		bettingEntity = new Betting(event.address.toHex());
		bettingEntity.name = 'UEFA Euro 2020 Winner Bet';
		bettingEntity.description =
			'Bet which country is going to win UEFA Euro 2020. Decentralized betting powered by Chainlink oracles';
		bettingEntity.isActive = true;
	}

	bettingEntity.bets = bettingEntity.bets.concat([betEntity.id]);

	bettingEntity.save();
}

export function handleOddRequestReceived(event: OddRequestReceived): void {
	let chainlinkRequestEntity = ChainlinkRequest.load(
		event.transaction.hash.toHex()
	);

	if (chainlinkRequestEntity == null) {
		chainlinkRequestEntity = new ChainlinkRequest(
			event.params.requestId.toHex()
		);
	}

	chainlinkRequestEntity.requestId = event.params.requestId;
	chainlinkRequestEntity.resultOdd = event.params.odd;

	chainlinkRequestEntity.save();
}

export function handleOddRequestSent(event: OddRequestSent): void {
	let chainlinkRequestEntity = new ChainlinkRequest(
		event.transaction.hash.toHex()
	);

	chainlinkRequestEntity.oracleAddress = event.params.oracle;
	chainlinkRequestEntity.linkFee = event.params.fee;
	chainlinkRequestEntity.endpoint = event.params.endpoint;

	chainlinkRequestEntity.save();
}

export function handleWinner(event: Winner): void {
	let bettingEntity = Betting.load(event.address.toHex());

	if (bettingEntity == null) {
		bettingEntity = new Betting(event.address.toHex());
		bettingEntity.name = 'UEFA Euro 2020 Winner Bet';
		bettingEntity.description =
			'Bet which country is going to win UEFA Euro 2020. Decentralized betting powered by Chainlink oracles';
	}

	bettingEntity.winner = event.params.winner;

	bettingEntity.save();
}
