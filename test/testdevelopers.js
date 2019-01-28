const WorkingContract = artifacts.require("./WorkingContract.sol");
var assert = require('assert');
let contractInstance;
const Web3 = require('web3');

//This test is written only for the role Developers and goes from start to finish.
contract('TestDevelopers', (accounts) => {
   beforeEach(async () => {
      contractInstance = await WorkingContract.deployed()
   })

   it('Contract deployer becomes owner', async () => {
      const isOwner = await contractInstance.owner.call();
      const isDeployer = await accounts[0];

      assert.equal(isOwner, isDeployer, "they should be the same")
    });

   //Adds 1 developer, 40% weight
    it('Add Developer1', async () => {
      const developer1 = accounts[1];
      const weight1 = 40;
      const isOwner = accounts[0];
      await contractInstance.addDeveloper(developer1, weight1, {from:isOwner})
      const checkDevs = await contractInstance.numberOfDevs.call()
      const checkWeight = await contractInstance.weightGuard.call()
      assert.equal(checkDevs == 1, checkWeight == 40, "Didn't add developer properly")
    })
   
   //Adds another with 60% weight. Total 100%
    it('Add Developer2', async () => {
      const developer2 = accounts[2];
      const weight2 = 60;
      const isOwner = accounts[0];
      await contractInstance.addDeveloper(developer2, weight2, {from:isOwner})
      const checkDevs = await contractInstance.numberOfDevs.call()
      const checkWeight = await contractInstance.weightGuard.call()
      assert.equal(checkDevs == 2, checkWeight == 100, "Didn't add developer properly")
    })

   //Starts it...
    it('Start Contract', async () => {
      //const amount = web3.utils.toWei('2', 'ether');
      //const numberOfWeeks = 4;
      const isOwner = accounts[0];
      await contractInstance.startWork(5, {
        from: accounts[0],
        value: 100
      });
      const isTrue = await contractInstance.contractActive.call()
      assert.equal(isTrue, true)
    })

      //Accept all steps all at once (there are 4 steps)
    it('Accept Step1', async () => {
      //const amount = web3.utils.toWei('2', 'ether');
      //const numberOfWeeks = 4;
      const isOwner = accounts[0];
      await contractInstance.stepAccept( {from: isOwner});
      const stepCounter = await contractInstance.stepCount.call()
      assert.equal(stepCounter, 1)
    })

    it('Accept Step2', async () => {
      //const amount = web3.utils.toWei('2', 'ether');
      //const numberOfWeeks = 4;
      const isOwner = accounts[0];
      await contractInstance.stepAccept( {from: isOwner});
      const stepCounter = await contractInstance.stepCount.call()
      assert.equal(stepCounter, 2)
    })

    it('Accept Step3', async () => {
      //const amount = web3.utils.toWei('2', 'ether');
      //const numberOfWeeks = 4;
      const isOwner = accounts[0];
      await contractInstance.stepAccept( {from: isOwner});
      const stepCounter = await contractInstance.stepCount.call()
      assert.equal(stepCounter, 3)
    })

    it('Accept Step4', async () => {
      //const amount = web3.utils.toWei('2', 'ether');
      //const numberOfWeeks = 4;
      const isOwner = accounts[0];
      await contractInstance.stepAccept( {from: isOwner});
      const stepCounter = await contractInstance.stepCount.call()
      assert.equal(stepCounter, 4)
    })

   //Can all two developers withdraw the money after the 4 steps have been accepted?
    it('Withdraw Money1', async () => {
      const developer1 = accounts[1];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer1});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
    })

    it('Withdraw Money2', async () => {
      const developer1 = accounts[1];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer1});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
    })

    it('Withdraw Money3', async () => {
      const developer1 = accounts[1];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer1});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
    })

    it('Withdraw Money4', async () => {
      const developer1 = accounts[1];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer1});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
    })

    it('Withdraw Money5', async () => {
      const developer2 = accounts[2];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer2});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
    })

    it('Withdraw Money6', async () => {
      const developer2 = accounts[2];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer2});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
    })

    it('Withdraw Money7', async () => {
      const developer2 = accounts[2];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer2});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
    })

     //Here I check if the balance is empty and all funds has been withdrawed. 
    it('Withdraw Money8', async () => {
      const developer2 = accounts[2];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer2});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
      assert.equal(balanceContract, 0, "The balance after all withdrawals should be 0");
    })
   
      //With the contract all empty, can a developer withdraw from it?
    it('Test to Withdraw From Empty Contract', async () => {
      const developer2 = accounts[2];
      const isOwner = accounts[0];

      try {
        await contractInstance.withdrawal( {from: developer2});
        const balanceContract = await contractInstance.checkBalance({from: isOwner})
        const depositSum = await contractInstance.depositAmount({from: isOwner})
      } catch(error) {
        assert(error, "can't withdraw from empty contract");
      }
    })




})
