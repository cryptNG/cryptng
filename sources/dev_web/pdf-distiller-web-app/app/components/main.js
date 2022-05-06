import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MainComponent extends Component {


  @service web3service;
  @tracked uploadedFileData = {fileName : '', hashData : '', success: false, isUpload: false};
  @tracked mintedResults = []; //ok, nok
  @tracked verifiedResults = []; // ok, nok, filename or hash
  @tracked invalidXmlFileMessage =""
  @tracked invalidXslFileMessage =""
  @tracked isVerifying=false;
  @tracked isMinting=false;
  @tracked enteredXmlContent = "";
  @tracked enteredXslContent = "";
  @tracked isWorking=false;


  @action updateXmlFileContent(data)
  {
    this.enteredXmlContent = data.content;
  }
//TODO DEBOUNCE
  @action updateEnteredXmlContent(e)
  {
    const re = /[^0-9a-fA-F]+/g; 
    this.invalidXmlFileMessage="";
    if(re.test(e.target.value)) {
      this.invalidXmlFileMessage="The given input is not a valid hex value";
      return;
    }
    if(e.target.value.length>64) {
      this.invalidXmlFileMessage="The given input has too many characters. Only max 64 characters allowed.";
      return;
    }
    this.invalidXmlFileMessage="";
    this.enteredXmlContent =  e.target.value;
  }

  @action updateEnteredXslContent(e)
  {
    const re = /[^0-9a-fA-F]+/g; 
    this.invalidXslFileMessage="";
    if(re.test(e.target.value)) {
      this.invalidXslFileMessage="The given input is not a valid hex value";
      return;
    }
    if(e.target.value.length>64) {
      this.invalidXslFileMessage="The given input has too many characters. Only max 64 characters allowed.";
      return;
    }
    this.invalidXslFileMessage="";
    this.enteredXslContent =  e.target.value;
  }

  
  @action clearXmlInputContent(){
    this.enteredXmlContent = "";
  }
  
  @action clearXslInputContent(){
    this.enteredXslContent = "";
  }

  get enteredDataOrXmlFileContent(){
    return this.enteredXmlContent;
  }
  

  get enteredDataOrXslFileContent(){
    return this.enteredXslContent;
  }

  get isAllowedToDoVerifyOrMint()
  {
    return this.hasValidHash && !this.isVerifying && !this.isMinting && !this.isHashing
  }
  
  get hasValidData(){
    return this.invalidXmlFileMessage.length===0 && this.invalidXslFileMessage.length === 0;
  }

  get hasResults(){
    return this.verifiedResults.length>0 || this.mintedResults.length>0;
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
  

  @action async createPdf()
  {
    
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
