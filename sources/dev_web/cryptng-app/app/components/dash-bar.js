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

      await this.web3service.connect(this.goToDashboard, this.goToMain);
      
    

      // this.toggleWeb3Bar();
    }
    catch(err)
    {
      window.alert(err.message);
    }
  }

  


}
