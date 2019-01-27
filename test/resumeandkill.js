const WorkingContract = artifacts.require("./WorkingContract.sol");
const RepoTest = artifacts.require("./RepoTest.sol");
var assert = require('assert')
let contractInstance;
const Web3 = require('web3');

//const accounts = getWeb3.eth.getAccounts();

contract('Pause, Resume, Kill', (accounts) => {
   beforeEach(async () => {
      contractInstance = await WorkingContract.deployed()
   })

   it('Contract deployer becomes owner', async () => {
      const isOwner = await contractInstance.owner.call();
      const isDeployer = await accounts[0];

      assert.equal(isOwner, isDeployer, "they should be the same")
    });


    it('Add Developer', async () => {
      const developer1 = accounts[1];
      const weight1 = 100;
      const isOwner = accounts[0];
      await contractInstance.addDeveloper(developer1, weight1, {from:isOwner})
      const checkDevs = await contractInstance.numberOfDevs.call()
      const checkWeight = await contractInstance.weightGuard.call()
      assert.equal(checkDevs == 1, checkWeight == 100, "Didn't add developer properly")
    })


    it('Start Contract', async () => {
      //const amount = web3.utils.toWei('2', 'ether');
      //const numberOfWeeks = 4;
      const isOwner = accounts[0];
      await contractInstance.startWork(4, {
        from: accounts[0],
        value: 100
      });
      const isTrue = await contractInstance.contractActive.call()
      assert.equal(isTrue, true)
    })


    it('Pause Contract', async () => {
      const isOwner = accounts[0];
      const pause = await contractInstance.pauseContract({from:isOwner});
      const active = await contractInstance.contractActive.call();
      assert.equal(active, false);
    })


    it('Resume Contract', async () => {
      const isOwner = accounts[0];
      const pause = await contractInstance.resumeContract({from:isOwner});
      const active = await contractInstance.contractActive.call();
      assert.equal(active, true);
    })


    it('Kill Contract', async () => {
      const isOwner = accounts[0];
      try {
      const pause = await contractInstance.killContract({from:isOwner});
    } catch(error) {
      assert(error);
    }
  })


})
