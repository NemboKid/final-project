import Web3 from 'web3';

const web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let contractABI=[
  {
    "constant": true,
    "inputs": [],
    "name": "creator",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x02d05d3f"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "admins",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x14bfd6d0"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "timeStep",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x1502906d"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "isAdmin",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x24d7806c"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x27e235e3"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "stepCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x415deffa"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "depositAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x419759f5"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "weightNumberChecker",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x51e954aa"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "developers",
    "outputs": [
      {
        "name": "developerAddress",
        "type": "address"
      },
      {
        "name": "weight",
        "type": "uint256"
      },
      {
        "name": "acceptedSteps",
        "type": "uint8"
      },
      {
        "name": "isDeveloper",
        "type": "bool"
      },
      {
        "name": "withdrawalCounter",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x61fd5c20"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "acceptedSteps",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8ff270c5"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "developersList",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xab9c9c18"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "contractEndTime",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xb8534ed1"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "contractActive",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe289fcb6"
  },
  {
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "none",
        "type": "string"
      }
    ],
    "name": "LogNoneAcceptedStep",
    "type": "event",
    "signature": "0xd15430ac06138e667fb03f24193aa489bd4a2c099235938cbc278713579361ca"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "first",
        "type": "string"
      }
    ],
    "name": "LogFirstAcceptedStep",
    "type": "event",
    "signature": "0x933ac886de7ac0e6f68a0a81767cf33125acd2de315037dc196dc69cce2735e2"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "second",
        "type": "string"
      }
    ],
    "name": "LogSecondAcceptedStep",
    "type": "event",
    "signature": "0x88f2d2ca2b8d28751cb11caa924dc11c5a8d75fc45ef7834dc0ce65d7e8aceec"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newDeadline",
        "type": "uint256"
      }
    ],
    "name": "LogDeadlineExtended",
    "type": "event",
    "signature": "0x3649239ef6fcf1a37a7f28defe804b900337582bcd355087760a1cfe9af9717b"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "unixTimeOfContract",
        "type": "uint256"
      }
    ],
    "name": "LogContractEndsAt",
    "type": "event",
    "signature": "0x31c42a5554cce3aa0df8f857eb3aa46cf90cc61549e32f4630c6632da37e07ca"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "developerAddressAdded",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "developerRewardWeight",
        "type": "uint256"
      }
    ],
    "name": "LogDeveloperAdded",
    "type": "event",
    "signature": "0xf84726c57ea7aa8d56e686155d2d110955222ecc35358ceecbf67040310f9d66"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "adminAddress",
        "type": "address"
      }
    ],
    "name": "LogAdminAdded",
    "type": "event",
    "signature": "0x873b6546df550db4e197c19f621af58777f109107ed897212d3ab52d5a9f2ede"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "contractPaused",
        "type": "bool"
      }
    ],
    "name": "LogPauseContract",
    "type": "event",
    "signature": "0xa843684c9687b7e9174bb21abe6cd723ac60692a4d26883a8b8795f410b6ba1b"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "contractActive",
        "type": "bool"
      }
    ],
    "name": "LogResumeContract",
    "type": "event",
    "signature": "0x5920dcc2fce9de8e9f065fa16dd41c06e19489eeb386d75c04f264e03c937d26"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "stepCount",
        "type": "uint256"
      }
    ],
    "name": "LogStepCount",
    "type": "event",
    "signature": "0xfba9e6cd2bac4aba75056df862cc12c165d9a205b8aea1aef837e9b470932a16"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "amountWithdrawn",
        "type": "uint256"
      }
    ],
    "name": "LogWithdrawal",
    "type": "event",
    "signature": "0xa26d6de68d7cc61e250566e49297af6d4a7dfb4b5a0185fb55db62de31915481"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "whoSent",
        "type": "address"
      }
    ],
    "name": "LogDepositReceived",
    "type": "event",
    "signature": "0x15382559391789f1865e10e9c8b51327a9cb0381eae89973ada229e7a78c08f3"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "timeContract",
        "type": "uint256"
      }
    ],
    "name": "startWork",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x03a250f9"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "developer",
        "type": "address"
      },
      {
        "name": "reward",
        "type": "uint256"
      }
    ],
    "name": "addDeveloper",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x268a66d8"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "numberOfDevs",
    "outputs": [
      {
        "name": "numberOfDevelopers",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd1456abd"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "stepAccept",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd51c87c0"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdrawal",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd4e93292"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_admin",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x70480275"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "checkBalance",
    "outputs": [
      {
        "name": "contractBalance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xc71daccb"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "devAddress",
        "type": "address"
      },
      {
        "name": "devInList",
        "type": "uint256"
      }
    ],
    "name": "removeSingleDev",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf7626772"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "removeAllDevelopers",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x305716c4"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "adminAddress",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1785f53c"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "devAddress",
        "type": "address"
      },
      {
        "name": "newWeight",
        "type": "uint256"
      }
    ],
    "name": "changeDevWeight",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xcf6a084e"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newDeadline",
        "type": "uint256"
      }
    ],
    "name": "extendDeadline",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x389b7533"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pauseContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x439766ce"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "resumeContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc4bc5da5"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "bankAddress",
        "type": "address"
      }
    ],
    "name": "contractKill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xeb949bc9"
  }
]
let contractAddress='0x263228Ad0a40FFE24d09F1800FE29D934B113D75';
web3.eth.defaultAccount = web3.eth.accounts[0]


const contractAddress=web3.eth.contract(contractABI).at(contractAddress);
export {contractAddr};
