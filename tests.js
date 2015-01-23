var testrunner = require("qunit");
var nock = require('nock');
var app = require('./server');


testrunner.setup({
  log: {
    summary: true
  }
});


var messages = [
  {
    "status": "good",
    "body": "Battlestation fully operational",
    "created_on": "2012-12-07T18:11:55Z"
  },
  {
    "status": "minor",
    "body": "Almost done reticulating splines",
    "created_on": "2012-12-05T12:08:33Z"
  }
];


var lastMessage = {
  "status": "good",
  "body": "Battlestation fully operational",
  "created_on": "2012-12-07T18:11:55Z"
};


var currentStatus = {
  "status": "good",
  "last_updated": "2012-12-07T18:11:55Z"
};


var api = nock('https://status.github.com');

test("it exists", function () {
  ok(app);
});

asyncTest('get all messages', function (assert) {
  expect(1);
  api
    .get('/api/messages.json')
    .reply(200, messages);
  app.getAllMessages().then(function(json) {
    assert.deepEqual(json, messages, "messages is as expected");
    start();
  });
});

test('get last message', function () {
  expect(1);
  stop();
  api
    .get('/api/last-message.json')
    .reply(200, lastMessage);
  app.getLastMessage().then(function(json) {
    assert.deepEqual(json, lastMessage, "last message is as expected");
    start();
  });
});

test('get current status', function () {
  expect(1);
  stop();
  api
    .get('/api/status.json')
    .reply(200, currentStatus);
  app.getCurrentStatus().then(function(json) {
    assert.deepEqual(json, currentStatus, "status is as expected");
    start();
  });
});


asyncTest('get all messages failure', function (assert) {
  expect(1);
  api
    .get('/api/messages.json')
    .reply(500, { error: 'foo' });
  app.getAllMessages().then(function(json) {
  }, function(error){
    expected = { detail: { error: 'foo' } };
    assert.deepEqual(error, expected, "messages error is as expected");
    start();
  });
});

