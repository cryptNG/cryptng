import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { later } from '@ember/runloop';
import BaseComponent from 'pdf-distiller-web-app/components/base';

export default class MainComponent extends BaseComponent {


  @tracked uploadedFileData = {fileName : '', hashData : '', success: false, isUpload: false};
  @tracked globalError = ""
  @tracked invalidXmlFileMessage =""
  @tracked invalidXslFileMessage =""
  @tracked invalidCaptchaMessage =""
  @tracked invalidTokenMessage =""
  @tracked invalidUserIdMessage =""
  
  @tracked enteredTokenContent ="";//= "105093690748332751621918588951184047721089242562771633509620538390607389708859";
  @tracked enteredCaptchaContent ="";//= "105093690748332751621918588951184047721089242562771633509620538390607389708859"
   @tracked enteredUserIdContent ="";//= "laura.rummi@gmx.de";
  @tracked isWorking=false;
  @tracked isShowingRequestModal = false;
  @tracked isShowingSignInModal = false;
  @tracked userId = null;
  @tracked isSessionSave = false;
  @tracked isGettingCaptcha = false;

  captchaSecret ="";

  constructor() {
    super(...arguments);
          
    this.loadFromSessionIfSaved();
  }
  
  @action toggleSessionSave() {
    this.isSessionSave = !this.isSessionSave;
    this.manageSessionStorage();
  }

  loadFromSessionIfSaved() {
      if (sessionStorage.getItem('distiller_hassaved_session') == 'true') {
          console.log('session save is active for ' + 'distiller_hassaved_session');
          this.enteredTokenContent = sessionStorage.getItem('distiller_session_token');
          this.enteredUserIdContent = sessionStorage.getItem('distiller_session_userid');
          this.isSessionSave = true;
      }
  }

  executeOrderLoop = task(async (requestId) => {

    let orderState = await this.getOrderState(requestId);
    while(orderState.isRunning)
    {
    await timeout(500);
    orderState = await this.getOrderState(requestId);
    }
    if(orderState.isFinished)
    {
      await this.getOrderResult(requestId);
    }
    else
    {
      let err = await this.getOrderError(requestId);
      this.globalError = err;
    }
  });

  @action async executeOrderRetrieveResult()
  {
    this.globalError = '';
    const createOrderResult = await this.createOrder();
    if(createOrderResult.isError)
    {
      
      this.globalError = createOrderResult.message;
      console.log('error: ' + createOrderResult.message);
      return;
    }

    this.executeOrderLoop.perform(createOrderResult.requestId);
    
  }

  get isSignedIn()
  {
    return this.enteredUserIdContent.length>0 && this.enteredTokenContent.length === 64
  }
  

  manageSessionStorage()
  {
    if (this.isSessionSave) {
      console.log('Saving to Session: [distiller_session_token : ' + this.enteredTokenContent + ']');
      console.log('Saving to Session: [distiller_session_userid : ' + this.enteredUserIdContent + ']');
      sessionStorage.setItem('distiller_session_token', this.enteredTokenContent);
      sessionStorage.setItem('distiller_session_userid', this.enteredUserIdContent);
      sessionStorage.setItem('distiller_hassaved_session', true);
  }
  else {
      sessionStorage.setItem('distiller_session_token', '');
      sessionStorage.setItem('distiller_session_userid', '');
      sessionStorage.setItem('distiller_hassaved_session', false);
  }
  }

   async createOrder()
  {
    



    let content = {xmlData: this.enteredXmlContent, 
      xslData: this.enteredXslContent, 
      tokenId: this.enteredTokenContent, userId: this.enteredUserIdContent}
      let jsonContent = JSON.stringify(content);
        const response = await fetch(
          'https://yitc.ddns.net:5000/api/service/order', 
          { method: 'POST',
           headers: new Headers(
           {'Content-Type': 'application/json',
            'Accept': '*/*',
            'Content-Length': content.length                
            }),
            body: jsonContent
           });
           

      
      if(response.status === 200)
      {
        const requestId = await response.text();
        console.log('requestid: ' + requestId);
        return {isError: false, requestId: requestId, message: null}
      }
      else
      {
        let error =  await response.text();
        return {isError: true, requestId: null, message: error}
      }
  }

