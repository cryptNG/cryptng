const tokenContract = artifacts.require("ComputingPaymentToken");
const truffleAssertions = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');
    

contract('ComputingPaymentToken: test balance', async (accounts) => {
    const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;
    
    const web3 = new Web3('http://ganache:8545');
    
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
        
        await truffleAssertions.passes(token.createExecutionTicket(secret,{from:accounts[1]}), 'requesting ticket failed');
        
        
    });

    

    it('can request ticket secret', async () => {
        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 1);
        let totalSupply = await token.totalSupply();

        //totalSuppy is always +1 on the maximum ticket/token id, which cannot exist
        await truffleAssertions.reverts(token.getTicketId(totalSupply), 'Token does not exist'); 

        let ticketId = await token.getTicketId(tokens[0]);
        let ticketSecret = await token.getTicketSecret(ticketId);
        
        assert.isTrue(ticketSecret == secret);       
        
    });

    it('cannot get non-existant executionticket for existing token', async () => {
        //because the tokan has not requested an executionticket yet

        let token = await tokenContract.deployed();        
         
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 1);
        let totalSupply = await token.totalSupply();

        //totalSuppy is always +1 on the maximum ticket/token id, which cannot exist
        await truffleAssertions.reverts(token.getTicketId(totalSupply), 'Token does not exist'); 

        let ticketId = await token.getTicketId(tokens[0]);
        let ticketSecret = await token.getTicketSecret(ticketId);
        
        assert.isTrue(ticketSecret == secret);       
        
    });

    

    it('cannot burn executionticket when not ticket holder', async () => {
        let token = await tokenContract.deployed();        

        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 1);
        
        let ticketId = await token.getTicketId(tokens[0]);

        
        await truffleAssertions.reverts(token.burnExecutionTicket(ticketId,{from:accounts[0]}), "You are not the token owner"); 
        
    });

    it('can burn executionticket for existing token', async () => {
        let token = await tokenContract.deployed();        
        
        let secret = 256;
        
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length == 1);
        
        let ticketId = await token.getTicketId(tokens[0]);

        
        await truffleAssertions.passes(token.burnExecutionTicket(ticketId,{from:accounts[1]}), 'ticket holder, but cannot burn ticket'); 
                
    });



    it('cannot burn non-existant executionticket for existing token', async () => {
        let token = await tokenContract.deployed();        
        
        let secret = 256;

        await mintForAccount(accounts[1]);
        
        //i am acc 2, getting for acc1
        let tokens = await token.getTokens(accounts[1]);
        assert.isTrue(tokens.length >= 1);
        

        
        await truffleAssertions.reverts(token.burnExecutionTicket(tokens[tokens.length -1],{from:accounts[1]}), "The ticket does not exist"); 
        
    });

    it('disallows non-approved service wallets from burning executiontokens', async () => {
        let token = await tokenContract.deployed();        
        let someCustomer = accounts[2]; //not assigned
        let secret = 256;

        await mintForAccount(someCustomer); //account X minted an nft
        await createTicketForAccount(someCustomer, secret); //account X creates the ticket
        //i am acc 2, getting for acc1
        let tokens = await token.getTokens(someCustomer); //get the tokens of the account X
        assert.isTrue(tokens.length >= 1); //verify it exists
        let ticketId = await token.getTicketId(tokens[0]); //get latest ticket-id
        
        await truffleAssertions.reverts(token.serviceBurnExecutionTickets(ticketId,{from:someCustomer}), "Caller has to be an assigned/allowed service."); 
        
    });

    it('allows contract owner to assign service wallets (for burn interaction)', async () => {
        let token = await tokenContract.deployed(); 
        let contractOwner = accounts[0];   
        let someService = accounts[3]; 
        
        
        //assign the service to allow it to burn
        await truffleAssertions.passes(token.assignAllowedService(someService,{from:contractOwner}), "Contract owner was unable to assign a service to the allowed list of services that can burn tickets.");
        
    });

    it('allows approved service wallets to burn executiontokens', async () => {
        let token = await tokenContract.deployed(); 
        let someCustomer = accounts[2];
        let someService = accounts[3]; 
        let secret = 256;
        
        //mint token for some customer, create a ticket
        await mintForAccount(someCustomer); //account X minted an nft
        await createTicketForAccount(someCustomer, secret); //account X creates the ticket
        let tokens = await token.getTokens(someCustomer); //get the tokens of the account X
        assert.isTrue(tokens.length >= 1); //verify it exists
        let ticketId = await token.getTicketId(tokens[0]); //get latest ticket-id
        
        //service should be able to burn the token now
        await truffleAssertions.passes(token.serviceBurnExecutionTickets(ticketId,{from:someService}), "Caller has to be an assigned/allowed service.");
        
    });

    it('allows contract owner to unassign service wallets (for burn interaction)', async () => {
        let token = await tokenContract.deployed(); 
        let contractOwner = accounts[0];   
        let someService = accounts[3]; 
        
        
        //assign the service to allow it to burn
        await truffleAssertions.passes(token.unassignAllowedService(someService,{from:contractOwner}), "Contract owner was unable to unassign a service to the allowed list of services that can burn tickets.");
        
    });

    it('disallows an unassigned service that had been assigned before from burning tickets', async () => {
        let token = await tokenContract.deployed();        
        let someCustomer = accounts[2]; //not assigned     
        let someService = accounts[3]; //had been assigned and then unassigned in the last executed test
        let secret = 256;

        await mintForAccount(someCustomer); //account X minted an nft
        await createTicketForAccount(someCustomer, secret); //account X creates the ticket
        //i am acc 2, getting for acc1
        let tokens = await token.getTokens(someCustomer); //get the tokens of the account X
        assert.isTrue(tokens.length >= 1); //verify it exists
        let ticketId = await token.getTicketId(tokens[0]); //get latest ticket-id
        
        await truffleAssertions.reverts(token.serviceBurnExecutionTickets(ticketId,{from:someService}), "Caller has to be an assigned/allowed service."); 
        
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
    async function createTicketForAccount(account, secret)
    {
        let token = await tokenContract.deployed();    
    await token.createExecutionTicket(secret,{from:account});
    }
    
    async function mintForAccount (account)
    {
        let token = await tokenContract.deployed();       
        let value = web3.utils.toWei('0.001', 'ether');
        await token.mint(account,{from:account, value: value});
    }

});