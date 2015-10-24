var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

var sofar = "";

function anyBodyParser(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
}

app.use(anyBodyParser);


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

// to test http://developers.esendex.com/APIs/Push-Notifications :
//  curl -X POST --data-urlencode "<status>A note</status>" -H 'Content-Type: application/xml' https://siwatanejo.herokuapp.com/esendex
// or curl -X POST --data "<status>A note</status>" -H 'Content-Type: application/xml' https://siwatanejo.herokuapp.com/esendex
app.post('/esendex', function(request, response) {
  sofar += request.rawBody + "\n";
  response.send(sofar);
});

app.get('/esendex', function(request, response) {
  response.send("OKGET!");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


