var RSVP = require('rsvp');
var request = require('request');
var express = require('express');

var githubStatusAPIClient = {

  get: function(path) {

    return new RSVP.Promise(function(resolve, reject){

      var url = 'https://status.github.com/api/' + path + '.json';
      request(url, function (error, response, body) {
        console.log('Got response: ', response.toJSON());
        if (!error && response.statusCode == 200) {
          resolve(response.body);
        } else {
          reject({'detail': error});
        }
      });

     });
  },

  getAllMessages: function() {
    return this.get('messages');
  },

  getLastMessage: function() {
    return this.get('last-message');
  },

  getCurrentStatus: function() {
    return this.get('status');
  }
};


var resolvePromise = function(response, method) {
  githubStatusAPIClient[method]()
    .then(function(json) {
      response.send(json);
    }, function(json) {
      response.send(json);
    });
};

var app = express();

app.get('/api/messages', function(request, response) {
  resolvePromise(response, 'getAllMessages');
});

app.get('/api/messages/last', function(request, response) {
  resolvePromise(response, 'getLastMessage');
});

app.get('/api/messages/current-status', function(request, response) {
  resolvePromise(response, 'getCurrentStatus');
});

app.listen(3000);
