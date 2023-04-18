import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { later } from '@ember/runloop';

export default class SignInModalComponent extends Component {
  @tracked invalidTokenMessage = '';
  @tracked invalidUserIdMessage = '';

  @tracked enteredTokenContent = ''; //= "105093690748332751621918588951184047721089242562771633509620538390607389708859";
  @tracked enteredUserIdContent = ''; //= "laura.rummi@gmx.de";

  constructor() {
    super(...arguments);
  }

  @action updateEnteredTokenContent(e) {
    const re = /[^0-9a-fA-F]+/g;
    this.invalidTokenMessage = '';
    if (re.test(e.target.value)) {
      this.invalidTokenMessage = 'The given input is not a valid hex value';
      return;
    }
    if (e.target.value.length !== 64) {
      this.invalidTokenMessage =
        'The given input has too many or few characters. 64 characters allowed.';
      return;
    }
    this.invalidTokenMessage = '';
    this.enteredTokenContent = e.target.value;
  }

  @action updateEnteredUserIdContent(e) {
    this.enteredUserIdContent = e.target.value;
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.invalidUserIdMessage = '';
    if (e.target.value.match(re) === null) {
      this.invalidUserIdMessage =
        'The given input is not a valid email address';
      return;
    }

    this.invalidUserIdMessage = '';
  }

  @action doNothing(event) {
    event.stopPropagation();
    return false;
  }

  get isInvalidUserId() {
    return this.invalidUserIdMessage.length > 0;
  }

  @action clearTokenInputContent() {
    this.enteredTokenContent = '';
  }

  @action clearUserIdInputContent() {
    this.enteredUserIdContent = '';
  }
}
