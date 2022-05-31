import React, {Children, useEffect,useState} from 'react';
import {ethers} from 'ethers';

import { contractABI,contractAddress } from '../utils/constants';

/* creating react context */
export const TransactionsContext = React.createContext();

/* since we are using metamask we get acess to ethereum object */
const {ethereum} = window;


/* function which is going to fetch our ethereum contract */
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress,contractABI,signer);

    return transactionsContract;
}

/* providing the context across app */
export const TransactionProvider = ({children}) => {

    const [currentAccount,setCurrentAccount] = useState();
    const [formData,setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''});
    const [isloading,setIsLoading] = useState(false);
    const [transactionCount,setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    /* handling changes in the form */
    const handleChange = (e,name) => {
        setFormData((prevState) => ({...prevState,[name]: e.target.value}));
    }

    /* getting all transactions */
    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
            
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
          
        }
      };

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});

            if(accounts.length){
                setCurrentAccount(accounts[0]);
                //getAllTransactions();
                
            }else{
                console.log('no accounts found');
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
        
        
    }

    const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if(ethereum) {

            /* getting data from the form */
            const {addressTo,amount,keyword,message} = formData;

            /* sending eth from one address to another */
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex
                }]
            })

            /* storing transaction */
            setIsLoading(true);
            const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
            console.log(`loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);

            
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            window.location.reload();
        }else{
            console.log("No ethereum object"); 
        }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    },[transactionCount]);

    return (
        <TransactionsContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,transactions,isloading,transactionCount}}>
            {children}
        </TransactionsContext.Provider>
    )
}

/* in the start of the application we are checking ifWallet is connected through useeffect and then setting the account in useState. */