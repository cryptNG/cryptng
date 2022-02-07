using Nethereum.Web3;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts.CQS;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Contracts;
using Nethereum.Contracts.Extensions;
using System.Numerics;


//TRUFFLE LOCAL DEVELOP DATA:
// Accounts:
// (0) 0x3e508fcfc8748a5cc22eb186991adf03e867367e
// (1) 0x8211c69328d10bd976f93b68d7deac0db3973b8a
// (2) 0x354ba1baf0e44c903c695d3e666a8004128ab93e
// (3) 0x77b12dfb5a45bc37c2c4b61de5518fb072c771ed
// (4) 0x56ce7168e3cb3f655367ea95dceecca466e95091
// (5) 0x08e0c92c18f246469354d1047b0f62adf67060d4
// (6) 0x465a3c100e8120db84cd9d3aa9d61f828d264191
// (7) 0xb21cfe4f6c7dc5d87531ed646e4a42fc79c6e7be
// (8) 0x888afdb3b4d7359bca77e657a44a037c83394b96
// (9) 0xb656bb523fbd0e832082f0a3124cef976f0d05f3

// Private Keys:
// (0) f973e5765aa921c3e848fe5dfbf696f37029343b597bcaf2d6fe48da67d81734
// (1) 5823bfc149faf0cbc132481e082b49601dc57c1bffa7a3b05572ca20447f4ed9
// (2) 7ac06c38702d69230f3f9b8c43716ada312393f896ae5d4d637746384785a10b
// (3) f5eff84e38426e8c567625bc5c5e035e4ec5170df50e028a8dc0dc9afb0a2fc6
// (4) f0f463234e215fec893c2663f543cc14c6f66c940b6a5d1d35ec19cdef83b50c
// (5) 0a132a4776b5a4f73403eef802dd2bd9966e784b71695e68b70987e536455607
// (6) dd7e5d65ee900e4ea10eb8816d44139cb58c1df44832fb16a26e5fa30d102418
// (7) 5b1149be1d37059ee68d9065d515bf9ee9062c82e9f2e10837e80b968fe8a6e0
// (8) bbd406e73cab2103f48f4746e48a6ee55902da62ba31c9cda2cfbe473e69742a
// (9) 0c7427ce45d54af7f7265557ed3bae325310a8bb4874b82b263c840fb9ae5ed3

//call this to migrate new abi:
//after source ~/.profile
//ngc generate from-abi -abi ./cryptngTesttoken.abi -o . -ns CryptNG.Autogen
//sudo chown -R yavuz:yavuz *

using CryptNG.Autogen.cryptngTesttoken.ContractDefinition;
using CryptNG.Autogen.cryptngTesttoken;

var net_localdevelop = "http://localhost:9545";
var net_noventdevelopment = "http://192.168.0.7:9545";
var privateKey = "f973e5765aa921c3e848fe5dfbf696f37029343b597bcaf2d6fe48da67d81734";
var account = new Account(privateKey, 1337);
var web3 = new Web3(account, net_localdevelop);



var webb = new Web3();
var contractAddress = "0x899e440Ff7818a6ADad018558fAF0056F90c68d0";

Console.WriteLine("Did you generate the autogen code with");
Console.WriteLine("ngc generate from-abi -abi ./cryptngTesttoken.abi -o . -ns CryptNG.Autogen");
Console.WriteLine("And then copy the autogen code from WSL to here?");
Console.WriteLine("This is just temporary");
Console.WriteLine();

var getTokenFunc = new GetTokensFunction()
{
    Owner = account.Address
    
};



//var getTokenFuncHandler = web3.Eth.GetContractQueryHandler<GetTokensFunction>();
//var tokensDto = await getTokenFuncHandler.QueryAsync<GetTokensOutputDTO>(contractAddress, getTokenFunc);
//var tokenList = tokensDto.ReturnValue1;


//foreach(var token in tokenList)
//{
//    Console.WriteLine(token);

//}




//var createExecutionTicketHandler = web3.Eth.GetContractQueryHandler<CreateExecutionTicketFunction>();
//var task =  createExecutionTicketHandler.QueryAsync<BigInteger>(contractAddress, createExecutionTicketFunc);
//var ticketId = task.Result;


//Console.WriteLine(ticketId);


//EMIT EVENTS INSTEAD OF RETURNING VALUES FROM CONTRACT 
//VIEW FUNCTIONS CAN BE DIRECTLY READ
//STATE CHANGING NEED TRANSACTION, THEREFORE NEED TO BE EVENTS


CryptngTesttokenService service = new CryptngTesttokenService(web3, contractAddress);
var token = await service.GetTokensQueryAsync(getTokenFunc);
//Console.WriteLine("Token: " + token);
//foreach(var tok in token)
//{
//    Console.WriteLine(tok.ToString());
//}

//var ticket = await service.CreateExecutionTicketRequestAsync(createExecutionTicketFunc);
//var ticket = await service.CreateExecutionTicketRequestAndWaitForReceiptAsync(createExecutionTicketFunc);

//Console.WriteLine("TICKET STATUC: " + ticket.Status.Value);
//Console.WriteLine("TICKET TX INDEX VALUE: "+ ticket.TransactionIndex.Value);



var mintFunc = new MintFunction()
{
    AmountToSend = 10000000000000000,
    To = account.Address
};

var mintEvent = service.ContractHandler.GetEvent<TransferEventDTO>();
var mintFilter = await mintEvent.CreateFilterAsync();

var mintReceipt = await service.MintRequestAsync(mintFunc);

var mintLog = await mintEvent.GetFilterChangesAsync(mintFilter);

foreach(var eventLog in mintLog)
{
    Console.WriteLine("Minted: "+eventLog.Event.TokenId);
}

var createExecutionTicketFunc = new CreateExecutionTicketFunction()
{
    ServiceSecret = 255

};

var createTicketEvent = service.ContractHandler.GetEvent<CreatedExecutionTicketEventDTO>();
var createTicketEventFilter = await createTicketEvent.CreateFilterAsync();

var createTicketReceipt = await service.CreateExecutionTicketRequestAsync(createExecutionTicketFunc);

var createTicketLog = await createTicketEvent.GetFilterChangesAsync(createTicketEventFilter);

foreach (var eventLog in createTicketLog)
{
    Console.WriteLine("TicketID: "+eventLog.Event.TicketId);
    Console.WriteLine("TokenId: "+eventLog.Event.TokenId);
}


