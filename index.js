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

app.post('/esendex', function(request, response) {
  //var body = request.rawBody;
  //response.send("OKPOST2!" + "\n" + body);

    console.dir(req.rawBody);
    res.contentType('application/xml');
    res.send(req.body, 200);

});

app.get('/esendex', function(request, response) {
  response.send("OKGET!");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


