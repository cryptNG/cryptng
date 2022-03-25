const Token = artifacts.require("BasicEvidencingToken");



module.exports = function (deployer) {

   deployer.deploy(Token);
   

   try
   {
     
      //whenever we migrate the contract, we had to manually copy-paste the newly build ABI json
      //from build/contracts/ctyptngTesttoken to the ember application ABI variable.
      //this code reads the ember application file and replaces the abi variable with the current abi
      //whenever a migration deploys a new contract.
      //this matches the logic we implemented in the emberjs application to detect a newly migrated contract
      
      //create symlink from $HOME/cryptng like so:
      //from the path of your ember application root to your home/emberapplication root
   
      //ln -s ~/sources/cryptng ${HOME}/cryptng
   
      //we link cryptng from our home to the full path, then use the container root (which looks at our home path
      //which was set up in the aliases section of our documentation)
      //to go to cryptng, which will lead to the symlink
      //this works because truffle-container root is mapped to $HOME of the host
      
      //NOTE, do not remove the try catch.
      //if you do, any fail will result in a broken contract deployment.
      
      //THE REASON:
      //we just don't want to manually copy-paste the abi json into our ember application every time
      //that we migrate a new contract.
      //this setup works in tandem with our migrate code in the test app, which retrieves the latest contract address
      //from the chain, since we are the only people working on it, any contract that has been deployed in the newest
      //blocks is inevitably our current smart contract address 
      //this is not production relevant!
   
   
      //this also generates the abi file to be consumed by nethereum code generator
      var fs = require('fs')
      fs.readFile('/root/sources/dev_server/webapp/app/controllers/application.js', 'utf8', function (err,emberfile) {
      if (err) {
        return console.log(err);
      }
      
      fs.readFile('build/contracts/BasicEvidencingToken.json', 'utf8', function (err,tokenfile) {
        if (err) {
          return console.log(err);
        }
      
      var tokenAbi = JSON.stringify(JSON.parse(tokenfile).abi);
      //replaces between var 'abi =' and '#end'
      
   
   
      //this writes the token abi to the csharp-client-project to be consumed by nethereum code generator
      fs.writeFile('/root/sources/cryptng/sources/dev_client/service_client_example/BasicEvidencingToken.abi', tokenAbi, 'utf8', function (err) {
       if (err) return console.log(err);
    });
    //now call nethereum autogen
    //executeCommand('source ~/.profile && ngc generate from-abi -abi /root/sources/cryptng/documentation/workshops/workshop_1_030222/testcontract_client/ComputingPaymentToken.abi -o /root/sources/cryptng/documentation/workshops/workshop_1_030222/testcontract_client/. -ns CryptNG.Autogen');
   
      
      const regex = /var abi = ([\s\S]*);\/\/#end/
      matches = regex.exec(emberfile);
      emberfile = emberfile.replace(matches[1],tokenAbi);
      
      
      fs.writeFile('/root/sources/dev_server/webapp/app/controllers/application.js', emberfile, 'utf8', function (err) {
         if (err) return console.log(err);
      });
      });
      });
   
   
      
   }
   catch(err)
   {
     console.log('automigrate to ember failed: ' + err);
   }
   
   
   };
   
   
   
   
   
   // THIS IS TO CALL NETHEREUM AUTOGENERATOR AUTOMAGICALLY
   const { exec } = require('child_process');
   
   var executeCommand = (cmd, successCallback, errorCallback) => {
     exec(cmd, (error, stdout, stderr) => {
       if (error) {
        // console.log(`error: ${error.message}`);
         if (errorCallback) {
           errorCallback(error.message);
         }
         return;
       }
       if (stderr) {
         //console.log(`stderr: ${stderr}`);
         if (errorCallback) {
           errorCallback(stderr);
         }
         return;
       }
       //console.log(`stdout: ${stdout}`);
       if (successCallback) {
         successCallback(stdout);
       }
     });
   };