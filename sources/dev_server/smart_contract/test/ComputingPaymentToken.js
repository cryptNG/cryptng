const tokenContract = artifacts.require("ComputingPaymentToken");
const truffleAssertions = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');
let _tokens = [];  
//truffle test
contract('ComputingPaymentToken: full integration', async (accounts) => {
    const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;
   
   // const web3 = new Web3('http://ganache:8545');
    const web3 = new Web3('http://127.0.0.1:9545'); //truffledevelop
    

    it('cannot mint type 0 with 0.001 ETH', async () => {
        let token = await tokenContract.deployed();       
        let startingBalanceEth = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether'); 
       
        
       
        let value = web3.utils.toWei('0.001', 'ether');
       
        await truffleAssertions.reverts(token.mint(0,accounts[1],{from: accounts[1], value: value}), 'Invalid token type');
        let balanceWei = await web3.eth.getBalance(accounts[1]);
        let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        assert.isTrue(((startingBalanceEth - balanceEth) > 0) && ((startingBalanceEth - balanceEth) < 0.001),`gas burn over 0 and less than 0.001 expected, got: ${(balanceEth - startingBalanceEth)} ETH`);
    });

    it('cannot mint type 1 with 0 ETH', async () => {
        let token = await tokenContract.deployed();       
        let startingBalanceEth = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether'); 
        //when this assertion fails, no gas is burned since the required gas amount is calculated
        //without burning gas 
        await truffleAssertions.reverts(token.mint(1,accounts[1],{from: accounts[1]}), 'Amount of ether sent not correct.');
        let balanceWei = await web3.eth.getBalance(accounts[1]);
        let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        assert.isTrue(((startingBalanceEth - balanceEth) > 0) && ((startingBalanceEth - balanceEth) < 0.001),`gas burn over 0 and less than 0.001 expected, got: ${(balanceEth - startingBalanceEth)} ETH`);
    });

    it('can mint type 1 with 0.001ETH', async () => {
        let token = await tokenContract.deployed();        
        let startingBalanceEth = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether'); 
        
        //need to use ws//GANACHEURL to get this to work, or use pastEvents like below
        // token.contract.events.Transfer()
        // .on('data', event => {console.log('DATA-EVENT! ' + event); this.tokens.push(event.returnValues.tokenId)})
        // .on('changed', changed => console.log('CHANGED-EVENT! ' + changed))
        // .on('error', err => {throw err})
        // .on('connected', str => console.log('CONNECTED-EVENT! ' + str));

        let value = web3.utils.toWei('0.001', 'ether');
        await truffleAssertions.passes(token.mint(1,accounts[1],{from:accounts[1], value: value}), 'mint fails with set price');
        
        
        await token.contract.getPastEvents('Transfer', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ 
            //console.log(events); 
        })
        .then(function(events){
            let event = events[events.length - 1];
            //console.log('TokenId! ' + event.returnValues.tokenId); 
            _tokens.push(event.returnValues.tokenId);
        });
        
        assert.isTrue(_tokens.length == 1, 'the token id has not been retrieved');
        assert.isTrue(_tokens[0]>100000000000-1, 'the token id is invalid ' + _tokens[0]);
        
        let balanceWei = await web3.eth.getBalance(accounts[1]);
        let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        assert.isTrue(balanceEth<startingBalanceEth,`account still has ${balanceEth} ETH`);
        assert.isTrue(balanceEth>(startingBalanceEth-0.005),`account should have more than ${(startingBalanceEth-0.005)} ETH but has ${balanceEth} ETH`);
        
        let tokenBalance = await token.balanceOf(accounts[1]);

        assert.isTrue(tokenBalance==1,`token balance incorrent, expected 1, found ${tokenBalance}`);
    
    });

    
    it('can mint type 2 with 0.001ETH', async () => {
        let token = await tokenContract.deployed();        
        let startingBalanceEth = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether'); 
        
        let value = web3.utils.toWei('0.001', 'ether');
        await truffleAssertions.passes(token.mint(2,accounts[1],{from:accounts[1], value: value}), 'mint fails with set price');
        
        await token.contract.getPastEvents('Transfer', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){  })
        .then(function(events){
            let event = events[events.length - 1];
           // console.log('DATA-EVENT! ' +event.returnValues.tokenId); 
            _tokens.push(event.returnValues.tokenId);
        });

        assert.isTrue(_tokens.length == 2, 'the token id has not been retrieved')
        
        let balanceWei = await web3.eth.getBalance(accounts[1]);
        let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        assert.isTrue(balanceEth<startingBalanceEth,`account still has ${balanceEth} ETH`);
        assert.isTrue(balanceEth>(startingBalanceEth-0.005),`account should have more than ${(startingBalanceEth-0.005)} ETH but has ${balanceEth} ETH`);
        
        let tokenBalance = await token.balanceOf(accounts[1]);
        assert.isTrue(tokenBalance==2,`token balance incorrent, expected 1, found ${tokenBalance}`);
    
    });

    
    it('can request ticket for type 1 after mint', async () => {
        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        await truffleAssertions.passes(token.createExecutionTicket(_tokens[0],secret,{from:accounts[1]}), 'requesting ticket failed');
      
    });

    it('can request ticket for type 2 after mint', async () => {
        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        await truffleAssertions.passes(token.createExecutionTicket(_tokens[1],secret,{from:accounts[1]}), 'requesting ticket failed');
      
    });

    

    it('can request ticket secret for type 1', async () => {
        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2,"Token length was not 2, instead was " + tokens.length);
        let totalSupply = await token.totalSupply();


        let ticketId = await token.getTicketId(_tokens[0]);
        let ticketSecret = await token.getTicketSecret(ticketId);
        
        assert.isTrue(ticketSecret == secret);       
        
    });

    it('can request ticket secret for type 2', async () => {
        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2,"Token length was not 2, instead was " + tokens.length);
        let totalSupply = await token.totalSupply();


        let ticketId = await token.getTicketId(_tokens[1]);
        let ticketSecret = await token.getTicketSecret(ticketId);
        
        assert.isTrue(ticketSecret == secret);       
        
    });

    it('cannot get non-existant executionticket for existing token type 1', async () => {
        //because the tokan has not requested an executionticket yet

        let token = await tokenContract.deployed();        
         
        let secret = 256;
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2);
        let totalSupply = await token.totalSupply();

        //totalSuppy is always +1 on the maximum ticket/token id, which cannot exist
        await truffleAssertions.reverts(token.getTicketId(totalSupply), 'Token does not exist'); 

        let ticketId = await token.getTicketId(_tokens[0]);
        let ticketSecret = await token.getTicketSecret(ticketId);
        
        assert.isTrue(ticketSecret == secret);       
        
    });

    
    it('cannot get non-existant executionticket for existing token type 2', async () => {
        //because the tokan has not requested an executionticket yet

        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2);
        let totalSupply = await token.totalSupply();

        //totalSuppy is always +1 on the maximum ticket/token id, which cannot exist
        await truffleAssertions.reverts(token.getTicketId(totalSupply), 'Token does not exist'); 

        let ticketId = await token.getTicketId(_tokens[1]);
        let ticketSecret = await token.getTicketSecret(ticketId);
        
        assert.isTrue(ticketSecret == secret);       
        
    });

    

    it('cannot burn executionticket type 1 when not ticket holder', async () => {
        let token = await tokenContract.deployed();        

        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2,"expected length 2, was " + tokens.length);
        
      //  let ticketId = await token.getTicketId(_tokens[0]);

        
        await truffleAssertions.reverts(token.burnExecutionTicket(_tokens[0],{from:accounts[0]}), "You are not the token owner"); 
        
    });

    
    it('cannot burn executionticket type 2 when not ticket holder', async () => {
        let token = await tokenContract.deployed();        

        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2);
        
       // let ticketId = await token.getTicketId(_tokens[1]);

        
        await truffleAssertions.reverts(token.burnExecutionTicket(_tokens[1],{from:accounts[0]}), "You are not the token owner"); 
        
    });

    it('can burn executionticket for existing token type 1', async () => {
        let token = await tokenContract.deployed();        
        
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2);
        
        let ticketId = await token.getTicketId(_tokens[0]);

        
        await truffleAssertions.passes(token.burnExecutionTicket(ticketId,{from:accounts[1]}), 'ticket holder, but cannot burn ticket'); 
                
    });

    
    it('can burn executionticket for existing token type 2', async () => {
        let token = await tokenContract.deployed();        
        
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 2);
        
        let ticketId = await token.getTicketId(_tokens[1]);

        
        await truffleAssertions.passes(token.burnExecutionTicket(ticketId,{from:accounts[1]}), 'ticket holder, but cannot burn ticket'); 
                
    });



    it('cannot burn non-existant executionticket for existing token type 1', async () => {
        let token = await tokenContract.deployed();        
        
        let secret = 256;

        let tokensBefore = await token.getTokens(accounts[1]);
        let mintedToken = await mintForAccount(1,accounts[1]);
        
        
        let tokensLater = await token.getTokens(accounts[1]);
        assert.isTrue(tokensLater.length > tokensBefore.length);
        

        
        await truffleAssertions.reverts(token.burnExecutionTicket(mintedToken,{from:accounts[1]}), "The ticket does not exist"); 
        
    });

    
    it('cannot burn non-existant executionticket for existing token type 2', async () => {
        let token = await tokenContract.deployed();        
        
        let secret = 256;

        let tokensBefore = await token.getTokens(accounts[1]);
        let mintedToken = await mintForAccount(2,accounts[1]);
        
        
        let tokensLater = await token.getTokens(accounts[1]);
        assert.isTrue(tokensLater.length > tokensBefore.length);
        
        
        
        await truffleAssertions.reverts(token.burnExecutionTicket(mintedToken,{from:accounts[1]}), "The ticket does not exist"); 
        
    });

    //TBD: do we make allowances per type? e.g. someone can burn tokens of type 1 but not 2 if servicewallet
    it('disallows non-approved service wallets from burning executiontokens (type1)', async () => {
        let token = await tokenContract.deployed();        
        let someCustomer = accounts[2]; //not assigned
        let secret = 256;
        
        let tokensBefore = await token.getTokens(someCustomer);
        
        let mintedToken = await mintForAccount(1,someCustomer);
        
        
        let tokensLater = await token.getTokens(someCustomer);
        assert.isTrue(tokensLater.length > tokensBefore.length);
        
        await createTicketForAccount(someCustomer, secret, mintedToken); //account X creates the ticket
        
        await truffleAssertions.reverts(token.serviceBurnExecutionTickets(mintedToken,{from:someCustomer}), "Caller has to be an assigned/allowed service."); 
        
    });

    it('disallows non-approved service wallets from burning executiontokens (type2)', async () => {
        let token = await tokenContract.deployed();        
        let someCustomer = accounts[2]; //not assigned
        let secret = 256;
        
        let tokensBefore = await token.getTokens(someCustomer);
        
        let mintedToken = await mintForAccount(2,someCustomer);
        
        
        let tokensLater = await token.getTokens(someCustomer);
        assert.isTrue(tokensLater.length > tokensBefore.length);
        
        await createTicketForAccount(someCustomer, secret, mintedToken); //account X creates the ticket
        
        await truffleAssertions.reverts(token.serviceBurnExecutionTickets(mintedToken,{from:someCustomer}), "Caller has to be an assigned/allowed service."); 
        
    });

    it('allows contract owner to assign service wallets (for burn interaction)', async () => {
        let token = await tokenContract.deployed(); 
        let contractOwner = accounts[0];   
        let someService = accounts[3]; 
        
        
        //assign the service to allow it to burn
        await truffleAssertions.passes(token.assignAllowedService(someService,{from:contractOwner}), "Contract owner was unable to assign a service to the allowed list of services that can burn tickets.");
        
    });

    it('allows approved service wallets to burn executiontokens type 1', async () => {
        let token = await tokenContract.deployed(); 
        let someCustomer = accounts[2];
        let someService = accounts[3]; 
        let secret = 256;
        
        //mint token for some customer, create a ticket
        
        let tokensBefore = await token.getTokens(someCustomer);
        
        let mintedToken = await mintForAccount(1,someCustomer);
        
        let tokensLater = await token.getTokens(someCustomer);
        assert.isTrue(tokensLater.length > tokensBefore.length);

        await createTicketForAccount(someCustomer, secret, mintedToken); //account X creates the ticket
       
        //service should be able to burn the token now
        await truffleAssertions.passes(token.serviceBurnExecutionTickets(mintedToken,{from:someService}), "Caller has to be an assigned/allowed service.");
        
    });
    
    it('allows approved service wallets to burn executiontokens type 2', async () => {
        let token = await tokenContract.deployed(); 
        let someCustomer = accounts[2];
        let someService = accounts[3]; 
        let secret = 256;
        
        //mint token for some customer, create a ticket
         
        let tokensBefore = await token.getTokens(someCustomer);
        
        let mintedToken = await mintForAccount(2,someCustomer);
        
        let tokensLater = await token.getTokens(someCustomer);
        assert.isTrue(tokensLater.length > tokensBefore.length);


        await createTicketForAccount(someCustomer, secret, mintedToken); //account X creates the ticket
       
        //service should be able to burn the token now
        await truffleAssertions.passes(token.serviceBurnExecutionTickets(mintedToken,{from:someService}), "Caller has to be an assigned/allowed service.");
        
    });

    it('allows contract owner to unassign service wallets (for burn interaction)', async () => {
        let token = await tokenContract.deployed(); 
        let contractOwner = accounts[0];   
        let someService = accounts[3]; 
        
        
        //assign the service to allow it to burn
        await truffleAssertions.passes(token.unassignAllowedService(someService,{from:contractOwner}), "Contract owner was unable to unassign a service to the allowed list of services that can burn tickets.");
        
    });

    it('disallows an unassigned service that had been assigned before from burning tickets type 1', async () => {
        let token = await tokenContract.deployed();        
        let someCustomer = accounts[2]; //not assigned     
        let someService = accounts[3]; //had been assigned and then unassigned in the last executed test
        let secret = 256;

        
        let tokensBefore = await token.getTokens(someCustomer);
        
        let mintedToken = await mintForAccount(1,someCustomer);
        
        let tokensLater = await token.getTokens(someCustomer);
        assert.isTrue(tokensLater.length > tokensBefore.length);

        await createTicketForAccount(someCustomer, secret, mintedToken); //account X creates the ticket
        
       
        
        await truffleAssertions.reverts(token.serviceBurnExecutionTickets(mintedToken,{from:someService}), "Caller has to be an assigned/allowed service."); 
        
    });

    
    it('disallows an unassigned service that had been assigned before from burning tickets type 2', async () => {
        let token = await tokenContract.deployed();        
        let someCustomer = accounts[2]; //not assigned     
        let someService = accounts[3]; //had been assigned and then unassigned in the last executed test
        let secret = 256;

          
        let tokensBefore = await token.getTokens(someCustomer);
        
        let mintedToken = await mintForAccount(2,someCustomer);
        
        let tokensLater = await token.getTokens(someCustomer);
        assert.isTrue(tokensLater.length > tokensBefore.length);


        await createTicketForAccount(someCustomer, secret, mintedToken); //account X creates the ticket
        
       
        
        await truffleAssertions.reverts(token.serviceBurnExecutionTickets(mintedToken,{from:someService}), "Caller has to be an assigned/allowed service."); 
        
    });

    it('disallows contract owner from unassigning himself from the approved services', async () => {
        let token = await tokenContract.deployed(); 
        let contractOwner = accounts[0];   
        
        //assign the service to allow it to burn
        await truffleAssertions.reverts(token.unassignAllowedService(contractOwner,{from:contractOwner}), "You are the contract owner, what are you doing?");
        
    });

    
    it('disallows anyone besides the owner from unassigning services', async () => {
        let token = await tokenContract.deployed(); 
        let someBody = accounts[1];   
        let assignedService = accounts[2];   
        let contractOwner = accounts[0];
        
        //first, we need a service we can try this on
        await truffleAssertions.passes(token.assignAllowedService(assignedService,{from:contractOwner}), "Contract owner was unable to assign a service to the allowed list of services that can burn tickets.");
        
        //assign the service to allow it to burn
        await truffleAssertions.reverts(token.unassignAllowedService(contractOwner,{from:someBody}), "Ownable: caller is not the owner");
        
    });
    
    //utility functions
    async function createTicketForAccount(account, secret, tokenId)
    {
        let token = await tokenContract.deployed();    
    await token.createExecutionTicket(tokenId, secret,{from:account});
    }
    
    async function mintForAccount (type,account)
    {
        let token = await tokenContract.deployed();       
        let value = web3.utils.toWei('0.001', 'ether');
        await token.mint(type,account,{from:account, value: value});

        let tokenId = null;
        await token.contract.getPastEvents('Transfer', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ 
            //console.log(events); 
        })
        .then(function(events){
            let event = events[events.length - 1];
            tokenId = event.returnValues.tokenId;
        });

        return tokenId;
    }

});