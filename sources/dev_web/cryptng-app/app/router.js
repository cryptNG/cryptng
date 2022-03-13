import EmberRouter from '@ember/routing/router';
import config from 'myapp/config/environment';
import HashLocation from '@ember/routing/hash-location';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('dashboard');
});


Router.reopen({
  location: 'hash'
});