pragma solidity ^0.5.0;


import "./UsingOraclize.sol";

contract RepoTest is usingOraclize {

   string public repoStars;


   mapping(address => uint) public balances;
   event LogConstructorInitiated(string nextStep);
   event LogStarsUpdated(string stars);
   event LogNewOraclizeQuery(string description);

   constructor() payable public {
       emit LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Oraclize Query.");
   }

   function __callback(bytes32 myid, string memory result) public {
       if (msg.sender != oraclize_cbAddress()) revert();
       repoStars = result;
       emit LogStarsUpdated(result);
   }

   function updateStars() payable public {
       if (oraclize_getPrice("URL") > address(this).balance) {
           emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
           oraclize_query("URL", "json(https://api.github.com/repos/NemboKid/simple-dapp).stargazers_count");
       }
   }

   function()external payable {
   }
}
