pragma solidity ^0.5.0;


// @author Filip Sundgren
// @title A Simple Working Contract

import "./SafeMath.sol";

contract WorkingContract {


using SafeMath for uint256;


    /**
     * Storage
     */
    uint public additionalWeeks;
    address payable public owner;
    uint public contractEndTime;
    uint public depositAmount;
    uint public weightGuard;
    uint public stepCount;
    bool public contractActive;
    uint public timeStep;
    AcceptedSteps public acceptedSteps;
    bool public hasStarted;
    bool private pauseButtonUsed;

    mapping(address => Developer) public developers;
    mapping (address => bool) public isAdmin;


    address[] public developersList;
    uint[] public weightNumberChecker;
    address[] public admins;


    /**
     * Structs
     */
    struct Developer {
        address developerAddress;
        uint weight;
        AcceptedSteps acceptedSteps;
        bool isDeveloper;
        uint withdrawalCounter;
    }


    /**
     * Enums
     */
    enum AcceptedSteps {
       none,
       first,
       second,
       third,
       fourth
    }


    /**
     * Events
     */
    event LogNoneAcceptedStep(string none);
    event LogFirstAcceptedStep(string first);
    event LogSecondAcceptedStep(string second);

    event LogDeveloperStatus(address devAddress,
                            uint weight,
                            uint acceptedSteps,
                            bool isDeveloper,
                            uint withdrawals);

    event LogDeadlineExtended(uint newDeadline);
    event LogContractEndsAt(uint unixTimeOfContract);

    event LogDeveloperAdded(address developerAddressAdded, uint developerRewardWeight);
    event LogAdminAdded(address adminAddress);

    event LogPauseContract(bool contractPaused);
    event LogResumeContract(bool contractActive);

    event LogStepCount(uint stepCount);

    event LogWithdrawal(uint amountWithdrawn);

    event LogDepositReceived (address whoSent);


    /**
     * Modifiers
     */

    modifier onlyAdmin {
        require((isAdmin[msg.sender] == true) || msg.sender == owner, "Only admin or owner can perfom this");
        _;
    }


    modifier onlyDeveloper(address _address) {
        require(developers[_address].isDeveloper == true, "Only for devs");
        _;
    }

    modifier isActive {
        require(contractActive == true, "Contract must be active");
        _;
    }


    modifier onlyBeforeWeight {
        _;
        uint s = 0;
        for(uint i=0; i < weightNumberChecker.length; i++){
            s += weightNumberChecker[i];
            require(s <= 100, "Cannot exceed 100% reward for developers");
        }
    }



    /**
     * @dev Constructor function. The deployer of the contract(msg.sender) will become the owner and get the admin role as well.
     */
    constructor() public {
        owner = msg.sender;
        isAdmin[owner] = true;
        pauseButtonUsed = false;
    }

    /**
     *
     * @dev need to transfer value at this step, which will be the value of your project.
     * @dev Developers need to be inserted before start, and the total weight (reward) for devs must be 100% of contract's amount.
     * @param timeContract is total weeks. Only between 1-8.
     * @return success true
     *
     */
    function startWork(uint timeContract) public payable onlyAdmin returns (bool success) {
        checkWeight();
        require(hasStarted == false);
        require(developersList.length > 0, "You must add at least one developer before starting");
        require(timeContract >= 1 && timeContract <= 8, "8 weeks is the maximum contract time");
        require(msg.value % 2 == 0, "Even value required.");
        require(msg.value != 0, "Must send money");
        require(weightGuard == 100, "weight must be 100%");
        depositAmount = msg.value;
        require(contractActive == false, "contract already started");
        contractActive = true;
        contractEndTime = (timeContract * 1 weeks) + now;
        timeStep = now + contractEndTime / 4;
        emit LogContractEndsAt(contractEndTime);
        hasStarted = true;
        return true;
        }


    /**
     * @dev require reward to be even and everything to add up to 100%
     * @param developer is address of the developer you wish to add
     * @param reward is the percentual weight dev should have of total contract value
     */
    function addDeveloper(address developer, uint reward) public onlyAdmin onlyBeforeWeight {
        require(contractActive == false, "Contract cannot be active for this function");
        require(developers[developer].isDeveloper == false, "Is already developer");
        require(reward > 0, "reward must be greater than 0");
        developers[developer] = Developer({developerAddress: developer, weight: reward, acceptedSteps: AcceptedSteps.none, isDeveloper: true, withdrawalCounter: 0});
        developersList.push(developer);
        weightNumberChecker.push(reward);
        checkWeight();
        emit LogDeveloperAdded(developer, reward);
    }

    /**
     * @dev purpose for increased transparency and reflect contract state.
     * @return list of developers in contract.
     */
    function numberOfDevs() public view returns (uint numberOfDevelopers) {
        return developersList.length;
    }

    /**
     * @dev Owner accepts step when necessary and stepCount will increase by one (stepCount +1).
     */
    function stepAccept() public onlyAdmin isActive {
        require(stepCount != 4, "after 4 steps accepted this function can't be used");
        if (stepCount == 0) {
            require(now <= (timeStep + now), "First step deadline has passed");
            stepCount ++;
            emit LogStepCount(stepCount);
            for(uint8 i = 0; i < developersList.length; i++) {
                require(developers[developersList[i]].acceptedSteps == AcceptedSteps.none);
                require(developersList[i] != address(0));
                developers[developersList[i]].acceptedSteps = AcceptedSteps.first;
            }
        } else if (stepCount == 1) {
            require(now <= (timeStep * 2 + now), "Second step deadline has passed");
            stepCount ++;
            emit LogStepCount(stepCount);
                for(uint8 i = 0; i < developersList.length; i++) {
                    require(developers[developersList[i]].acceptedSteps == AcceptedSteps.first);
                    require(developersList[i] != address(0));
                    developers[developersList[i]].acceptedSteps = AcceptedSteps.second;
                }
        } else if (stepCount == 2) {
            require(now <= (timeStep * 3 + now), "Third step deadline has passed");
            stepCount ++;
            emit LogStepCount(stepCount);
                for(uint8 i = 0; i < developersList.length; i++) {
                    require(developers[developersList[i]].acceptedSteps == AcceptedSteps.second);
                    require(developersList[i] != address(0));
                    developers[developersList[i]].acceptedSteps = AcceptedSteps.third;
                }
        } else if (stepCount == 3) {
            require(now <= (timeStep * 4 + now), "Fourth step deadline has passed");
            stepCount ++;
            for(uint8 i = 0; i < developersList.length; i++) {
                require(developers[developersList[i]].acceptedSteps == AcceptedSteps.third);
                require(developersList[i] != address(0));
                developers[developersList[i]].acceptedSteps = AcceptedSteps.fourth;
                }
        }
    }


    /**
    * @dev Developers use this to take out money. 1/4 of their weight can be withdrawed for each accepted step.
    */
   function withdrawal() public onlyDeveloper(msg.sender) isActive {
       uint weight = developers[msg.sender].weight;
       if (stepCount == 1) {
            require(developers[msg.sender].withdrawalCounter == 0, "no withdrawals can have been made before");
            msg.sender.transfer(((depositAmount * weight) / 100) / 4);
            developers[msg.sender].withdrawalCounter ++;
            emit LogWithdrawal(((depositAmount * weight) / 100) / 4);
        } else if (stepCount == 2) {
            require(developers[msg.sender].withdrawalCounter <= 1, "1 withdrawal can have been made before");
            msg.sender.transfer(((depositAmount * weight) / 100) / 4);
            developers[msg.sender].withdrawalCounter ++;
            emit LogWithdrawal(((depositAmount * weight) / 100) / 4);
        } else if (stepCount == 3) {
            require(developers[msg.sender].withdrawalCounter <= 2, "2 withdrawals can have been made before");
            msg.sender.transfer(((depositAmount * weight) / 100) / 4);
            developers[msg.sender].withdrawalCounter ++;
            emit LogWithdrawal(((depositAmount * weight) / 100) / 4);
        } else if (stepCount == 4) {
            require(developers[msg.sender].withdrawalCounter <= 3);
            msg.sender.transfer(((depositAmount * weight) / 100) / 4);
            developers[msg.sender].withdrawalCounter ++;
            emit LogWithdrawal(((depositAmount * weight) / 100) / 4);
        }
    }

    /**
    * @dev The Owner can add an additional admin
    */
    function addAdmin(address _admin) public onlyAdmin {
        require(isAdmin[_admin] == false);
        require(developers[_admin].isDeveloper == false);
        require(admins.length != 2, "Can only have max 2 admins");
        isAdmin[_admin] = true;
        admins.push(_admin);
        emit LogAdminAdded(_admin);
    }


    /**
     * Admin tools
     */

     /**
     * @dev Checks current weight of project. Needs to add up to 100 before contract can start.
     * @dev The function is called internally by other functions and cannot be called in itself.
     */
    function checkWeight() internal {
        uint k = 0;
        for(uint i=0; i < weightNumberChecker.length; i++){
            k += weightNumberChecker[i];
        }
        weightGuard = k;
    }

    /**
     * @dev Checks current balance of contract in oppose to depositAmount.
     * @dev Good to have an overview and see how much money the contract contains at the moment.
     */
    function checkBalance() public view returns(uint contractBalance) {
        return address(this).balance;
    }


    /**
     * @dev Remove single dev from list. Can only be done if contract hasn't yet started, or is paused (it should be a big step to remove someone and it
     * must be communicated properly, why it's necessary to pause to whole operation first).
     * @dev If the contract has started and the admin removes a developer, the weight doesn't need to add up to 100% in order to resume contract.
     * Maybe a replacement isn't necessary and the other developers shouldn't per se get the removed developer's cut.
     * @param devAddress is the address of the developer you wish to remove.
     * @param devInList is its place in developersList, which need to match. Used as a control mechanism.
     */
    function removeSingleDev(address devAddress, uint devInList) public onlyAdmin {
        require(developersList[devInList] == devAddress, "addresses doesn't match");
        require(contractActive == false, "contract must be paused");
        delete developersList[devInList];
        developersList.length --;
        delete weightNumberChecker[devInList];
        delete developers[devAddress];
        checkWeight();
    }

    /**
     * @dev Removes admin.
     * @param adminAddress is the address of the developer you wish to remove.
     */
    function removeAdmin(address adminAddress) public {
        require(isAdmin[adminAddress] == true, "Must be admin");
        require(adminAddress != owner, "cannot be the owner");
        isAdmin[adminAddress] = false;
        admins.length --;
    }


    /**
     * @dev Extend the deadline. Will prolong Step 4, implying one cannot make this call after Step 3.
     **/
    function extendDeadline() public onlyAdmin {
        require(stepCount <= 3, "Cannot change contract time after third step");
        require(additionalWeeks <= 2, "Contract can maximal be extended by two weeks");
        uint newDeadline = contractEndTime + 1 weeks;
        contractEndTime = newDeadline;
        additionalWeeks++;
        timeStep = contractEndTime / 4;
        emit LogDeadlineExtended(newDeadline);
    }


    /**
     * @dev Emergency stop which is necessary to have if the owner has technical issues etc.
     * @dev Can only be called by owner or added admin
     **/
    function pauseContract() public onlyAdmin isActive {
        require(contractActive == true);
        contractActive = false;
        pauseButtonUsed = true;
        emit LogPauseContract(true);
    }


    /**
     * @dev Resume the contract after it has been paused.
     * @dev Added "hasStarted" as an extra security parameter, otherwise one could start the contract from here instead of startWork().
     **/
    function resumeContract() public onlyAdmin {
        require(pauseButtonUsed == true);
        require(contractActive == false, "contract must be paused");
        contractActive = true;
        emit LogResumeContract(false);
    }


    /**
     * @dev Option to kill contract for any reason. Not necessary, but if owner for any reason want to erase everything,
     * he should be able to do it.
     **/
    function killContract() public returns(bool dead) {
        require(msg.sender == owner);
        selfdestruct(owner);
        return(true);
    }


    /**
     * @dev Fallback function which will take care of potential function calls that involve money, if gas runs
     **/
    function()external payable {
        require(msg.data.length == 0);
        emit LogDepositReceived(msg.sender);
    }
}
