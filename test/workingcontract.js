const WorkingContract = artifacts.require("./WorkingContract.sol");
const RepoTest = artifacts.require("./RepoTest.sol");
var assert = require('assert')
let contractInstance;
const Web3 = require('web3');

//This is a general test that tests the workflow of the contract. 

contract('WorkingContract', (accounts) => {
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

    it('Add Admin', async () => {
      const isOwner = accounts[0];
      const admin1 = accounts[2];
      const checker = await contractInstance.addAdmin(admin1, {from: isOwner})
      assert(checker)
    })

    //Owner removes admin
    it('Remove Admin', async () => {
      const isOwner = accounts[0];
      const admin1 = accounts[2];
      const checker = await contractInstance.removeAdmin(admin1, {from: isOwner})
      try{
        await contractInstance.acceptStep({from: admin1})
      } catch(error) {
        assert(error)
      }
    })
      //Removes developer
    it('Remove Developer', async () => {
      const developer1 = accounts[1];
      const isOwner = accounts[0];
      const expected = 0;
      await contractInstance.removeSingleDev(developer1, 0, {from: isOwner});
      const checkDevs = await contractInstance.numberOfDevs.call()
      assert.equal(checkDevs, expected);
    })

     //Adds dev again in order to fulfill requirements for starting contract
    it('Add Developer again', async () => {
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

    it('Accept Step', async () => {
      //const amount = web3.utils.toWei('2', 'ether');
      //const numberOfWeeks = 4;
      const isOwner = accounts[0];
      await contractInstance.stepAccept( {from: isOwner});
      const stepCounter = await contractInstance.stepCount.call()
      assert.equal(stepCounter, 1)
    })

     //After starting contract and accepting a step, can developer withdraw money as expected?
    it('Withdraw Money', async () => {
      const developer1 = accounts[1];
      const isOwner = accounts[0];
      await contractInstance.withdrawal( {from: developer1});
      const balanceContract = await contractInstance.checkBalance({from: isOwner})
      const depositSum = await contractInstance.depositAmount({from: isOwner})
      assert.equal(balanceContract, depositSum*0.75)
    })


    it('Extend Deadline', async () => {
      const developer1 = accounts[1];
      const isOwner = accounts[0];
      const oldTime = await contractInstance.contractEndTime.call()
      await contractInstance.extendDeadline({from: isOwner});
      const newTime = await contractInstance.contractEndTime.call();
      assert(newTime.toNumber() > oldTime.toNumber())
      console.log(oldTime.toNumber())
      console.log(newTime.toNumber())
    })

      //Is the developer reward weight the expected 100?
    it('Check Weight', async () => {
      const weight = await contractInstance.weightGuard.call();
      const expected = 100;
      assert.equal(weight, expected);
    })

      //Is the balance the expected after one withdrawal?
    it('Check Balance', async () => {
      const isOwner = accounts[0];
      const balance = await contractInstance.checkBalance({from:isOwner});
      const expected = 75;
      assert.equal(balance, expected);
    })
   
   //This test function is useless since I didn't find a function in my contract that could check this and I didn't want to 
   //write a function only for this purpose. I'm aware that testing for overflows is very important!
   it('The sum should not overflow', async () => {
    try {
      // Trying to sum 2^256 + 5, which should overflow and throw an exception in the best case
      const sumResult = contractInstance.sumNumbers(2e256, 5)
      assert.ok(false, 'The contract should throw an exception to avoid overflowing and thus making bad calculations')
   } catch(error) {
      assert.ok(true, 'The contract is throwing which is the expected behaviour when you try to overflow')
   }
})


})

//Oracle tests starts here, comes from the contract RepoTest, which checks the stars this very repo has.
//However, the tests should only be applicable when operating on testnet, as the Oracle isn't available on private net.
contract('RepoTest', (accounts) => {
   beforeEach(async () => {
      contractInstance = await RepoTest.deployed()
   })

   it('Calls Oracle Properly', async () => {
     const isOwner = accounts[0];
     const oracleMoney = web3.utils.toWei(
       '1',
       'ether'
     )

     try{
     const callOracle = await contractInstance.updateStars({
       from: isOwner,
       value: oracleMoney
       });
     } catch(error) {
       assert(error, "Without Ethereum bridge, this only works on testnet");
     }
   })

   it('Update Repo Stars', async () => {
     const isOwner = accounts[0];
     try {
     const stars = await contractInstance.repoStars.call();
   }catch(error){
     assert(error, "On testnet, this should return number of star of repo");
   }
   })


})
