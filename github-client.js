var request = require('request');
var RSVP = require('rsvp');

var githubStatusAPIClient = module.exports =  {

  /*
  * Adapt response to what is expected by ember-data
  * which indicated the resource type and having
  * and "id" attr
  *
  */
  adaptToEmberData: function(data, idType) {
    if (idType === 'last' || idType === 'current-status') {
      data.id = idType;
    } else {
      for(var i=0; i < data.length; i++){
        data[i].id = i + 1;
      }
    }
    return { message: data };
  },

  get: function(path, idType) {

    var self = this;
    return new RSVP.Promise(function(resolve, reject){
      var url = 'https://status.github.com/api/' + path + '.json';
      request({url: url, json: true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var data = self.adaptToEmberData(response.body, idType);
          resolve(data);
        } else {
          reject({ 'detail': response.body });
        }
      });

     });
  },

  getAllMessages: function() {
    return this.get('messages');
  },

  getLastMessage: function() {
    return this.get('last-message', 'last');
  },

  getCurrentStatus: function() {
    return this.get('status', 'current-status');
  }
};
