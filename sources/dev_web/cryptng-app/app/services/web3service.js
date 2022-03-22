import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Web3service extends Service.extend({
  // anything which *must* be merged to prototype here
}) {


 

    


  // normal class body definition here
  acc = null;
  abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"ticketId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"CreatedExecutionTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"ticketId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ExecutionTicketBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getTokens","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTicketId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"getTicketSecret","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"addressToAllow","type":"address"}],"name":"assignAllowedService","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToDisallow","type":"address"}],"name":"unassignAllowedService","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"serviceBurnExecutionTickets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"serviceSecret","type":"uint256"}],"name":"createExecutionTicket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"burnExecutionTicket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"setIsSaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setIsSaleInactive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPriceGwei","type":"uint256"}],"name":"adaptMarketPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true}];//#end <- end of auto-replacement for migration
  web3addr = 'http://192.168.0.7:8545'; 
  contract_address = '0x476059cD57800DB8eB88f67c2Aa38A6fCf8251e0';
  player1_address = '0xa508dd875f10c33c52a8abb20e16fc68e981f186';
  player8_address = '0x8d242e4bc081e2eeD5eb9d6BF734DdF5d2F435e0';
  
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

  async getIsSaleActive()
  {
    let lweb3 = new Web3(web3addr);
    // let lweb3 = new Web3('http://127.0.0.1:9545');

    let contract = new lweb3.eth.Contract(this.abi, this.contract_address);

    let res = await contract.methods.getIsSaleActive().call({ from: this.acc });
    this.isSaleActive = res;
  }

  
  async migrate() {

    if (window.ethereum) {

      let lweb3 = new Web3(this.web3addr);

      console.log('ACC:' + acc);



      let lastBlockDec = await lweb3.eth.getBlockNumber();



      while (lastBlockDec > 0) {
        lastBlockDec--;
        const block = await lweb3.eth.getBlock(lastBlockDec, false);

        const txHash = block.transactions[0];
        const receipt = await lweb3.eth.getTransactionReceipt(txHash);
        if (receipt.contractAddress) {
          this.contract_address = receipt.contractAddress;
          return;
        }
      }



    } else {
      this.connect();
      this.migrate();
    }



  }

  async getcontractbalance() {
    let lweb3 = new Web3(web3addr);
    // let lweb3 = new Web3('http://127.0.0.1:9545');

    let contract = new lweb3.eth.Contract(this.abi, this.contract_address);

    let res = await contract.methods.balanceOf(this.player8_address).call({ from: this.player8_address });
    console.log(res);
  }

  async mint() {
    if (window.ethereum) {
      console.log('ACC:' + acc);

      let contract = new window.web3.eth.Contract(this.abi, this.contract_address);
      
      let value = window.web3.utils.toWei('0.001', 'ether');
      console.log('contract:' + contract);
      let currentGasPrice = window.web3.utils.numberToHex(await window.web3.eth.getGasPrice());
      console.log('currentGasPrice: ' + currentGasPrice);
      let estimatedGasSpending = window.web3.utils.numberToHex(await contract.methods.mint(acc).estimateGas({ from: acc, value: value }));
      console.log('estimatedGasSpending: ' + estimatedGasSpending);
      console.log(value);
      contract.methods.mint(acc).send({ from: acc, to: this.contract_address, value: value })
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
      this.mint();
    }
  }

  async sendmoney() {

    if (window.ethereum) {
      console.log('ACC:' + acc);
      let data = '0x7f7465737432000000000000000000000000000000000000000000000000000000600057';
      let currentGasPrice = web3.utils.numberToHex(await window.web3.eth.getGasPrice());
      let estimatedGasSpending = window.web3.utils.numberToHex(await window.web3.eth.estimateGas({ to: this.player1_address, data: data }));
      console.log('currentGasPrice: ' + currentGasPrice);
      console.log('estimatedGasSpending: ' + estimatedGasSpending);
      let amount = window.web3.utils.numberToHex(window.web3.utils.toWei('1', 'ether'));
      const nonce = await web3.eth.getTransactionCount(acc, 'latest');

      const transactionParameters = {
        nonce: nonce + '', // ignored by MetaMask
        gasPrice: currentGasPrice, // customizable by user during MetaMask confirmation.
        gas: estimatedGasSpending,//'0x5208', //gas limit must be 21000. // customizable by user during MetaMask confirmation, is the gas
        to: this.player1_address, // Required except during contract publications.
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
}
