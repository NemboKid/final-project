### Design Pattern and Security Considerations

**Upgradability**

I actively chose not to include any of the two upgradability patterns (Data Separation and Delegatecall-based proxies). 
To understand my reasoning, please read my explaining points below:

- My aim is to strive for simple contracts that are both secure and immutable. 
- It would increase the complexity of the contract and its readability, which is opposed to my purpose.
- A considerable potential of flaws and can introduce bugs, as has been seen many times. It's a topic still under heavy research and is still considered very experimental.
- The created contract is constructed for small short term projects.
- For more details, I can recommend https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/


**Number of Steps and Time Limit**

I chose to only let the contract maximal run for 10 weeks (8 weeks normal, then an extention can be made with 2 additional weeks). 
At first I had it for one year, but I want my contract to be simple and not to include too much money and hence be big working operations. 
As the contract is hard coded and only consists of a number of weeks (1-8, with an extention of 2 weeks),
the purpose is not attach large and complex agile projects. Four steps is perfect for smaller projects.

If the contract would run for 52 weeks, 4 steps wouldn't be sufficient. If someone wants to improve this contract and increase its scope, it needs to be part of a larger system which includes a scrum like structure
together with careful Github interaction and controlling structures for pull requests etc. 


**Roles**

The contract is designed from a company's point of view and I made this role extremelly powerful with purpose. The four steps are there to protect both the owner and the developers,
where the never needs to accept if he doesn't like the result. At the same time, if the first step isn't accepted, the developers will not continue to work since the owner is i) disatisfied or ii) not serious.
In accordance to what I wrote under "Number of Steps and Time Limit", smaller steps could increase the feeling of security for both developers and the owner. However, I wanted to 
build a very easy project that's intiutive and with hard coded steps. One improvement could be that the owner can choose number of steps and also the time for them, but I chose to 
make a short term contract for simplicity reasons. With an increased number of steps, the owner, who's perhaps not very technical, would need to 
interact with the contract more often, increasing both cost in terms of gas usage as well as complexity.



**Withdrawals**

I wanted to have the contract as automated as possible, but due to the security concerns with push payments for external calls, developers will have to withdraw their money by themselves through pull payments. 



**Fallback Function**

The fallback function is there to pick up any potential calls containing ether that doesn't match any function in the contract. Also checks that the data is empty and therefore only logs when ether is received. This is because users will notice the difference when calling functions that works and functions that don't work.


**Circuit Breaker**
pauseContract() and resumeContract() are used as the circuit breaker and is used in tandem with the modifier onlyAdmin.
This functionality should be used in tandem with Ownable so that only the contract owner can pause/unpause the app. This is useful for buying time in dire situations and analyzing what went wrong and how to fix it. 



**Some Notes about the Sovereignity of the Owner**
First I thought about having a company that maintains a platform to publish small projects, where developers can pick them up and earn ether, like Gitcoin, and that this company would be the deployer of the smart contract and hence maintain it and overview its security. The hypothetical "Platform Company" would then deploy and insert the owner's address (the company who orders the project) and handle this service for them. However, this would be too centralized and the smart contract lost much of its sense and the reason of using a smart contract approach was almost gone. Because of that, I assumed that this project and contract must be deployed and handled all the way by the company and project owner (Owner), and it's assumed this entitity is technical and knows what he is doing.

It could be argued that one common and potential attack scenario exists within the circuit breaker, where the Owner can pause the contract and refuse to resume it if the developers don't pay him on the side. In the case of this contract, however, the Owner must have all the power and the steps are created to protect the two entities from each other and discentivise them from not acting honest. 

If the Owner wants to perform an attack after step 2, he can do so but then the Developers will probably leave and don't need to continue with the work. The biggest risk, from the Developers point of view, is before Step 1. The Developers can do a great job and deliver code that the Owner is happy with. The Owner takes it, but doesn't accept the step. This will mean he gets the first code delivery, whereas the Developers don't receive money. This will always be the case, the Developers risk 1/4 of their money at all times if the Owner won't accept a step. Either beacuse he doesn't like the work, or for any other reason don't want to pay out his money. 

Any malicious acting from any party will have the consequence of failed work performance and a product will never emerge. This is how it also works in the real world. If we assume this a contract like this is implemented on Gitcoin or any other similar platform, a ranking or reputation system can be used on the side in order to promote good behavor and vice versa. 
