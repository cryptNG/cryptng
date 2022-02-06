const tokenContract = artifacts.require("cryptngTesttoken");
const truffleAssertions = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');
    

contract('cryptngTesttoken: test balance', async (accounts) => {
    const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;
    
    const web3 = new Web3('http://localhost:9545');
    
    it('cannot mint with 0 ETH', async () => {
        let token = await tokenContract.deployed();       
        let startingBalanceEth = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether'); 
        //when this assertion fails, no gas is burned since the required gas amount is calculated
        //without burning gas 
        await truffleAssertions.reverts(token.mint(accounts[1],{from: accounts[1]}), 'Amount of ether sent not correct.');
        let balanceWei = await web3.eth.getBalance(accounts[1]);
        let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        assert.isTrue(((startingBalanceEth - balanceEth) > 0) && ((startingBalanceEth - balanceEth) < 0.001),`gas burn over 0 and less than 0.001 expected, got: ${(balanceEth - startingBalanceEth)} ETH`);
    });

    it('can mint with 0.001ETH', async () => {
        let token = await tokenContract.deployed();        
        let startingBalanceEth = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether'); 
        
        let value = web3.utils.toWei('0.001', 'ether');
        await truffleAssertions.passes(token.mint(accounts[1],{from:accounts[1], value: value}), 'mint fails with set price');
        let balanceWei = await web3.eth.getBalance(accounts[1]);
        let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        assert.isTrue(balanceEth<startingBalanceEth,`account still has ${balanceEth} ETH`);
        assert.isTrue(balanceEth>(startingBalanceEth-0.005),`account should have more than ${(startingBalanceEth-0.005)} ETH but has ${balanceEth} ETH`);
        
        let tokenBalance = await token.balanceOf(accounts[1]);
        assert.isTrue(tokenBalance==1,`token balance incorrent`);
    
    });

    
    it('can request ticket after mint', async () => {
        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        await truffleAssertions.passes(token.requestExecutionTicket(secret,{from:accounts[1]}), 'requesting ticket failed');
        let balanceWei = await web3.eth.getBalance(accounts[1]);
        let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        assert.isTrue(balanceEth<startingBalanceEth,`account still has ${balanceEth} ETH`);
        assert.isTrue(balanceEth>(startingBalanceEth-0.005),`account should have more than ${(startingBalanceEth-0.005)} ETH but has ${balanceEth} ETH`);
    });

});