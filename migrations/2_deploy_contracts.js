var WorkingContract = artifacts.require("./WorkingContract.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var RepoTest = artifacts.require("./RepoTest.sol");
var usingOraclize = artifacts.require("./usingOraclize.sol");


module.exports = function(deployer) {
  deployer.deploy(WorkingContract);
  deployer.deploy(SafeMath);
  deployer.deploy(RepoTest);
  deployer.link(WorkingContract, SafeMath, RepoTest);
  };
