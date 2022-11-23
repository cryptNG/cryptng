const tokenContract = artifacts.require("BasicEvidencingToken");
const truffleAssertions = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');
const BN = require('bn.js');
let _tokens = [];  
//truffle test
contract('BasicEvidencingToken: full integration', async (accounts) => {
    const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;
   
   // const web3 = new Web3('http://ganache:8545');
    const web3 = new Web3('http://127.0.0.1:9545'); //truffledevelop
    
    resultHash = '';
   
    it('disallows unapproved account to mint evidence of hash', async () => {
        
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('disallows unapproved account to mint evidence of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));

        let token = await tokenContract.deployed();        
        
        await truffleAssertions.reverts(token.mintHashMapEvidence(fromHash,toHash,{from:accounts[1]}), 'Caller has to be an assigned/allowed service.');
        
    });

    it('allows creator to mint evidence of hash', async () => {
            
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows creator to mint evidence of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));
    
        let token = await tokenContract.deployed();        
        
        await truffleAssertions.passes(token.mintHashMapEvidence(fromHash,toHash,{from:accounts[0]}), 'mintHashMapEvidence failed');
        
        let tokenId = null;
        await token.contract.getPastEvents('MintedHashMapEvidence', {
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

    
    
    it('disallows creator to mint evidence of hash for existing hash', async () => {
            
        const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows creator to mint evidence of hash'));
        const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));
        
            let token = await tokenContract.deployed();        
            
            await truffleAssertions.reverts(token.mintHashMapEvidence(fromHash,toHash,{from:accounts[0]}), 'You cannot overwrite existing evidence!');
            
        });

    
        it('disallows creator to mint evidence of hash for NULL hash', async () => {
            
            const fromHash = 0;
            const toHash = 0;
            
                let token = await tokenContract.deployed();        
                
                await truffleAssertions.reverts(token.mintHashMapEvidence(fromHash,toHash,{from:accounts[0]}), 'You cannot evidence NULL (0) values!');
                
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

    
    it('allows service to mint evidence of hash', async () => {
        
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows service to mint evidence of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));

        let token = await tokenContract.deployed();        
        
        await truffleAssertions.passes(token.mintHashMapEvidence(fromHash,toHash,{from:accounts[1]}), 'mintHashMapEvidence failed for service that has allowance');
        
        let tokenId = null;
        await token.contract.getPastEvents('MintedHashMapEvidence', {
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

    
    it('allows user to mint self-evidence of hash', async () => {
        
        
        const evidenceHash = web3.utils.toBN(web3.utils.soliditySha3('this sentence existed at this point in time'));
    
            let token = await tokenContract.deployed();        
            let value = web3.utils.toWei('0.001', 'ether');
            await truffleAssertions.passes(token.mintSelfEvidence(evidenceHash,{from:accounts[1], value: value}), 'mintSelfEvidence fails with set price');
            
            let mTokenId;
        
            await token.contract.getPastEvents('Transfer', {
                fromBlock: 0,
                toBlock: 'latest'
            }, function(error, events){ 
                //console.log(events); 
            })
            .then(function(events){
                let event = events[events.length - 1];
                //console.log('TokenId! ' + event.returnValues.tokenId); 
                mTokenId = event.returnValues.tokenId;
            });

            //console.log('TokenID: ' + mTokenId);
            assert.isTrue(mTokenId >= 2 * 1000000000000000000000000000000000000000000000000000000000000000000000000, 'the token id is not valid');
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

       
    it('disallows service that has been unassigned to mint evidence of hash', async () => {
        
        const fromHash = web3.utils.toBN(web3.utils.soliditySha3('disallows service that has been unassigned to mint evidence of hash'));
        const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));
    
            let token = await tokenContract.deployed();        
            
            await truffleAssertions.reverts(token.mintHashMapEvidence(fromHash,toHash,{from:accounts[1]}), 'Caller has to be an assigned/allowed service.');
            
        });
    
    it('allows anyone to check evidence', async () => {
        let token = await tokenContract.deployed();       
       
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('allows service to mint evidence of hash'));
    const toHash = web3.utils.toBN(web3.utils.soliditySha3('anyHash'));

    let resultHash = await token.verifyEvidenceHashMap(fromHash,{from: accounts[2]});
    
    assert.isTrue(resultHash.toString() == toHash.toString(), 'did not retrieve the hash that was expected');
    });

    
    it('disallows anyone to check for non-existing evidence', async () => {
        let token = await tokenContract.deployed();       
       
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('disallows anyone to check for non-existing evidence'));
    await truffleAssertions.reverts(token.verifyEvidenceHashMap(fromHash,{from: accounts[2]}), 'The evidence you are requesting does not exist!');
      
    });

    it('allows anyone to verify self-evidence', async () => {
        let token = await tokenContract.deployed();       
        const evidenceHash = web3.utils.toBN(web3.utils.soliditySha3('this sentence existed at this point in time'));
    
    let resultObject = await token.verifySelfEvidence(evidenceHash,{from: accounts[2]});
    let retrievedEvidenceHash = resultObject[0];
    let retrievedEvidenceTime = resultObject[1];
    let retrievedEvidenceTokenId = resultObject[2];
    // console.log('evidenceHash:' + evidenceHash);
    // console.log('retrievedEvidenceHash:' + retrievedEvidenceHash);
    // console.log('retrievedEvidenceTime:' + retrievedEvidenceTime);
    // console.log('retrievedEvidenceTokenId:' + retrievedEvidenceTokenId);
    assert.isTrue(retrievedEvidenceHash.toString() == evidenceHash.toString(), 'the hash retrieved from verification does not match the hash that was generated');
    
    });

    
    it('disallows anyone to check for non-existing evidence', async () => {
        let token = await tokenContract.deployed();       
       
    const fromHash = web3.utils.toBN(web3.utils.soliditySha3('disallows anyone to check for non-existing evidence'));
    await truffleAssertions.reverts(token.verifyEvidenceHashMap(fromHash,{from: accounts[2]}), 'The evidence you are requesting does not exist!');
      
    });

    
    it('disallows anybody but owner to disable minting', async () => {
        let token = await tokenContract.deployed();       
       
        await truffleAssertions.reverts(token.setIsSelfEvidencingInactive({from: accounts[1]}),"Ownable: caller is not the owner");
   
    });
    
    it('allows owner to disable minting', async () => {
        let token = await tokenContract.deployed();       
       
        await truffleAssertions.passes(token.setIsSelfEvidencingInactive({from: accounts[0]}));
   
    });

     
    it('disallows minting for everyone after it has been disabled by owner', async () => {
        
        
        const evidenceHash = web3.utils.toBN(web3.utils.soliditySha3('this sentence existed at this point in time'));
    
        let token = await tokenContract.deployed();        
        let value = web3.utils.toWei('0.001', 'ether');
        await truffleAssertions.reverts(token.mintSelfEvidence(evidenceHash,{from:accounts[1], value: value}), "Sale is currently not active");
            
    });

    
    it('allows anyone to verify self-evidence although minting has been disabled', async () => {
        let token = await tokenContract.deployed();       
        const evidenceHash = web3.utils.toBN(web3.utils.soliditySha3('this sentence existed at this point in time'));
    
    let resultObject = await token.verifySelfEvidence(evidenceHash,{from: accounts[2]});
    let retrievedEvidenceHash = resultObject[0];
    let retrievedEvidenceTime = resultObject[1];
    let retrievedEvidenceTokenId = resultObject[2];
    // console.log('evidenceHash:' + evidenceHash);
    // console.log('retrievedEvidenceHash:' + retrievedEvidenceHash);
    // console.log('retrievedEvidenceTime:' + retrievedEvidenceTime);
    // console.log('retrievedEvidenceTokenId:' + retrievedEvidenceTokenId);
    assert.isTrue(retrievedEvidenceHash.toString() == evidenceHash.toString(), 'the hash retrieved from verification does not match the hash that was generated');
    
    });

    
    it('disallows anybody but owner to enable minting', async () => {
        let token = await tokenContract.deployed();       
       
        await truffleAssertions.reverts(token.setIsSelfEvidencingActive({from: accounts[1]}),"Ownable: caller is not the owner");
   
    });
    
    it('allows owner to enable minting', async () => {
        let token = await tokenContract.deployed();       
       
        await truffleAssertions.passes(token.setIsSelfEvidencingActive({from: accounts[0]}));
   
    });
    
   
    it('allows user to mint self-evidence of hash after minting has been re-enabled', async () => {
        
        
        const evidenceHash = web3.utils.toBN(web3.utils.soliditySha3('this is the second sentence, it existed at this point in time'));
    
            let token = await tokenContract.deployed();        
            let value = web3.utils.toWei('0.001', 'ether');
            await truffleAssertions.passes(token.mintSelfEvidence(evidenceHash,{from:accounts[1], value: value}), 'mintSelfEvidence fails with set price');
            
            let mTokenId;
        
            await token.contract.getPastEvents('Transfer', {
                fromBlock: 0,
                toBlock: 'latest'
            }, function(error, events){ 
                //console.log(events); 
            })
            .then(function(events){
                let event = events[events.length - 1];
                //console.log('TokenId! ' + event.returnValues.tokenId); 
                mTokenId = event.returnValues.tokenId;
            });

            // console.log('TokenID: ' + mTokenId);
            assert.isTrue(mTokenId >= 2 * 1000000000000000000000000000000000000000000000000000000000000000000000000, 'the token id is not valid');
        });

    
    it('allows anyone to verify self-evidence although minting has been disabled', async () => {
        let token = await tokenContract.deployed();       
        const evidenceHash = web3.utils.toBN(web3.utils.soliditySha3('this is the second sentence, it existed at this point in time'));
    
    let resultObject = await token.verifySelfEvidence(evidenceHash,{from: accounts[2]});
    let retrievedEvidenceHash = resultObject[0];
    let retrievedEvidenceTime = resultObject[1];
    let retrievedEvidenceTokenId = resultObject[2];
    // console.log('evidenceHash:' + evidenceHash);
    // console.log('retrievedEvidenceHash:' + retrievedEvidenceHash);
    // console.log('retrievedEvidenceTime:' + retrievedEvidenceTime);
    // console.log('retrievedEvidenceTokenId:' + retrievedEvidenceTokenId);
    assert.isTrue(retrievedEvidenceHash.toString() == evidenceHash.toString(), 'the hash retrieved from verification does not match the hash that was generated');
    
    });
    

    it('allows service to mint batchevidence', async () => {
        
        let evidences = [];

        evidences[0] = web3.utils.toBN(web3.utils.soliditySha3('evidence #1'));
        evidences[1] = web3.utils.toBN(web3.utils.soliditySha3('evidence #2'));
        evidences[2] = web3.utils.toBN(web3.utils.soliditySha3('evidence #3'));
       let uMod = web3.utils.toBN(1000);
            let token = await tokenContract.deployed();        
            let value = web3.utils.toWei('0.001', 'ether');
            await truffleAssertions.passes(token.mintBatchHashEvidence(evidences,{from:accounts[0]}), 'mintBatchHashEvidence fails with set price');
            
            let eventresults = [];
            await token.contract.getPastEvents('MintedBatchHashEvidence', {
                filter: {bucket:evidences[0].umod(uMod)},
                fromBlock: 0,
                toBlock: 'latest'
            }, function(error, events){

            })
            .then(function(events){
                events.forEach((ev)=>{
                    eventresults.push(ev.returnValues.hashdata);})
            });

            await token.contract.getPastEvents('MintedBatchHashEvidence', {
                filter: {bucket:(evidences[1].umod(uMod))},
                fromBlock: 0,
                toBlock: 'latest'
            }, function(error, events){

            })
            .then(function(events){
                events.forEach((ev)=>{
                    eventresults.push(ev.returnValues.hashdata);})
            });

            await token.contract.getPastEvents('MintedBatchHashEvidence', {
                filter: {bucket:(evidences[2].umod(uMod))},
                fromBlock: 0,
                toBlock: 'latest'
            }, function(error, events){

            })
            .then(function(events){
                events.forEach((ev)=>{
                    eventresults.push(ev.returnValues.hashdata);})
            });

          
            assert.isTrue(eventresults.some((el)=> el == evidences[0].toString()));
            assert.isTrue(eventresults.some((el)=> el == evidences[1].toString()));
            assert.isTrue(eventresults.some((el)=> el == evidences[2].toString()));
           
        });
});