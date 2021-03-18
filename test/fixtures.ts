import { deployContract } from "ethereum-waffle";
// import { Contract } from "ethers";

import BetTicket from "../build/contracts/BetTicket.json";

interface IBetTicketFixture {
  betTicket: any
}

export async function betTicketFixture([admin]: any): Promise<IBetTicketFixture> {
  const betTicket = await deployContract(admin, BetTicket);

  return { betTicket };
}

