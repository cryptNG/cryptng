import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';


export default class Dashboard extends Component {



    @service web3service;
    @service router;
  


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
    


}
