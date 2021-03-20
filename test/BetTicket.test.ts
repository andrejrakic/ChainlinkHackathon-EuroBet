import { expect, use } from "chai";
import { solidity, MockProvider, createFixtureLoader, deployContract } from "ethereum-waffle";
import { Contract } from "ethers";
import { AbiCoder, BigNumber, parseEther } from "ethers/utils";
import { betTicketFixture } from "./fixtures";

use(solidity);
// @dev We are assuming that imported OpenZeppelin's contracts are well audited so tests are just for our part of development

const provider = new MockProvider();

describe("Bet Ticket", async () => {
    const abiCoder = new AbiCoder();
    const [admin, euroBet] = provider.getWallets();
    const loadFixture = createFixtureLoader([admin], provider);
    let betTicket: Contract;

    beforeEach(async () => {
        const fixture = await loadFixture(betTicketFixture);
        betTicket = fixture.betTicket;
        await betTicket.setBettingContract(euroBet.address);
    });

    it("should mint ERC 721 token properly", async () => {
        const stake = parseEther("1");
        const odd = 5;
        const bet = "England";

        const tokenURI = abiCoder.encode(["uint", "uint", "string"], [stake, odd, bet]);

        await expect(betTicket.mint(admin.address, tokenURI)).to.be.revertedWith("BetTicket: CALLABLE ONLY FROM BETTING CONTRACT");

        const betTicketCollectible = await betTicket.connect(euroBet.address).callStatic.mint(admin.address, tokenURI);
        
        expect(betTicketCollectible.tokenAddress).to.equal(betTicket.address);
        expect(betTicketCollectible.tokenUri).to.equal(tokenURI);
        expect(betTicketCollectible.tokenId).to.equal(1);
    });
});
