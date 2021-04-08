pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IEuroBet.sol";
import "./BetTicket.sol";

contract EuroBet is IEuroBet, ChainlinkClient, ReentrancyGuard {
    using SafeMath for uint;

    /// @dev Use storage slots efficiently
    string public winner;
    string public endpoint;
    uint256 private odd;
    uint256 private fee;
    address private admin;
    address private nft;
    address private oracle;
    bytes32 private jobId;
    bool public isBettingActive;

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Job ID: 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor(address _nft, string memory _endpoint) public {
        setPublicChainlinkToken();
        nft = _nft;
        endpoint = _endpoint;
        isBettingActive = true;
        admin = msg.sender;
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18; // 0.1 LINK;
    }


    /**
     * The fallback function for the contract
     * @dev Will simply accept any unexpected eth, but no data
     */ 
    receive() payable external {
        emit EtherReceived(msg.sender, msg.value);
    }


    function requestOdd(string memory team) internal returns(bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        string memory uri = append(endpoint, team);
        request.add("get", uri);

        // Set the path to find the desired data in the API response, where the response format is:
        // [{
        //     "id": "England",
        //     "odd": 5
        // }]
        request.add("path", "0.odd");

        emit OddRequestSent(oracle, fee, uri); 

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }


     /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _odd) public recordChainlinkFulfillment(_requestId) {
        odd = _odd;

        emit OddRequestReceived(_requestId, _odd);
    }


    function placeBet(string memory team) public override payable returns(uint, address, uint, bytes memory) {
        require(isBettingActive, "EuroBet::placeBet: BETTING IS OVER");
        require(msg.value > 0, "EuroBet::placeBet: ETH AMOUNT MUST BE GREATER THAN ZERO");
        
        requestOdd(team);

        bytes memory tokenUri = abi.encode(msg.value, odd, team);
        (address tokenAddress, uint tokenId, ) = BetTicket(nft).mint(msg.sender, tokenUri);

        emit NewBet(msg.value, odd, team, tokenAddress, tokenId, tokenUri);

        return (odd, tokenAddress, tokenId, tokenUri);
    }


    function cashOut(uint tokenId) public override nonReentrant {
        require(!isBettingActive, "EuroBet::cashOut: BETTING ISN'T OVER YET");
        require(ERC721(nft).ownerOf(tokenId) == msg.sender, "EuroBet::cashOut: BURN OF TOKEN THAT IS NOT OWN");

        bytes memory tokenUri = ERC721(nft).tokenURI(tokenId);

        (uint _ethAmount, uint _odd, string memory _teamName) = decodeBetTicketNFT(tokenUri);
        require(keccak256(abi.encodePacked(_teamName)) == keccak256(abi.encodePacked(winner)), "EuroBet::cashOut: BET LOST");

        BetTicket(nft).burn(tokenId);

        uint cashOutAmount = _ethAmount.mul(_odd);
        (bool sent, ) = msg.sender.call{ value: cashOutAmount }("");
        require(sent, "EuroBet::cashOut: FAILED TO SEND ETHER");

        emit CashOut(cashOutAmount,  odd, tokenId);
    }


    function decodeBetTicketNFT(bytes memory ticketUri) public override view returns(uint, uint, string memory) {
        return abi.decode(ticketUri, (uint, uint, string));
    }


    function endBetting() public onlyAdmin {
        isBettingActive = false;

        emit BettingClosed();
    }


    function setWinner(string memory _winner) public onlyAdmin {
        winner = _winner;

        emit Winner(_winner);
    }


    function withdrawEther(uint amount) public onlyAdmin {
        (bool sent, ) = msg.sender.call{ value: amount }("");
        require(sent, "EuroBet::withdrawEther: FAILED TO SEND ETHER");
    }


    function withdrawLink(address tokenAddress, uint amount) public onlyAdmin {
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }


    function setEndpoint(string memory _endpoint) public onlyAdmin {
        endpoint = _endpoint;
    }


    function append(string memory a, string memory b) private pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }
}