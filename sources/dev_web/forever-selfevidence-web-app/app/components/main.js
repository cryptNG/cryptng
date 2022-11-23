import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MainComponent extends Component {


  @service web3service;
  @tracked enteredHashData = {fileName : '', hashData : '', success: false, isUpload: false};
  @tracked mintedResults = []; //ok, nok
  @tracked verifiedResults = []; // ok, nok, filename or hash
  @tracked invalidHashMessage =""
  @tracked isVerifying=false;
  @tracked isMinting=false;
  @tracked isHashing=false;

//TODO DEBOUNCE
  @action updateEnteredHashData(e)
  {
    const re = /[^0-9a-fA-F]+/g;
    this.invalidHashMessage="";
    if(re.test(e.target.value)) {
      this.invalidHashMessage="The given input is not a valid hex value";
      return;
    }
    if(e.target.value.length>64) {
      this.invalidHashMessage="The given input has too many characters. Only max 64 characters allowed.";
      return;
    }
    this.invalidHashMessage="";
    this.enteredHashData = {fileName : '', hashData : e.target.value, success: false, isUpload: false};
  }

  get hasValueInserted(){
    return this.enteredHashData.hashData.length>0;
  }

  get hasValidHash(){
    return this.invalidHashMessage.length===0 && this.enteredHashData.hashData.length>0;
  }

  get isAllowedToDoVerifyOrMint()
  {
    return this.hasValidHash && !this.isVerifying && !this.isMinting && !this.isHashing
  }

  get hasResults(){
    return this.verifiedResults.length>0 || this.mintedResults.length>0;
  }

  @action clearHashData(){
    this.enteredHashData = {fileName : '', hashData : "", success: false, isUpload: false};
  }

  @action didInsertFileUpload() {
    const button = document.querySelector("#drop_box_button");
    const  input = document.querySelector("#drop_box_input");

    let file;
    button.onclick = () => {
      input.click();
    };
    //if you do async code in a lambda without async keyword, the babel build won't tell you but die
    input.addEventListener("change", async (e) => {
      this.isHashing=true;
      try{
        file = e.target.files[0];
        
        var reader = new FileReader();

        reader.onload = async (p) => {
          try
          {
            var arrayBuffer = reader.result;

            function buf2hex(buffer) { // buffer is an ArrayBuffer
              return [...new Uint8Array(buffer)]
                  .map(x => x.toString(16).padStart(2, '0'))
                  .join('');
            }
            
            // EXAMPLE:
            let buffer = new Uint8Array(arrayBuffer).buffer;
            let hex = buf2hex(buffer); // = 04080c10

            console.log(hex);

            //let fileHash = this.web3service.hashFile(hex);
            let fileHash = await crypto.subtle.digest('SHA-256', arrayBuffer);
            const hashArray = Array.from(new Uint8Array(fileHash));

        // convert bytes to hex string                  
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            console.log(hashHex);


            this.enteredHashData = {fileName : file.name, hashData : hashHex, success: false, isUpload: true};
            console.log('hashdata: ' + this.enteredHashData.hashData);
            this.enteredHashData  =  this.enteredHashData;
            this.invalidHashMessage="";
          }catch(e)
          {
            console.log(e);
          }finally
          {
            this.isHashing=false;
          }
        }
        
        await reader.readAsArrayBuffer(file);

      
        input.value = null; 
      }catch(e)
      {
        console.log(e);
        this.isHashing=false;
      }
    });

  }

  @action clearResults(){
    this.verifiedResults.clear();
    this.mintedResults.clear();
  }

  
  format_time(s) {
    let language = window.navigator.userLanguage || window.navigator.language;
    console.log('lang: ' + language);
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('tz: ' + timezone);

    const dtFormat = new Intl.DateTimeFormat(language, {
      timeStyle: 'short',
      timeZone: timezone
    });

    
    
    let time = dtFormat.format(new Date(s * 1e3));
    let date = new Date(s * 1000).toLocaleDateString(language);
    return `DATE (${language}): [${date}] TIME (${timezone}): [${time}]`;
  }
  

  @action async verifyExistingEvidence()
  {
    this.isVerifying=true;
    try
    {
      let resultobj = await this.web3service.verifySelfEvidence(this.enteredHashData.hashData);
      console.log('tokenid: ' +resultobj.tokenid);
      if(resultobj.tokenid != null)
      {
        let txData = await this.web3service.getMintedTransactionHashForTokenId(resultobj.tokenid);
        let txHash = txData.txhash;
        let timeStamp = txData.timestamp;
        this.verifiedResults.push({fileName : this.enteredHashData.fileName, hashData : this.enteredHashData.hashData, success: true, isUpload: this.enteredHashData.isUpload, time: this.format_time(timeStamp), txhash: txHash});
      }
      else
      {  
        this.verifiedResults.push({fileName : this.enteredHashData.fileName, hashData : this.enteredHashData.hashData, success: false, isUpload: this.enteredHashData.isUpload});
    
      }
    }catch(e)
    {
      this.verifiedResults.push({fileName : this.enteredHashData.fileName, hashData : this.enteredHashData.hashData, success: false, isUpload: this.enteredHashData.isUpload, error:e.message});
    }
    finally{
      this.isVerifying=false;
    }
   this.verifiedResults=this.verifiedResults;
   this.enteredHashData=this.enteredHashData;
  }

  @action async mintNewEvidence()
  {
    this.isMinting=true;
    try
    {
      let result = await this.web3service.mintSelfEvidence(this.enteredHashData.hashData);
      if(result == true)
      {
        let verifyResult = await this.web3service.verifySelfEvidence(this.enteredHashData.hashData);
        let txData = await this.web3service.getMintedTransactionHashForTokenId(verifyResult.tokenid);
        let txHash = txData.txhash;
        let timeStamp = txData.timestamp;
        this.workaround_sleep(5000);
        this.mintedResults.push({hashData : this.enteredHashData.hashData, success: true, time: this.format_time(timeStamp), txhash: txHash});
      }
      else
      {  
        this.mintedResults.push({hashData : this.enteredHashData.hashData, success: false});
    
      }
    }catch(e)
    {
      this.mintedResults.push({fileName : this.enteredHashData.fileName, hashData : this.enteredHashData.hashData, success: false, isUpload: this.enteredHashData.isUpload, error:e.message});
    }
    finally{
      this.isMinting=false;
    }
  this.enteredHashData=this.enteredHashData;
  this.mintedResults=this.mintedResults;
  }

  //to be fixed by christian
  workaround_sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
  }

  

}
