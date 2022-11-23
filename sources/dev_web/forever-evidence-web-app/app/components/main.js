import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MainComponent extends Component {


  @service web3service;
  
  _file = null;

   @action  didInsertFileUpload() 
   {
     const dropArea = document.querySelector(".drop_box"),
   button = dropArea.querySelector("button"),
   dragText = dropArea.querySelector("header"),
   input = dropArea.querySelector("input");
   let file;
   var filename;
 button.onclick = () => {
   input.click();
 };
 //if you do async code in a lambda without async keyword, the babel build won't tell you but die
  input.addEventListener("change", async (e) => {
   
   this._file = e.target.files[0];
   
     let fileHash = this.web3service.hashFile(this._file);
     window.alert(fileHash);
    let result = await this.web3service.proofHashMap(fileHash);
    
    window.alert(result);
  }

  );
 
  }



}
