import Controller from '@ember/controller';
import { action } from '@ember/object';

var acc = null;
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const contract_address = '0x476059cD57800DB8eB88f67c2Aa38A6fCf8251e0';
const player1_address = '0xa508dd875f10c33c52a8abb20e16fc68e981f186';
//const Web3 = require("web3");

export default class ApplicationController extends Controller {
    constructor() {
        super();
    }
@action async getcontractbalance()
{
     let lweb3 = new Web3('http://192.168.0.7:8545');
     // let lweb3 = new Web3('http://127.0.0.1:9545');
          
      let contract = new lweb3.eth.Contract(abi, contract_address);

      let res = await contract.methods.balanceOf('0x3e508fcfc8748a5cc22eb186991adf03e867367e').call({from: '0x3e508fcfc8748a5cc22eb186991adf03e867367e'});
    console.log(res);
}

    @action async mint() {
        if (window.ethereum) {
            console.log('ACC:' + acc);

            let contract = new window.web3.eth.Contract(abi, contract_address);
            let data = '0x7f7465737432000000000000000000000000000000000000000000000000000000600057';
           // let currentGasPrice = web3d.utils.numberToHex(await web3d.eth.getGasPrice());
                      let currentGasPrice = window.web3.utils.numberToHex(await window.web3.eth.getGasPrice());
                       let estimatedGasSpending = window.web3.utils.numberToHex(await contract.methods.mint(acc).estimateGas({from: acc}));
                      console.log('currentGasPrice: ' + currentGasPrice);
                       console.log('estimatedGasSpending: ' + estimatedGasSpending);
                    
          
          
          
            //           const transactionParameters = {
            //               gasPrice: currentGasPrice, // customizable by user during MetaMask confirmation.
            //               gas: estimatedGasSpending,//'0x5208', //gas limit must be 21000. // customizable by user during MetaMask confirmation, is the gas
            //               from: acc, // must match user's active address.
            //               to:contract_address,
            //               value: 0,
            //               data: data // Optional, but used for defining smart contract creation and interaction.
            //           };
          
                              

              contract.methods.mint(acc).send({from: acc, to: contract_address})
             .on('transactionHash', function(hash){
                 console.log('transactionhash: ' + hash);
             })
             .on('confirmation', function(confirmationNumber, receipt){
                
                console.log('confirmation no: ' + confirmationNumber);
             })
             .on('receipt', function(receipt){
                 // receipt example
                 console.log('receipt: '+receipt);
                  
             })
             .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log('error: '+error);
             });
            // const nonce = await web3.eth.getTransactionCount('0x476059cD57800DB8eB88f67c2Aa38A6fCf8251e0', 'latest'); //get latest nonce

            // //the transaction
            // const tx = {
            //   'from': PUBLIC_KEY,
            //   'to': contractAddress,
            //   'nonce': nonce,
            //   'gas': 500000,
            //   'maxPriorityFeePerGas': 1999999987,
            //   'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
            // };




        } else {
            this.connect();
            this.sendmoney();
        }
    }

    @action async sendmoney() {

        if (window.ethereum) {


          //  let web3 = new Web3(window.ethereum);
            console.log('ACC:' + acc);

            //const contract = new web3.eth.Contract(abi,address); 
            //contract.methods.mint(acc);
            //var web3d = new Web3('http://192.168.0.7:8545');

            //let currentGas = await window.ethereum.request({ method: 'eth_estimateGas' });
            //console.log('estimategas: ' + currentGas);
            let data = '0x7f7465737432000000000000000000000000000000000000000000000000000000600057';
  // let currentGasPrice = web3d.utils.numberToHex(await web3d.eth.getGasPrice());
            let currentGasPrice = web3.utils.numberToHex(await window.web3.eth.getGasPrice());
            let estimatedGasSpending = window.web3.utils.numberToHex(await window.web3.eth.estimateGas({ to: player1_address, data: data }));
            console.log('currentGasPrice: ' + currentGasPrice);
            console.log('estimatedGasSpending: ' + estimatedGasSpending);
            let amount = window.web3.utils.numberToHex(window.web3.utils.toWei('1', 'ether'));


            const nonce = await web3.eth.getTransactionCount(acc, 'latest');

            const transactionParameters = {
                nonce: nonce+'', // ignored by MetaMask
                gasPrice: currentGasPrice, // customizable by user during MetaMask confirmation.
                gas: estimatedGasSpending,//'0x5208', //gas limit must be 21000. // customizable by user during MetaMask confirmation, is the gas
                to: player1_address, // Required except during contract publications.
                from: acc, // must match user's active address.
                value: amount, // Only required to send ether to the recipient from the initiating external account.
                data: data, // Optional, but used for defining smart contract creation and interaction.
                chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            };

            // txHash is a hex string
            // As with any RPC call, it may throw an error
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });



        } else {
            this.connect();
            this.sendmoney();
        }


    }

    @action async connect() {

        if (window.ethereum) {



            window.ethereum.on("chainChanged", () => window.location.reload());

            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    console.log(`Using account ${accounts[0]}`);
                    acc = accounts[0];
                } else {
                    console.error("0 accounts.");
                }
            });



            window.ethereum.on("message", (message) => console.log(message));

            window.ethereum.on("connect", (info) => {
                console.log(`Connected to network ${info}`);
            });

            window.ethereum.on("disconnect", (error) => {
                console.log(`Disconnected from network ${error}`);
            });

            acc = await window.ethereum.request({ method: 'eth_requestAccounts' })[0];
            if (acc == null) {
                acc = await window.ethereum.selectedAddress;
            }
            console.log('connected');

            
            window.web3 = new Web3(window.ethereum);
            //window.web3 = new Web3('http://192.168.0.7:8545');
            // const acc = await window.ethereum.request({ method: "eth_requestAccounts" })[0];
            //     let acc = null;
            //    window.ethereum.on("accountsChanged", (accounts) => {
            //     if (accounts.length > 0) {
            //         console.log(`Using account ${accounts[0]}`);
            //         acc = accounts[0];
            //     } else {
            //         console.error("0 accounts.");
            //     }
            // });




        } else {
            console.error("Install MetaMask.");
        }



        //       var web3 = new Web3('http://192.168.0.7:8545');
        //   web3.eth.getProtocolVersion().then(function(protocolVersion) {
        //       console.log(`Protocol Version: ${protocolVersion}`);
        //   });

        //   web3.eth.getGasPrice().then(function(gasPrice) {
        //       console.log(`Gas Price: ${gasPrice}`);
        //   });

        //   var our_contract_address = "0x8d242e4bc081e2eeD5eb9d6BF734DdF5d2F435e0";

        //   web3.eth.getBalance(our_contract_address).then(function(balance) {
        //     console.log(`Balance of ${our_contract_address}: ${balance}`);
        // });




        //if metamask chain is incorrect and has to be changed 









    }

}
