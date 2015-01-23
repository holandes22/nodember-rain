import Ember from 'ember';

export function getStatusClass(input) {
  var status = input.get('status');
  if (status === 'good') {
    return 'success';
  }
  if (status === 'minor') {
    return 'warning';
  }
  return 'danger';
}

export default Ember.Handlebars.makeBoundHelper(getStatusClass);
