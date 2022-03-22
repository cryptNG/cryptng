using Nethereum.Web3;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts.CQS;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Contracts;
using Nethereum.Contracts.Extensions;
using System.Numerics;
using CryptNG.Autogen.ComputingPaymentToken.ContractDefinition;
using CryptNG.Autogen.ComputingPaymentToken;
using System.Text.Json;
using System.Text;
using app;
using CryptNG.Autogen.BasicProofingToken;
using CryptNG.Autogen.BasicProofingToken.ContractDefinition;
using System;

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
//ngc generate from-abi -abi ./ComputingPaymentToken.abi -o . -ns CryptNG.Autogen
//sudo chown -R yavuz:yavuz *



//this setup assumes following:
//truffle develop running
//service (server in cs) running





var net_localdevelop = "http://localhost:9545";
var net_noventdevelopment = "http://192.168.0.7:9545";
//private key of the account we are using here
var privateKey = "2163b1f7cb60228ec5adad6347e0768cfe909eec7a84b833c21ae516303d70d8";
var account = new Account(privateKey, 1337);
var web3 = new Web3(account, net_localdevelop);

//TODO: make this a cli application
//TODO: load wallet privateKey/ passphrase to generate privateKey
//decryption

var computingPaymentTokenContractAddress = "0xCE476007bd55342bc348aBD5d4C46B2967D46D30";
var basicProofingTokenContractAddress = "0xab512A8125430e48b9ed1d203da737D9a3aE0965";

Console.WriteLine("& After truffle develop:");
Console.WriteLine("Did you migrate the contract in develop?");
Console.WriteLine("After truffle migrate --reset:");
Console.WriteLine("Did you generate the autogen code with");
Console.WriteLine("ngc generate from-abi -abi ./ComputingPaymentToken.abi -o . -ns CryptNG.Autogen");
Console.WriteLine("And then copy the autogen code from WSL to here?");
Console.WriteLine("This is just temporary");

Console.WriteLine("Did you update the contract address?");
Console.WriteLine("Did you update the wallet addresses?");
Console.WriteLine("Did you start the distiller service?");
Console.WriteLine();



//SERVICE API, get secret for service, use it to create executiontoken
//service can determine your api calls via your secret key you provided 
//when you generated the clientsecret ib this call
string clientSecret = "255";
HttpClient client = new HttpClient();
client.BaseAddress = new Uri("http://localhost:5006");
var serviceSecretReq = client.GetAsync($"/ServiceApi/createsecret?clientSecret={clientSecret}").Result;



Console.WriteLine("Service SECRET REQ: " + serviceSecretReq);
string serviceSecretStr = serviceSecretReq.Content.ReadAsStringAsync().Result;
Console.WriteLine("Service SECRET: " + serviceSecretStr);
BigInteger serviceSecret = BigInteger.Parse(serviceSecretStr);



//var serviceSecretBigInt = BigInteger.Parse(serviceSecret);

//normally a client would not mint a token on every call but rather
//buy a token with a balance of X, then use up the balance via executiontokens
//then mint a token either manually or automagically depending on their preferences
//we mint on every call because i don't want to manually mint a token from time to time.


ComputingPaymentTokenService cptService = new ComputingPaymentTokenService(web3, computingPaymentTokenContractAddress);
BasicProofingTokenService bptService = new BasicProofingTokenService(web3, basicProofingTokenContractAddress);

var mintFunc = new MintFunction()
{
    AmountToSend = 10000000000000000,
    To = account.Address,
    TokenType = 1

};

var mintFuncProofing = new MintFunction()
{
    AmountToSend = 10000000000000000,
    To = account.Address,
    TokenType = 2
};

var mintEvent = cptService.ContractHandler.GetEvent<CryptNG.Autogen.ComputingPaymentToken.ContractDefinition.TransferEventDTO>();
var mintFilter = await mintEvent.CreateFilterAsync();

var mintReceipt = await cptService.MintRequestAsync(mintFuncProofing);

Console.WriteLine(mintReceipt);

var mintLog = await mintEvent.GetFilterChangesAsync(mintFilter);


UInt64 tokenId = 0;
foreach (var eventLog in mintLog)
{
    tokenId = (UInt64)eventLog.Event.TokenId;
    Console.WriteLine("Minted: " + eventLog.Event.TokenId);
}







