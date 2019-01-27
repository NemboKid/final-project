const WorkingContract = artifacts.require("./WorkingContract.sol");
var assert = require('assert')
let contractInstance;
const Web3 = require('web3');

//const accounts = getWeb3.eth.getAccounts();

contract('TestAdmin', (accounts) => {
   beforeEach(async () => {
      contractInstance = await WorkingContract.deployed()
   })

   it('Contract deployer becomes owner', async () => {
      const isOwner = await contractInstance.owner.call();
      const isDeployer = await accounts[0];

      assert.equal(isOwner, isDeployer, "they should be the same")
    });


    it('Owner Adds Admin', async () => {
      const isOwner = accounts[0];
      const admin1 = accounts[1];
      const checker = await contractInstance.addAdmin(admin1, {from: isOwner})
      assert(checker)
    })

    it('Admin Adds Another Admin', async () => {
      const admin1 = accounts[1];
      const admin5 = accounts[5];
      const checker = await contractInstance.addAdmin(admin5, {from: admin1})
      assert(checker)
    })


    it('Admin Adds Developer', async () => {
      const developer2 = accounts[2];
      const weight1 = 100;
      const admin1 = accounts[1];
      const checkDevs = await contractInstance.numberOfDevs.call()
      const checkWeight = await contractInstance.weightGuard.call()
      await contractInstance.addDeveloper(developer2, weight1, {from:admin1})
      assert.equal(checkDevs == 1, checkWeight == 100, "Couldn't add developer properly")
    })


    it('Admin Removes Developer', async () => {
      const developer2 = accounts[2];
      const Admin1 = accounts[1];
      const expected = 0;
      await contractInstance.removeSingleDev(developer2, 0, {from: Admin1});
      const checkDevs = await contractInstance.numberOfDevs.call()
      assert.equal(checkDevs, expected);
    })

    it('Add Developer again', async () => {
      const developer3 = accounts[3];
      const weight1 = 100;
      const Admin1 = accounts[1];
      await contractInstance.addDeveloper(developer3, weight1, {from:Admin1})
      const checkDevs = await contractInstance.numberOfDevs.call()
      const checkWeight = await contractInstance.weightGuard.call()
      assert.equal(checkDevs == 1, checkWeight == 100, "Didn't add developer properly")
    })


    it('Admin Can Start Contract', async () => {
      const Admin1 = accounts[1];
      await contractInstance.startWork(4, {
        from: Admin1,
        value: 100
      });
      const isTrue = await contractInstance.contractActive.call()
      assert.equal(isTrue, true)
    })

    it('Admin Can Accept Step', async () => {
      const Admin1 = accounts[1];
      await contractInstance.stepAccept( {from: Admin1});
      const stepCounter = await contractInstance.stepCount.call()
      assert.equal(stepCounter, 1)
    })


    it('Admin Can Extend Deadline', async () => {
      const Admin1 = accounts[1];
      const oldTime = await contractInstance.contractEndTime.call()
      await contractInstance.extendDeadline({from: Admin1});
      const newTime = await contractInstance.contractEndTime.call();
      assert(newTime.toNumber() > oldTime.toNumber())
      console.log(oldTime.toNumber())
      console.log(newTime.toNumber())
    })

})
