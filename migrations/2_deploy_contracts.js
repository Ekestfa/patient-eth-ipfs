
const ClientFactory = artifacts.require('../contracts/ClientFactory.sol')


module.exports = function (deployer) {

  deployer.deploy(ClientFactory)
}
