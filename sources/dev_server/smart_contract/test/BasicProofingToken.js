const tokenContract = artifacts.require("BasicProofingToken");
const truffleAssertions = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');
let _tokens = [];  
//truffle test
contract('BasicProofingToken: full integration', async (accounts) => {
    const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;
   
   // const web3 = new Web3('http://ganache:8545');
    const web3 = new Web3('http://127.0.0.1:9545'); //truffledevelop
    
    resultHash = '';
   
    it('disallows unapproved account to mint proof of hash', async () => {
        
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('disallows unapproved account to mint proof of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));

        let token = await tokenContract.deployed();        
        
        await truffleAssertions.reverts(token.mintHashMapProof(fromHash,toHash,{from:accounts[1]}), 'Caller has to be an assigned/allowed service.');
        
    });

    it('allows creator to mint proof of hash', async () => {
            
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows creator to mint proof of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));
    
        let token = await tokenContract.deployed();        
        
        await truffleAssertions.passes(token.mintHashMapProof(fromHash,toHash,{from:accounts[0]}), 'mintHashMapProof failed');
        
        let tokenId = null;
        await token.contract.getPastEvents('MintedHashMapProof', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ 
            //console.log(events); 
        })
        .then(function(events){
            let event = events[events.length - 1];
            //console.log('TokenId! ' + event.returnValues.tokenId); 
            tokenId = event.returnValues.tokenId;
        });
        
        
        assert.isTrue(tokenId.length > 0, 'the token id has not been retrieved');
    });

    
    it('disallows creator to mint proof of hash for existing hash', async () => {
            
        const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows creator to mint proof of hash'));
        const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));
        
            let token = await tokenContract.deployed();        
            
            await truffleAssertions.reverts(token.mintHashMapProof(fromHash,toHash,{from:accounts[0]}), 'You cannot overwrite existing proof!');
            
        });

    
        it('disallows creator to mint proof of hash for NULL hash', async () => {
            
            const fromHash = 0;
            const toHash = 0;
            
                let token = await tokenContract.deployed();        
                
                await truffleAssertions.reverts(token.mintHashMapProof(fromHash,toHash,{from:accounts[0]}), 'You cannot proof NULL (0) values!');
                
            });

    it('allows creator to assign service to allow minting', async () => {
        
        let token = await tokenContract.deployed();        
        
        await truffleAssertions.passes(token.assignAllowedService(accounts[1],{from:accounts[0]}), 'assigning account 1 as a service failed for contract owner');
        
        let addressToAllow = null;
        await token.contract.getPastEvents('AssignedAllowedServiceEvent', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ 
            //console.log(events); 
        })
        .then(function(events){
            let event = events[events.length - 1];
            //console.log('TokenId! ' + event.returnValues.tokenId); 
            addressToAllow = event.returnValues.addressToAllow;
        });


        
        
        assert.isTrue(addressToAllow == accounts[1].toString(), 'the event result did not match expected allowed address (acc1)');
    });

    
    it('allows service to mint proof of hash', async () => {
        
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows service to mint proof of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));

        let token = await tokenContract.deployed();        
        
        await truffleAssertions.passes(token.mintHashMapProof(fromHash,toHash,{from:accounts[1]}), 'mintHashMapProof failed for service that has allowance');
        
        let tokenId = null;
        await token.contract.getPastEvents('MintedHashMapProof', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ 
            //console.log(events); 
        })
        .then(function(events){
            let event = events[events.length - 1];
            //console.log('TokenId! ' + event.returnValues.tokenId); 
            tokenId = event.returnValues.tokenId;
        });
        
        
        assert.isTrue(tokenId.length > 0, 'the token id has not been retrieved');
    });

    
    it('allows creator to unassign service', async () => {
        
        let token = await tokenContract.deployed();        
        
        await truffleAssertions.passes(token.unassignAllowedService(accounts[1],{from:accounts[0]}), 'assigning account 1 as a service failed for contract owner');
        
        let addressToUnassign = null;
        await token.contract.getPastEvents('UnassignedAllowedServiceEvent', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ 
            //console.log(events); 
        })
        .then(function(events){
            let event = events[events.length - 1];
            //console.log('TokenId! ' + event.returnValues.tokenId); 
            addressToUnassign = event.returnValues.addressToUnassign;
        });


        
        
        assert.isTrue(addressToUnassign == accounts[1].toString(), 'the event result did not match expected unassigned address (acc1)');
    });

       
    it('disallows service that has been unassigned to mint proof of hash', async () => {
        
        const fromHash = web3.utils.toBN(web3.utils.soliditySha3('disallows service that has been unassigned to mint proof of hash'));
        const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));
    
            let token = await tokenContract.deployed();        
            
            await truffleAssertions.reverts(token.mintHashMapProof(fromHash,toHash,{from:accounts[1]}), 'Caller has to be an assigned/allowed service.');
            
        });
    
    it('allows anyone to check proof', async () => {
        let token = await tokenContract.deployed();       
       
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows service to mint proof of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));

    let resultHash = await token.proofHashMap(fromHash,{from: accounts[2]});
    
    assert.isTrue(resultHash.toString() == toHash.toString(), 'did not retrieve the hash that was expected');
    });

    
    it('disallows anyone to check for non-existing proof', async () => {
        let token = await tokenContract.deployed();       
       
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('disallows anyone to check for non-existing proof'));
    await truffleAssertions.reverts(token.proofHashMap(fromHash,{from: accounts[2]}), 'The proof you are requesting does not exist!');
      
    });

    
    

});