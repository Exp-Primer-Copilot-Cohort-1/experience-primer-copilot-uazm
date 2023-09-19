// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up port
app.set('port', (process.env.PORT || 3000));

// Set up static files
app.use('/', express.static(path.join(__dirname, 'public')));

// Set up routes
app.get('/api/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),
      name: req.body.name,
      text: req.body.text,
    };
  });
});