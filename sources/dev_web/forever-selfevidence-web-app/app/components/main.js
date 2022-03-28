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

//TODO DEBOUNCE
  @action updateEnteredHashData(e)
  {
    const re = /[^0-9a-fA-F]+/g;
    this.invalidHashMessage="";
    if(re.test(e.target.value)) {
      this.invalidHashMessage="The given input is not a valid hex value";
      return;
    }
    this.enteredHashData = {fileName : '', hashData : e.target.value, success: false, isUpload: false};
  }

  get hasValidHash(){
    return this.invalidHashMessage.length===0 && this.enteredHashData.hashData.length>0;
  }

  get hasResults(){
    return this.verifiedResults.length>0 || this.mintedResults.length>0;
  }

  @action clearHashData(){
    this.enteredHashData = {fileName : '', hashData : "", success: false, isUpload: false};
  }

  @action didInsertFileUpload() {
    const button = document.querySelector("#drop_box_button"),
      input = document.querySelector("#drop_box_input");
    let file;
    button.onclick = () => {
      input.click();
    };
    //if you do async code in a lambda without async keyword, the babel build won't tell you but die
    input.addEventListener("change", async (e) => {

      file = e.target.files[0];
      
      var reader = new FileReader();

      reader.onload = async (p) => {
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
      }
      
      await reader.readAsArrayBuffer(file);

     
      input.value = null; 
    }
    

  
    
    );

  }


  @action async verifyExistingEvidence()
  {
    try
    {
      let tokenId = await this.web3service.verifySelfEvidence(this.enteredHashData.hashData);
    
      if(tokenId != null)
      {
        this.verifiedResults.push({fileName : this.enteredHashData.fileName, hashData : this.enteredHashData.hashData, success: true, isUpload: this.enteredHashData.isUpload});
      }
      else
      {  
        this.verifiedResults.push({fileName : this.enteredHashData.fileName, hashData : this.enteredHashData.hashData, success: false, isUpload: this.enteredHashData.isUpload});
    
      }
    }catch(e)
    {
      this.verifiedResults.push({fileName : this.enteredHashData.fileName, hashData : this.enteredHashData.hashData, success: false, isUpload: this.enteredHashData.isUpload, error:e.message});
    }
   this.verifiedResults=this.verifiedResults;
  }

  @action async mintNewEvidence()
  {
    let result = await this.web3service.mintSelfEvidence(this.enteredHashData.hashData);
    if(result == true)
    {
      this.mintedResults.push({hashData : this.enteredHashData.hashData, success: true});
    }
    else
    {  
      this.mintedResults.push({hashData : this.enteredHashData.hashData, success: false});
   
    }
   this.mintedResults=this.mintedResults;
  }



}
