import Ember from 'ember';

export default Ember.Route.extend({
  model: function(message) {
    return this.store.find('message', message.message_id);
  }
});
