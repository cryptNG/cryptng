import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Web3service extends Service.extend({
  // anything which *must* be merged to prototype here
}) {


  acc = null;
  abi = [    {"inputs": [],"stateMutability": "nonpayable","type": "constructor"    },    {"anonymous": false,"inputs": [  {"indexed": true,"internalType": "address","name": "owner","type": "address"  },  {"indexed": true,"internalType": "address","name": "approved","type": "address"  },  {"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "Approval","type": "event"    },    {"anonymous": false,"inputs": [  {"indexed": true,"internalType": "address","name": "owner","type": "address"  },  {"indexed": true,"internalType": "address","name": "operator","type": "address"  },  {"indexed": false,"internalType": "bool","name": "approved","type": "bool"  }],"name": "ApprovalForAll","type": "event"    },    {"anonymous": false,"inputs": [  {"indexed": false,"internalType": "address","name": "sender","type": "address"  },  {"indexed": false,"internalType": "address","name": "addressToAllow","type": "address"  }],"name": "AssignedAllowedServiceEvent","type": "event"    },    {"anonymous": false,"inputs": [  {"indexed": false,"internalType": "address","name": "creator","type": "address"  },  {"indexed": false,"internalType": "uint256","name": "fromHash","type": "uint256"  },  {"indexed": false,"internalType": "uint256","name": "toHash","type": "uint256"  },  {"indexed": false,"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "MintedHashMapProof","type": "event"    },    {"anonymous": false,"inputs": [  {"indexed": true,"internalType": "address","name": "previousOwner","type": "address"  },  {"indexed": true,"internalType": "address","name": "newOwner","type": "address"  }],"name": "OwnershipTransferred","type": "event"    },    {"anonymous": false,"inputs": [  {"indexed": true,"internalType": "address","name": "from","type": "address"  },  {"indexed": true,"internalType": "address","name": "to","type": "address"  },  {"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "Transfer","type": "event"    },    {"anonymous": false,"inputs": [  {"indexed": false,"internalType": "address","name": "sender","type": "address"  },  {"indexed": false,"internalType": "address","name": "addressToUnassign","type": "address"  }],"name": "UnassignedAllowedServiceEvent","type": "event"    },    {"inputs": [],"name": "owner","outputs": [  {"internalType": "address","name": "","type": "address"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "address","name": "newOwner","type": "address"  }],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "string","name": "uri","type": "string"  }],"name": "setBaseURI","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "address","name": "addressToAllow","type": "address"  }],"name": "assignAllowedService","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "address","name": "addressToUnassign","type": "address"  }],"name": "unassignAllowedService","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "uint256","name": "fromHash","type": "uint256"  },  {"internalType": "uint256","name": "toHash","type": "uint256"  }],"name": "mintHashMapProof","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "uint256","name": "fromHash","type": "uint256"  }],"name": "proofHashMap","outputs": [  {"internalType": "uint256","name": "","type": "uint256"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [],"name": "totalSupply","outputs": [  {"internalType": "uint256","name": "","type": "uint256"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [  {"internalType": "bytes4","name": "interfaceId","type": "bytes4"  }],"name": "supportsInterface","outputs": [  {"internalType": "bool","name": "","type": "bool"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [  {"internalType": "address","name": "owner","type": "address"  }],"name": "balanceOf","outputs": [  {"internalType": "uint256","name": "","type": "uint256"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [  {"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "ownerOf","outputs": [  {"internalType": "address","name": "","type": "address"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [],"name": "name","outputs": [  {"internalType": "string","name": "","type": "string"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [],"name": "symbol","outputs": [  {"internalType": "string","name": "","type": "string"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [  {"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "tokenURI","outputs": [  {"internalType": "string","name": "","type": "string"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [  {"internalType": "address","name": "to","type": "address"  },  {"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "getApproved","outputs": [  {"internalType": "address","name": "","type": "address"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [  {"internalType": "address","name": "operator","type": "address"  },  {"internalType": "bool","name": "approved","type": "bool"  }],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "address","name": "owner","type": "address"  },  {"internalType": "address","name": "operator","type": "address"  }],"name": "isApprovedForAll","outputs": [  {"internalType": "bool","name": "","type": "bool"  }],"stateMutability": "view","type": "function","constant": true    },    {"inputs": [  {"internalType": "address","name": "from","type": "address"  },  {"internalType": "address","name": "to","type": "address"  },  {"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "address","name": "from","type": "address"  },  {"internalType": "address","name": "to","type": "address"  },  {"internalType": "uint256","name": "tokenId","type": "uint256"  }],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"    },    {"inputs": [  {"internalType": "address","name": "from","type": "address"  },  {"internalType": "address","name": "to","type": "address"  },  {"internalType": "uint256","name": "tokenId","type": "uint256"  },  {"internalType": "bytes","name": "_data","type": "bytes"  }],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"    }  ];//#end <- end of auto-replacement for migration
  web3addr = 'http://127.0.0.1:9545'; 
  contract_address = '0xF9C5D0962498bf2441Def8B192d017a986F950f1';
  
  @tracked connected = false;
  @tracked installed = false;
  @tracked isSaleActive = false;


  
  accountName = '';

  get isConnected()
  {
    return (this.acc || null)  != null
  }

  async disconnect()
  {
    this.acc = null;
  }

  async connect() {


    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          console.log(`Using account ${accounts[0]}`);
          this.acc = accounts[0];
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

      this.acc = await window.ethereum.request({ method: 'eth_requestAccounts' })[0];
      if (this.acc == null) {
        this.acc = await window.ethereum.selectedAddress;
      }
      console.log('connected');
      window.web3 = new Web3(window.ethereum);
      
      if(this.isConnected)
      {
        this.accountName = this.acc.substring(0, 4) + '...' + this.acc.substring(this.acc.length - 4);
      
      }
      
    } else {
      console.error("Install MetaMask.");
    }

  }

  
//if this is async, and awaited on the calling side, ember build fails with "applypatches"
hashFile(bindata)
{
  let lweb3 = new Web3(this.web3addr);
  return lweb3.utils.toBN(lweb3.utils.soliditySha3(bindata));
}



  async proofHashMap(hashToProof) {
    if (window.ethereum) {
      console.log('HashToProof:' + hashToProof);
      let lweb3 = new Web3(this.web3addr);

      let contract = new lweb3.eth.Contract(this.abi, this.contract_address);
      
      let estimatedGasSpending = lweb3.utils.numberToHex(await contract.methods.proofHashMap(hashToProof).estimateGas());
      console.log('estimatedGasSpending: ' + estimatedGasSpending);
   
      return await contract.methods.proofHashMap(hashToProof).call({ from: this.acc });
    } else {
      window.alert("not connected");
    }
  }

}
