import { expect, use } from "chai";
import { solidity, MockProvider, createFixtureLoader, deployContract } from "ethereum-waffle";
import { Contract } from "ethers";
import { AbiCoder, BigNumber, parseEther } from "ethers/utils";
import { betTicketFixture } from "./fixtures";

use(solidity);
// @dev We are assuming that imported OpenZeppelin's contracts are well audited so tests are just for our part of development

describe("Bet Ticket", async () => {
    const provider = new MockProvider();
    const abiCoder = new AbiCoder();
    const [admin] = provider.getWallets();
    const loadFixture = createFixtureLoader([admin], provider);
    let betTicket: Contract;

    beforeEach(async () => {
        const fixture = await loadFixture(betTicketFixture);
        betTicket = fixture.betTicket;
    });

    it("should mint ERC 721 token properly", async () => {
        const stake = parseEther("1");
        const odd = 5;
        const bet = "England";

        const tokenURI = abiCoder.encode(["uint", "uint", "string"], [stake, odd, bet]);

        const betTicketCollectible = await betTicket.callStatic.mint(admin.address, tokenURI);
        
        expect(betTicketCollectible.tokenAddress).to.equal(betTicket.address);
        expect(betTicketCollectible.tokenUri).to.equal(tokenURI);
        expect(betTicketCollectible.tokenId).to.equal(1);
    });

});
