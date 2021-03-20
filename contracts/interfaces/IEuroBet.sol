pragma solidity ^0.6.0;

interface IEuroBet {

    event OddRequestSent(address oracle, uint fee, string endpoint);
    event OddRequestReceived(bytes32 requestId, uint odd);
    event NewBet(uint etherAmount, uint odd, string teamName, address tokenAddress, uint tokenId, bytes tokenUri);
    event CashOut(uint cashOutAmount, uint odd, uint tokenId);
    event BettingClosed();
    event Winner(string winner);
    event EtherReceived(address sender, uint amount);

    /**
     * Receive betting amount in Ether, request Odd from Oracle, mint NFT as Betting Ticket
     *
     * @notice Payable
     *
     * @param team - Team name to bet on
     *
     * @return uint - Odd for winning
     * @return address - NFT Betting Ticket address
     * @return uint - Betting Ticket token Id
     * @return bytes - Betting Ticket token Uri, consists of: Ehter amount, Odd & Team Name
     */
    function placeBet(string calldata team) external payable returns(uint, address, uint, bytes memory);

    /**
     * If Bet is Won, burns inputed NFT Betting Ticket, sends initial Ether amount * Odd back to Caller
     *
     * @param tokenId - Id of NFT Betting Ticket
     *
     * No return, reverts on error
     */
    function cashOut(uint tokenId) external;

    /**
     * Decodes NFT Betting Ticket Uri
     *
     * @param ticketUri - bytes value to decode
     *
     * @return uint - Betting Amount in Ether
     * @return uint - Odd for winning the Bet
     * @return string - Team Name
     */
    function decodeBetTicketNFT(bytes calldata ticketUri) external view returns(uint, uint, string memory);
}