  async getOrderState(requestId)
  {
    const response = await fetch(
      'https://yitc.ddns.net:5000/api/service/order/state?requestId='+requestId,
      {
        method: 'GET'
      }
    );
    const res = await response.text();
    console.log('order state: ' + res);
    return {
      isRunning : res==="Created",
      isError: res ==="Error",
      isFinished: res ==="Finished"
    }
  }

  async getOrderResult(requestId)
  {
    const response = await fetch(
      'https://yitc.ddns.net:5000/api/service/order/result?requestId='+requestId,
      {
        method: 'GET'
      }
    );
    let blob = await response.blob();
    // const byteCharacters = atob(orderResult);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // const blob = new Blob([byteArray], {type: 'application/pdf'});        
    const blobUrl = URL.createObjectURL(blob);
    let tab = window.open();
    tab.location.href = blobUrl;

  }


  async getOrderError(requestId)
  { 
    const response = await fetch(
      'https://yitc.ddns.net:5000/api/service/order/result?requestId='+requestId,
      {
        method: 'GET'
      }
    );
    let orderResult = await response.text();
    if(response.status == 200)
    {
      return atob(orderResult);
    }
    return orderResult;
  }

  @action showRequestTokenModal()
  {
    this.isShowingRequestModal = true;
    this.isShowingSignInModal = false;

  }

  @action showSignInTokenModal()
  {
    this.isShowingSignInModal = true;
    this.isShowingRequestModal = false;
  }

  @action closeRequestModal(){
    this.isShowingRequestModal=false;
  }

  @action closeSignInModal(){
    this.isShowingSignInModal=false;
  }


  @action updateXmlFileContent(data)
  {
    var base64String = String.fromCharCode(...new Uint16Array(data.content));
    this.enteredXmlContent = base64String;
  }

  @action updateXslFileContent(data)
  {
    var base64String = String.fromCharCode(...new Uint16Array(data.content));
    this.enteredXslContent = base64String;
  }

  @action updateEnteredXmlContent(e)
  {
   
    this.invalidXmlFileMessage="";
    this.enteredXmlContent =  e.target.value;
  }
  

  @action updateEnteredXslContent(e)
  {
  
    this.invalidXslFileMessage="";
    this.enteredXslContent =  e.target.value;
  }

  @action updateEnteredTokenContent(e)
  {
    const re = /[^0-9a-fA-F]+/g; 
    this.invalidTokenMessage="";
    if(re.test(e.target.value)) {
      this.invalidTokenMessage="The given input is not a valid hex value";
      return;
    }
    if(e.target.value.length !== 64) {
      this.invalidTokenMessage="The given input has too many or few characters. 64 characters allowed.";
      return;
    }
    this.invalidTokenMessage="";
    this.enteredTokenContent =  e.target.value;
  }

  @action updateEnteredUserIdContent(e)
  {
    this.enteredUserIdContent =  e.target.value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.invalidUserIdMessage="";
    if(e.target.value.match(re)===null) {
      this.invalidUserIdMessage="The given input is not a valid email address";
      return;
    }
   
    this.invalidUserIdMessage="";
  }

  get isInvalidUserId(){
    return this.invalidUserIdMessage.length>0;
  }

  
  @action clearXmlInputContent(){
    this.enteredXmlContent = "";
  }
  
  @action clearCaptchaContent(){
    this.enteredCaptchaContent = "";
  }
  
  @action clearXslInputContent(){
    this.enteredXslContent = "";
  }
  
  @action clearTokenInputContent(){
    this.enteredTokenContent = "";
  }

  @action clearUserIdInputContent()
  {
    this.enteredUserIdContent = '';
  }

  

  get enteredDataOrXmlFileContent(){
    return this.enteredXmlContent;
  }
  

  get enteredDataOrXslFileContent(){
    return this.enteredXslContent;
  }


  get hasValidData(){
    return this.invalidXmlFileMessage.length===0 && this.invalidXslFileMessage.length === 0 && this.invalidTokenMessage.length === 0 && !this.isInvalidUserId;
  }
  
  updateSignIn=(userId,token)=>
  {
    this.enteredUserIdContent=userId;
    this.enteredTokenContent=token;
    this.manageSessionStorage();
    this.isShowingRequestModal=false;
    this.isShowingSignInModal=false;
  }

  //to be fixed by christian
  workaround_sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
  }

  

}
