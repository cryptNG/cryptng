import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
    @service router;
    @service web3service;
    
    hasWalletEventsSet = false;
    async beforeModel() {

        await this.web3service.getIsMintingActive();
        //instead, create and call web3service.configureweb3
        this.web3service.registerHandlers(this.router);


      
      }

}
