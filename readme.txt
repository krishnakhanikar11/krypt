Key features:
  Connected to blockchain
  Metamask pairing
  Interaction in smart contract
  Sending ethereum through blockchain network
  Writing solidity code
  


In smart_contract:
step0: npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
step 1: In contracts folder, make a transaction.sol file where we write our ethereum contract.
step 2: In script folder, we write main function which is responsible for deloying the contract.
step 3: install metamask and create a test network ropsten or rinkeby and get test ethereum.
step 4: create app in alchemy(Blockchain API). Get the http key from the app.
step 5: In smart_contract, edit the hardhat.config.js. Paste http key in 'url' and private key from metamask in 'accounts'.
step 6: npx hardhat run scripts/deploy.js --network rinkeby
step 7: we will get transaction address. Copy it.
step 8: artifacts folder in smart_contract will be generated.
step 9: Create a utils folder in client and make two files constants.js and Transactions.json copy paste code(--smart_contract--artifacts--contracts-transaction.sol-transaction.json)
/* This is called ABI. contract application binary interface..it is standard waay to interact with contracts in ethereum eco system */
step 10: now we have everything we need inside our react to interact our ethererum smart contract.

In client:
step 1: Create a context folder. We're gonna use react context api around our entire app thats going to serve the purpose of connection to the blockchain. That's going to allow only to write our logic in one centralized place rather than many file.
