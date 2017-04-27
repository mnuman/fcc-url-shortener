var express = require('express');
var app = express();
var storage = require('./handle_storage');

// Dynamic port for HEROKU, otherwise default to 8080
var port = process.env.PORT || 8080;

function isUrl(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}

app.get('/new/*', (req, res) => {
  var originalUrl = decodeURI(req.params[0]);
  if (isUrl(originalUrl)) {
    var shortenedURL = storage.store(originalUrl)
    res.send({
      originalUrl: originalUrl,
      short_url: shortenedURL
    });
  }
  else {
    // "Not good", POTUS would say ...
    res.send({error:"Huh, passing me invalid URLs to store, mate?!"});
  }
  // console.log(req);
});

// Handle retrieval of shortened URL and redirect the browsert.
app.get('/:id', (req, res) => {
  var originalUrl = storage.retrieve(req.params.id);
  if (isUrl(originalUrl)) {
    console.log('Redirecting request for ' + req.params.id + ' to original URL: ' + originalUrl);
    res.redirect(originalUrl);
  }
  else {
    // "Not good", POTUS would say ...
    res.send({ error: "No short url found for given input!"});
  }
});

// set up listeren for application to start
app.listen(port, function() {
  console.log('URL-shortener app listening on port ', + port + '!');
});
