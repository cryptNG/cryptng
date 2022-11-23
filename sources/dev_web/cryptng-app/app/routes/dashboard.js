import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardRoute extends Route {
    @service router;

    beforeModel() {
        if((window.ethereum.selectedAddress || null) == null)
        {
            this.router.transitionTo('/'); 
        }


      }

}
