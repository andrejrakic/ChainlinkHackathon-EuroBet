# Chainlink Hackathon - Euro Bet

User navigates to `ipfs://bafybeib33bkmmw772bdbnjr5j7iiyihxlb4gt73ufer77wrf33afuxblza/` or http://andrejrakic.github.io/ChainlinkHackathon-EuroBet/ and connect its Metamask wallet to Kovan testnet

User places bet with some amount of ETH, for example `placeBet("England", 0.5 ETH)`

[EuroBet.sol](/contracts/EuroBet.sol) smart contract request odd for winning championship from Chainlink's oracle

And mints NFT as Betting Ticket to User's address with tokenUri in `ETH amount + odd + teamName` format.

**Why we need Chainlink?** We can't write odds in mapping of smart contract because that values are going to change during time and we need to fetch them from betting bookmaker's apis.

NFT tickets are now in User's wallet, so one can trade them, use as a collateral, sell at auction, or whatever one wants. The point is that if NFT becomes winning bet ticket, only way for cash out is with that particular NFT.


Once betting is finished and we finally find out which team is a champion, one can call Cash Out function from the core EuroBet.sol smart contract, providing its NFT Betting Ticket. If bet is won, NFT is going to be burn and initial ETH amount * odd is going to be send to the ones wallet.


## Live Demo

<img height="50" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F1%2F18%2FIpfs-logo-1024-ice-text.png&f=1&nofb=1" />

React Dapp _(make sure to have Metamask installed and connected to Kovan testnet)_ available at

```
ipfs://bafybeib33bkmmw772bdbnjr5j7iiyihxlb4gt73ufer77wrf33afuxblza/
```
or

http://andrejrakic.github.io/ChainlinkHackathon-EuroBet/

## Smart contracts 

<img height="30" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fetherscan.io%2Fimages%2Flogo-ether.png%3Fv%3D0.0.1&f=1&nofb=1" />

[EuroBet](/contracts/EuroBet.sol) core smart contract: https://kovan.etherscan.io/address/0xa530d2026341b720ec367cd52df49417aa861225

BetTicket NFT smart contract: https://kovan.etherscan.io/token/0x7e7ed52d6611d8ff4edfba838726ef200d18675a

## External Adapter

<img height="50" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.coindesk.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fchainlink-combo-logo.png&f=1&nofb=1" />

Since odds change during time, one can not write it on chain via mapping and therefore one need Chainlink oracles to get that info when placing bets. External adapter is available [here](./external-adapter)

## Subgraph

<img height="40" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cryptocurrencymarket.uk%2Fcoins_images%2Fthe-graph%2Flarge.png&f=1&nofb=1" />

Subgraph for indexing data: https://thegraph.com/explorer/subgraph/andrejrakic/euro-bet

## Unit tests

<img height="30" src="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/60491e71bf5ce3b2cbadca5d_hardhat-logo.png" />

_Make sure to install all necessary dependencies_

```
npm test
```
