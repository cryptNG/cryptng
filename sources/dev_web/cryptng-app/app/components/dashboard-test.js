import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import { run } from '@ember/runloop'; 

export default class Dashboard extends Component {



    @service web3service;
    @service router;
    //@service notify; //notify is broken for 4.x
    


    @action async mint()
    {
      this.web3service.mint();
    }

    
    
  @action async disconnect()
  {
    try
    {
      this.web3service.disconnect();
      this.goToHome()
    }
    catch(err)
    {
      window.alert(err.message);
    }
  }

  
  @action goToHome()
  {
    this.router.transitionTo('/');
  }
    
  //ember notify does not work with 4.x this is a temporary workaround
  @action mintWhenDisabled() {
    let msg = "Minting is currently disabled."

    var y = document.getElementById("toastdesc")
    var x = document.getElementById("toast")
    x.className = "show";
    
    setTimeout(function(){ y.textContent = msg; }, 800);
    setTimeout(function(){ y.textContent = ""; }, 4200);
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

//notify is broken for 4.x
// @action mintWhenDisabled()
// {
//   this.notify.alert(`Minting is currently disabled!`,{
//     classNames: ['custom-notify']
//   });
// }


}
