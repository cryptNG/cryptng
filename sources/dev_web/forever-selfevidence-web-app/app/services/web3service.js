import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Web3service extends Service.extend({
  // anything which *must* be merged to prototype here
}) {


  
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
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fromHash",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "toHash",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "MintedHashMapEvidence",
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
          "internalType": "string",
          "name": "uri",
          "type": "string"
        }
      ],
      "name": "setBaseURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getIsSelfEvidencingActive",
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
      "name": "setIsSelfEvidencingActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setIsSelfEvidencingInactive",
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
          "name": "fromHash",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "toHash",
          "type": "uint256"
        }
      ],
      "name": "mintHashMapEvidence",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "evidenceHash",
          "type": "uint256"
        }
      ],
      "name": "mintSelfEvidence",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "evidenceByTokenId",
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
          "name": "fromHash",
          "type": "uint256"
        }
      ],
      "name": "verifyEvidenceHashMap",
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
          "name": "evidenceHash",
          "type": "uint256"
        }
      ],
      "name": "verifySelfEvidence",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
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
  ];//#end <- end of auto-replacement for migration
  
  
  _web3addr = 'https://testnet.cryptng.xyz:8545';  
  _bet_contract_address = '0x4E826E6738FE1F007391c07eb73742AAdF8d16C7';
  _lweb3 = new Web3(this._web3addr);
  _contract = new this._lweb3.eth.Contract(this._abi, this._bet_contract_address);
  _metamask = null;
  @tracked _connected = false;
  @tracked _installed = false;
  @tracked _isMintingActive = false;

  
  async getIsMintingActive()
  {
    // let this._lweb3 = new Web3('http://127.0.0.1:9545');

    

    let res = await this._contract.methods.getIsSelfEvidencingActive();
    console.log(res);
    this._isMintingActive = res;
  }

  
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
      this._metamask = new window.web3.eth.Contract(this._abi, this._bet_contract_address);
      

      window.ethereum.on("disconnect", (error) => {
        console.log(`Disconnected from network ${error}`);
        
        router.transitionTo('/');
        document.location.reload();
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          console.log("Found accounts.");
          router.transitionTo('/');
          document.location.reload();
        } else {
          console.error("0 accounts.");
          router.transitionTo('/');
          document.location.reload();
        }
      });
      this.hasWalletEventsSet = true;
    }
   

  }

  async connect() {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());

     
    await window.ethereum.request({ method: 'eth_requestAccounts' })[0];



      window.ethereum.on("message", (message) => console.log(message));

      window.ethereum.on("connect", (info,) => {
        console.log(`Connected to network ${info}`);
        document.location.reload();
      });

      window.ethereum.on("disconnect", (error) => {
        console.log(`Disconnected from network ${error}`);
        document.location.reload();
      });

      console.log('connected');
      
    } else {
      console.error("Install MetaMask.");
    }

  }

  
//if this is async, and awaited on the calling side, ember build fails with "applypatches"
toBigNumber(hexHash)
{
  return this._lweb3.utils.toBN(hexHash);
}



  async verifySelfEvidence(hashToProof) {
    if (window.ethereum) {
      console.log('HashToProof:' + hashToProof);
      const bigNum = this.toBigNumber(hashToProof);

    console.log('Converted ' + hashToProof + ' to ' +bigNum);


      
      let estimatedGasSpending = this._lweb3.utils.numberToHex(await this._contract.methods.verifyEvidenceHashMap(bigNum).estimateGas());
      console.log('estimatedGasSpending: ' + estimatedGasSpending);
   
      let resultObject = await this._metamask.methods.verifySelfEvidence(bigNum).call({ from: window.ethereum.selectedAddress });
     
      return {hash: resultObject[0], unixtime: resultObject[1], tokenid: resultObject[2]};
    } else {
      window.alert("not connected");
    }
  }

  
  async mintSelfEvidence(evidenceHash) {
    if (window.ethereum) {
      
      const bigNum = this.toBigNumber(evidenceHash);
      console.log('ACC:' + window.ethereum.selectedAddress);

      
      let value = window.web3.utils.toWei('0.001', 'ether');
      console.log('contract:' + this._contract);
      let currentGasPrice = window.web3.utils.numberToHex(await window.web3.eth.getGasPrice());
      console.log('currentGasPrice: ' + currentGasPrice);
      let estimatedGasSpending = window.web3.utils.numberToHex(await this._contract.methods.mintSelfEvidence(bigNum).estimateGas({ from: window.ethereum.selectedAddress, value: value }));
      console.log('estimatedGasSpending: ' + estimatedGasSpending);
      console.log(value);
      let result = await this._metamask.methods.mintSelfEvidence(bigNum).send({ from: window.ethereum.selectedAddress, to: this.contract_address, value: value })
        .on('receipt', function (receipt) {
          // receipt example
          console.log('ok');

        })
        .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log('nok');
        });
        return result.status;
    } else {
      this.connect();
      this.mint();
    }
  }

//REMOVE UNIXTIME FROM SMARTCONTRACT, INSTEAD GET FROM RPC (EVENT)

async getMintedTransactionHashForTokenId(tId)
{
  let txHash;
  let timeStamp;
  await this._contract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events){ 
      //console.log(events); 
  })
  .then(async (events)=>{
      //console.log('TokenId! ' + event.returnValues.tokenId); 
      for (let i = 0; i < events.length; i++) {
        if(events[i].returnValues.tokenId == tId)
        {
          console.log('TID: ' + tId);
          txHash = events[i].transactionHash;
          let block = await this._lweb3.eth.getBlock(events[i].blockNumber);
          timeStamp = block.timestamp;
          console.log('TIME: ' + timeStamp);
          break;
        }
      } 



      
  });
  return {txhash: txHash, timestamp: timeStamp};
}


  
}
