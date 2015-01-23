import DS from 'ember-data';
import ENV from 'frontend/config/environment';

export default DS.ActiveModelAdapter.extend({
  host: ENV.APP.API_HOST,
  namespace: 'api'
});
