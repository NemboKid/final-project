**resumeandkill.js**

Here I wanted to test the control mechanisms and how the circuit breaker comes in. Is the contract stoppable and can then be resumed? Also wanted to see the selfdestruct function that it worked as I wanted.


**TestAdmin.js**

Can admins do everything and is the role working as I wanted?


**testdevelopers.js**

Can the developers be added, removed and added again? Can they perform all calls and functions they should? Also controls their weight reward (which is 0-100%).



**workingcontract.js**

General test where I go from start to finish with the contract and test the workflow. 



**Calls Oracle Properly (inside workingcontract.js)**

This test has to be changed and the try...catch..(error) needs to be removed. Since the Oracle only is available on Testnet (if you don't set up an Ethereum-bridge), these tests would always failed if tested from private server.
Can pretty much be ignored and is useless unless testnet. But then they need to be re-written. 


