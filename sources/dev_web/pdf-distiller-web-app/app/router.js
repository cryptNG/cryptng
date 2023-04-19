import EmberRouter from '@ember/routing/router';
import config from 'pdf-distiller-web-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('usecases');
  this.route('features');
  this.route('app');
  this.route('samples');
  this.route('how-to');
  this.route('buy');
  this.route('doc');
  this.route('api');
  this.route('terms');
});
