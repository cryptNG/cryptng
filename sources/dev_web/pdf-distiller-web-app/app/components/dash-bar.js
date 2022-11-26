import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';


export default class Dashboard extends Component {
    @tracked isShowToken=false;
    @tracked isCopyClipboard = false;

    get cutToken(){
        return this.args.token.substring(0,16)+'...';
    }

    @action showToken(){
        this.isShowToken=true;
        
    }

    @action async copyTokenToClipboard(){
        this.isCopyClipboard=true;
        navigator.clipboard.writeText(this.args.token).then(
            () => {
                later(this, function() {
                    this.isCopyClipboard=false;
                  }, 500);
            },
            (e) => {
                console.log(e);
                this.isCopyClipboard=false;
            }
          );
        
    }

    @action hideToken(){
        this.isShowToken=false;
    }
}
