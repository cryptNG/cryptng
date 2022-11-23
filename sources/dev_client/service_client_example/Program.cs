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
using CryptNG.Autogen.BasicEvidencingToken;
using CryptNG.Autogen.BasicEvidencingToken.ContractDefinition;
using System;
using Microsoft.Extensions.Configuration;
using app.Configuration;


//call this to migrate new abi:
//after source ~/.profile
//ngc generate from-abi -abi ./ComputingPaymentToken.abi -o . -ns CryptNG.Autogen
//sudo chown -R yavuz:yavuz *



//this setup assumes following:
//truffle develop running
//service (server in cs) running


public static class Program
{
    private static IConfiguration? _configuration;
    public static void Main(string[] args)
    {
        _configuration = ConfigurationHelper.GetConfiguration();

        ServiceClient client = new ServiceClient(_configuration);
        client.Run().GetAwaiter().GetResult();
    }

}



