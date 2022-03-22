import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MainComponent extends Component {
//TBD what is wrong here? cannot use LET or VAR, cannot write into variables.


  @tracked showAboutUs = false;
  @tracked showPrivacy = false;
  @tracked showWeb3Bar = false;
  @service router;
  @service web3service;
  
  @action toggleShowAboutUs() {
    this.showAboutUs = !this.showAboutUs;
  }
  @action toggleShowPrivacy() {
    this.showPrivacy = !this.showPrivacy;
  }
  
  @action toggleWeb3Bar() {
    this.showWeb3Bar = !this.showWeb3Bar;
  }



}
