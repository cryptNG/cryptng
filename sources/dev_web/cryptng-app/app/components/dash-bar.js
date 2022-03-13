import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';


export default class Dashboard extends Component {



    @service web3service;
    @service router;

    
  
  @action goToDashboard()
  {
    this.router.transitionTo('dashboard');
  }

  
  @action goToMain()
  {
    this.router.transitionTo('/');
  }
    
 

  @action async connect()
  {
    try
    {

      await this.web3service.connect();
      
      if(this.web3service.isConnected)
      {
        this.goToDashboard();
      }

      // this.toggleWeb3Bar();
    }
    catch(err)
    {
      window.alert(err.message);
    }
  }

  

  @action async disconnect()
  {
    try
    {

      this.web3service.disconnect();
      this.goToMain();
    }
    catch(err)
    {
      window.alert(err.message);
    }
  }
    

}