UInt64 ticketId = 8;

var createExecutionTicketFunc = new CreateExecutionTicketFunction()
{
    ServiceSecret = serviceSecret,
    TokenId = tokenId
};

var createTicketEvent = cptService.ContractHandler.GetEvent<CreatedExecutionTicketEventDTO>();
var createTicketEventFilter = await createTicketEvent.CreateFilterAsync();

var createTicketReceipt = await cptService.CreateExecutionTicketRequestAsync(createExecutionTicketFunc);

var createTicketLog = await createTicketEvent.GetFilterChangesAsync(createTicketEventFilter);

foreach (var eventLog in createTicketLog)
{
    Console.WriteLine("TicketID: " + eventLog.Event.TicketId);
    ticketId = (UInt64)eventLog.Event.TicketId;
    Console.WriteLine("TokenId: " + eventLog.Event.TokenId);
}

string xmlData = System.IO.File.ReadAllText("testinputData.xml");
string xslData = System.IO.File.ReadAllText("testinputData2pdf.xsl");
string requestJson = JsonSerializer.Serialize(new executionRequestModel() { xmlData = xmlData, xslData = xslData, clientSecret = clientSecret, ticketId = ticketId, tokenId = tokenId });
var requestStringContent = new StringContent(requestJson, Encoding.UTF8, "application/json");
var executionReq = client.PostAsync($"/ServiceApi/order", requestStringContent).Result;
string executionRequestId = executionReq.Content.ReadAsStringAsync().Result;
Console.WriteLine("Req Result: " + executionRequestId);



int timeoutInSeconds = 30;
string OrderResult = "Created";


while (timeoutInSeconds > 0 && OrderResult == "Created")
{
    Thread.Sleep(1000);


    try
    {
        Console.WriteLine("Retriving current order state");
        OrderResult = client.GetAsync($"/ServiceApi/order/state?requestId={executionRequestId}").Result.Content.ReadAsStringAsync().Result;
        Console.WriteLine("STATE: " + OrderResult);
    }
    catch (Exception exc)
    {
        Console.WriteLine($"PdfDestiller GetOrderState Request errored out. Retrying");

    }


    timeoutInSeconds--;



    if (OrderResult == "Error")
    {
        Console.WriteLine("An Error occurred, retrieving info");
        string errorRequestResult = client.GetAsync($"/ServiceApi/order/result?requestId={executionRequestId}&tokenId={tokenId}").Result.Content.ReadAsStringAsync().Result;
        byte[] byData = Convert.FromBase64String(errorRequestResult);
        string errorResult = Encoding.UTF8.GetString(byData);

        Console.WriteLine("ERRORDOCUMENT: " + errorResult);
        return;
    }

    if (OrderResult == "Finished")
    {
        Console.WriteLine("FINISHED: " + OrderResult);
        string executionResult = client.GetAsync($"/ServiceApi/order/result?requestId={executionRequestId}&tokenId={tokenId}").Result.Content.ReadAsStringAsync().Result;
        byte[] byData = Convert.FromBase64String(executionResult);
        Console.WriteLine("Result binary length: " + byData.Length);
        System.IO.File.WriteAllBytes("testresult.pdf", byData);
        Console.WriteLine("Result written");

        //proofingtoken, check

        byte[] savedData = File.ReadAllBytes("testresult.pdf");
        byte[] hashed = util.createHashFromByteArray(savedData);
        BigInteger hashBn = new BigInteger(hashed, true);

        var proofHashMapFunction = new ProofHashMapFunction()
        {

            FromHash = hashBn

        };


        var proof = bptService.ProofHashMapQueryAsync(proofHashMapFunction).Result;
        Console.WriteLine("TXHASH FOR PROOF: " + proof);


        //



        return;
    }
}
//var pdfResult = client.PostAsync($"/ServiceApi/execute?clientSecret={clientSecret}&ticketId={ticketId}", stringContent).Result.Content.ReadAsStringAsync().Result;


//byte[] data = Convert.FromBase64String(executionReqResStr);

//System.IO.File.WriteAllBytes("testresult.pdf", data);
//Console.WriteLine("Result written");


