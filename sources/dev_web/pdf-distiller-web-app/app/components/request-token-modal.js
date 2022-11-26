import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { later } from '@ember/runloop';

export default class RequestTokenModalComponent extends Component {



  @tracked invalidCaptchaMessage =""
  @tracked invalidTokenMessage =""
  @tracked invalidUserIdMessage =""
  
  @tracked enteredTokenContent ="";//= "105093690748332751621918588951184047721089242562771633509620538390607389708859";
  @tracked enteredCaptchaContent ="";//= "105093690748332751621918588951184047721089242562771633509620538390607389708859"
   @tracked enteredUserIdContent ="";//= "laura.rummi@gmx.de";
  @tracked isWorking=false;
  @tracked isGettingCaptcha = false;

  captchaSecret ="";

  constructor(){
    super(...arguments);
    later(this,function(){
        this.getCaptcha();
    },200);
    
  }

  @action close(){
    for (const elem of window.document.querySelectorAll("#captcha-container img")) {
      elem.remove();
    }
    this.args.close();
  }

  @action async requestToken()
  {
      const response = await fetch(
        'https://yitc.ddns.net:5000/api/token?userId='+this.enteredUserIdContent+'&captchaSolution='+this.enteredCaptchaContent+'&captchaSecret='+encodeURIComponent(this.captchaSecret),
        {
          credentials: 'include',
          method: 'GET'
        }
      );
      if(response.status === 401)
      {
        this.invalidCaptchaMessage =  await response.text();
        await this.getCaptcha();
      }
      if(response.status === 200)
      {
        this.enteredTokenContent = await response.text();
        this.args.updateSignIn(this.enteredUserIdContent,this.enteredTokenContent);
      }
  }


  async getCaptcha()
  {
    this.isGettingCaptcha=true;
    const container = window.document.querySelector("#captcha-container");

    for (const elem of window.document.querySelectorAll("#captcha-container img")) {
      elem.remove();
    }
   
    await timeout(200);
    const response = await fetch(
      'https://yitc.ddns.net:5000/api/captcha',
      {
        method: 'GET',
        credentials: 'include'
      }
    );
    
    let json = await response.json();     
    this.captchaSecret=json.SecretAsBase64;
    const byteCharacters = atob(json.ImageAsBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'image/bmp'});   
    const imageUrl = URL.createObjectURL(blob);
    
    const image = document.createElement('img');
    image.src = imageUrl;

    container.append(image);

    this.isGettingCaptcha=false;

  }

  @action doNothing(event){
    event.stopPropagation()
    return false;
  }

  @action updateEnteredCaptchaContent(e)
  {
   
    this.invalidCaptchaMessage="";
    this.enteredCaptchaContent =  e.target.value;
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

 
  @action clearCaptchaContent(){
    this.enteredCaptchaContent = "";
  }
  

  @action clearUserIdInputContent()
  {
    this.enteredUserIdContent = '';
  }



}
