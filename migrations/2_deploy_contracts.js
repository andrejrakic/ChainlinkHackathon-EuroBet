const BetTicket = artifacts.require("./BetTicket.sol");
const EuroBet = artifacts.require("./EuroBet.sol");

const endpoint = "https://chainlinkapi.herokuapp.com/teams/?id=";

module.exports = function (deployer) {
  deployer.deploy(BetTicket).then(function() {
    return deployer.deploy(EuroBet, BetTicket.address, endpoint);
  });
};