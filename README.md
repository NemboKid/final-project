# simple-dapp


## :computer: Contract purpose and overview

This contract could be used and included on platforms such as Fiverr.com, Freelancer.com, Gitcoin.co, or other Project Based Websites where there's one Issuer and one Worker. With a smart contract setup, work can be performed entirely online and the Issuer/Project Owner can control the quality and his payments all the time. The Worker/Developer, on the other hand, will only get paid if he satifies the requirements that was stated from the Issuer on the hypothetical website, where other similar projects are listed as well. 

The contract is constituted out of four steps, together with a total deadline. This deadline is decided upon the contract start, and its four steps are, naturally, one forth of the total contract time. The max duration a contract can have is 52 weeks. 

This is indeed a simple bounty contract. I did not aim to copy any other bounty contracts during the creation of this contract, as I wanted to find my own logic and get an understanding of the business purposes. Any similarities with other bounty contracts may appear for obvious reasons, but if so - they are entirely coincedental.

**Contract prerequisities:** The project should have a small and easy scope. The work performed must be digital and presented to the contract's owner before each step's deadline. The purpose of the whole contract is that people should be able to work remotely, and the use of Github, Trello, Appear.in and other resources may come in handy. It's assumed that the developers and the owner have a strong communication and help each other.

### :bangbang: Important remarks:

* The contract has been constructed from a company's point of view and its presumed that the developers are successful in their job. The real incentives will disappear for the working developers as soon as they miss or fail a step and hance a quarter payment. 

* The maximum time is set to 52 weeks, which is a bit long given the four hard coded steps. This contract is more suitable for smaller gigs not requiring too big payments. 

* This project should be perceived as very experimental and is for educational purposes only. 


### :memo: Contract Structure

The contract includes three different roles: i) owner, ii) developer and iii) admin. They serve different purposes which will be explained in greater detail below.


**1) Owner**
The Deployer of the contract will also become its owner. In this case, it will be the company/person issuing the project. This role will be responsible for the security of the contract. The Owner has the responsibility to fill up the developer role (Role #2), decide the contract duration and the reward that should be given to the developers performing the job. 

The Owner will also have to accept steps along the way, which is a way to control the developers working on the project. They have a predetermined deadline for each step, which needs to be accepted from the issuer. If not accepted, no withdrawal can be made. 


**2)Developer**
As described above, the owner will have to include at least one developer to work for him in this project. The developer's only action in the smart contract is to withdraw his money. After each accepted step, the developer can withdraw one forth of the total amount he has right to. If he is the only developer in the contract, then he will have 100% of the weight. Otherwise he can have anything between 0-100 (one developer can have agreed to only 1% of the contract reward, given he don't have to do much work. This while another takes 99% and is the superstar of the two).


**3)Admin**
An Admin can be added by the Owner in order to maintain the contract and reduce the workforce, if necessary. There are both pros and cons with adding an admin to the project. While giving up some of the power, it can at the same time be great to have an extra hand and someone else that can accept a step.


### Requirements and Evaluation

Everything is done with Truffle and React, following the exact same methods as we saw in the video lesson "Integrating With React". The command for setting up the React environment is `truffle unbox react`. I have used Ganache client for all development and port 8545 (as can be found in `truffle-config.js`). 

Versions: 
- React: 16.7.0
- Web3: 1.0.0-beta.35
- Truffle: v5.0.0-next.17 (core: 5.0.0-beta.1)
- Solidity: v0.5.0 (solc-js)
- Node: v10.6.0
- MacOS 10.14 (Mojave)


**Instructions for setting up everything:**
1) Clone repo
2) Start ganache-cli in terminal
3) From the terminal, in the client folder inside the project, type `npm run start`. This should start the server on http://localhost:3000/
4) In the project folder, type `truffle migrate`, could also be done with the flag `--reset`
5) On localhost:3000, start interact with the contract through Metamask. Make sure to import the seed words you got from `ganache-cli`


**Ropsten Testnet**
The project is deployed to the Ropsten Testnet (Infura). Check the file `deployed_addresses.txt` to see the addresses. Also check `infura_setup.md` to see what changes to make if you want to interact with the frontend when it's on Ropsten.
