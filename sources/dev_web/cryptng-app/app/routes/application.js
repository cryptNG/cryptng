import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
    @service router;
    hasWalletEventsSet = false;
    beforeModel() {


        //instead, create and call web3service.configureweb3
        if(!this.hasWalletEventsSet)
        { window.ethereum.on("disconnect", (error) => {
            console.log(`Disconnected from network ${error}`);
            this.router.transitionTo('/'); 
          });

          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
               this.router.transitionTo('dashboard'); 
            } else {
              console.error("0 accounts.");
              this.router.transitionTo('/'); 
            }
          });
          this.hasWalletEventsSet = true;
        }
       

        if((window.ethereum.selectedAddress || null) != null)
        {
            this.router.transitionTo('dashboard'); 
        }


      
      }

}
