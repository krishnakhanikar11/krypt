/* hardhat is used to run solidity code locally and test our contract before delopying.
Solidity is a programming language used for eth blockchain */

/* step 1: Write solidity version */

//SPDX-License-Identifier: UNLICENSED
pragma solidity^0.8.0;

/* step 2: creating contract -this contract is serving as a class like in oops*/

contract Transactions {
    /* declaring variables */
    uint256 transactionCount; /* holding no. of transactions */

    /* think of it as a function we are going to pull off later on */
    event Transfer(address from, address receiver, uint256 amount, string message, uint256 timestamp, string keyword); 

    /* properties our transfer needs to have */
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    /* defining array of different transactions */
    TransferStruct[] transactions;

    /* creating function 1 */
    /* whenever we are going to call addtoBlockchain function,we will add transaction to transactions array and update the count */
    function addToBlockchain(address payable receiver,uint amount,string memory message,string memory keyword) public{
        transactionCount +=1;
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));

        emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);

    }

    /* creating function 2 */
    function getAllTransactions() public view returns (TransferStruct[] memory){
        return transactions;
    }

    /* creating function 3 */
    function getTransactionCount() public view returns(uint256){
        return transactionCount;
    }



}
