import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('messages', function() {
    this.route('message', { path: ':message_id' });
  });
  this.route("weather");
  this.route("last");
});

export default Router;
