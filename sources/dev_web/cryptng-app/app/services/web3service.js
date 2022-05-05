import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Web3service extends Service.extend({
  // anything which *must* be merged to prototype here
}) {


 

    


  // normal class body definition here
  _abi = [
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
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "addressToAllow",
          "type": "address"
        }
      ],
      "name": "AssignedAllowedServiceEvent",
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
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        }
      ],
      "name": "CreatedExecutionTicket",
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
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        }
      ],
      "name": "ExecutionTicketBurned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
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
      "name": "GivenTokenAllowance",
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
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "RevokedTokenAllowance",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "addressToUnassign",
          "type": "address"
        }
      ],
      "name": "UnassignedAllowedServiceEvent",
      "type": "event"
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
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "getTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
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
      "name": "renounceOwnership",
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
      "inputs": [],
      "name": "totalSupply",
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
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getExecutionBatchSizeByTokenId",
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
      "name": "getTicketId",
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
        },
        {
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        }
      ],
      "name": "getTicketSecret",
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
      "name": "revokeTokenAllowance",
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
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "giveTokenAllowance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addressToAllow",
          "type": "address"
        }
      ],
      "name": "assignAllowedService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addressToUnassign",
          "type": "address"
        }
      ],
      "name": "unassignAllowedService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        }
      ],
      "name": "getTokenIdByTicketId",
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
          "name": "ticketId",
          "type": "uint256"
        }
      ],
      "name": "serviceBurnExecutionTickets",
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
        },
        {
          "internalType": "uint256",
          "name": "serviceSecret",
          "type": "uint256"
        }
      ],
      "name": "createExecutionTicket",
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
      "name": "burnExecutionTicket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "tokenType",
          "type": "uint16"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getIsSaleActive",
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
      "inputs": [],
      "name": "setIsSaleActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setIsSaleInactive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newPriceGwei",
          "type": "uint256"
        }
      ],
      "name": "adaptMarketPrice",
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
      "name": "getTokenBalance",
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
    }
  ]

  _web3addr = 'https://yitc.ddns.net:8545'; 
  _cpt_contract_address = '0x476059cD57800DB8eB88f67c2Aa38A6fCf8251e0';
  _lweb3 = new Web3(this._web3addr);
  _contract = new this._lweb3.eth.Contract(this._abi, this._cpt_contract_address);
  _metamask = null;
  @tracked _connected = false;
  @tracked _installed = false;
  @tracked _isSaleActive = false;


  
  
  get selectedAddress()
  {
    return window.ethereum.selectedAddress;
  }

  get isConnected()
  {
           return (window.ethereum.selectedAddress || null)  != null
  }

  
  registerHandlers(router)
  {
    if(!this.hasWalletEventsSet)
    { 
      
      
      window.web3 = new Web3(window.ethereum);
      this._metamask = new window.web3.eth.Contract(this._abi, this._cpt_contract_address);
      

      window.ethereum.on("disconnect", (error) => {
        console.log(`Disconnected from network ${error}`);
       router.transitionTo('/');
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
           router.transitionTo('dashboard');
        } else {
          console.error("0 accounts.");
          router.transitionTo('/');
        }
      });
      this.hasWalletEventsSet = true;
    }
   

    if((window.ethereum.selectedAddress || null) != null)
    {
     router.transitionTo('dashboard');
    }
  }

  async connect(funcContinueDashBoard, funcContinueMain) {

    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());

     
    await window.ethereum.request({ method: 'eth_requestAccounts' })[0];



      window.ethereum.on("message", (message) => console.log(message));

      window.ethereum.on("connect", (info) => {
        console.log(`Connected to network ${info}`);
      });

      window.ethereum.on("disconnect", (error) => {
        console.log(`Disconnected from network ${error}`);
        funcContinueMain();
      });

      console.log('connected');
      
    } else {
      console.error("Install MetaMask.");
    }

  }

  async getIsSaleActive()
  {
    // let this.lweb3 = new Web3('http://127.0.0.1:9545');

    

    let res = await this._contract.methods.getIsSaleActive();
    console.log(res);
    this._isSaleActive = res;
  }

  
  async migrate() {

    if (window.ethereum) {


      console.log('ACC:' + window.ethereum.selectedAddress);



      let lastBlockDec = await this._lweb3.eth.getBlockNumber();



      while (lastBlockDec > 0) {
        lastBlockDec--;
        const block = await this._lweb3.eth.getBlock(lastBlockDec, false);

        const txHash = block.transactions[0];
        const receipt = await this._lweb3.eth.getTransactionReceipt(txHash);
        if (receipt.contractAddress) {
          this._cpt_contract_address = receipt.contractAddress;
          return;
        }
      }



    } else {
      this.connect();
      this.migrate();
    }



  }

  async getcontractbalance() {
    // let this.lweb3 = new Web3('http://127.0.0.1:9545');

    
    let res = await this._contract.methods.balanceOf(this.player8_address).call({ from: this.player8_address });
    console.log(res);
  }

  @action async mintType1() {
    if (window.ethereum) {
      console.log('ACC:' + window.ethereum.selectedAddress);

      
      
      let value = this._lweb3.utils.toWei('0.0001', 'ether');
      console.log('contract:' + this._contract);
      let currentGasPrice = this._lweb3.utils.numberToHex(await this._lweb3.eth.getGasPrice());
      console.log('currentGasPrice: ' + currentGasPrice);
      let estimatedGasSpending = this._lweb3.utils.numberToHex(await this._contract.methods.mint(1,window.ethereum.selectedAddress).estimateGas({ from: window.ethereum.selectedAddress, value: value }));
      console.log('estimatedGasSpending: ' + estimatedGasSpending);
      console.log(value);
      console.log('ETH-ADD: ' + window.ethereum.selectedAddress);
      await this._metamask.methods.mint(1,window.ethereum.selectedAddress).send({ from: window.ethereum.selectedAddress, value: value })
        .on('transactionHash', function (hash) {
          console.log('transactionhash: ' + hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {

          console.log('confirmation no: ' + confirmationNumber);
        })
        .on('receipt', function (receipt) {
          // receipt example
          console.log('receipt: ' + receipt);

        })
        .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          console.log('error: ' + error);
        });
    } else {
      this.connect();
      console.log('ERR');
      this.mint();
    }
  }

  
  @action async mintType2() {
    if (window.ethereum) {
      console.log('ACC:' + window.ethereum.selectedAddress);

      
      
      let value = this._lweb3.utils.toWei('0.0001', 'ether');
      console.log('contract:' + this._contract);
      let currentGasPrice = this._lweb3.utils.numberToHex(await this._lweb3.eth.getGasPrice());
      console.log('currentGasPrice: ' + currentGasPrice);
      let estimatedGasSpending = this._lweb3.utils.numberToHex(await this._contract.methods.mint(1,window.ethereum.selectedAddress).estimateGas({ from: window.ethereum.selectedAddress, value: value }));
      console.log('estimatedGasSpending: ' + estimatedGasSpending);
      console.log(value);
      console.log('ETH-ADD: ' + window.ethereum.selectedAddress);
      await this._metamask.methods.mint(2,window.ethereum.selectedAddress).send({ from: window.ethereum.selectedAddress, value: value })
        .on('transactionHash', function (hash) {
          console.log('transactionhash: ' + hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {

          console.log('confirmation no: ' + confirmationNumber);
        })
        .on('receipt', function (receipt) {
          // receipt example
          console.log('receipt: ' + receipt);

        })
        .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          console.log('error: ' + error);
        });
    } else {
      this.connect();
      console.log('ERR');
      this.mint();
    }
  }

  


  
}
