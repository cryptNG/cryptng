import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';


export default class Dashboard extends Component {



    @service web3service;

    
 

  @action async connect()
  {
    try
    {

      await this.web3service.connect();
      

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
    }
    catch(err)
    {
      window.alert(err.message);
    }
  }
    

}
