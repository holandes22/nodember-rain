import DS from 'ember-data';

export default DS.Model.extend({

  status: DS.attr('String'),
  body: DS.attr('String'),
  createdOn: DS.attr('Date'),
  lastUpdated: DS.attr('Date')

});
