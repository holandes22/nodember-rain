var express = require('express');
var githubStatusAPIClient = require('./github-client');


var resolvePromise = function(response, method, idType) {
  githubStatusAPIClient[method]()
    .then(function(json) {
      response.send(json);
    }, function(json) {
      response.send(json);
    });
};


var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');
  next();
};

app.use(allowCrossDomain);

app.get('/api/messages', function(request, response) {
  resolvePromise(response, 'getAllMessages');
});

app.get('/api/messages/last', function(request, response) {
  resolvePromise(response, 'getLastMessage');
});

app.get('/api/messages/current-status', function(request, response) {
  resolvePromise(response, 'getCurrentStatus');
});


if (!module.parent) {
  app.listen(3000);
}
