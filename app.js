
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

/* connection à la base de données MongoDB */
var mongoose = require("mongoose");

// var db = mongoose.connect("mongodb://aur1:Fladmecpoof6@localhost:27017/aur1");
var db = mongoose.connect("mongodb://localhost/aur1_sarl");


var app = express();

// initialisation des données
require("./initialisation_donnees.js");


// all environments
//app.set('port', process.env.PORT || 3001);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));

/*app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});*/

app.use(express.bodyParser());


app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// appel du fichier qui traite l'ensemble des routes
var routes = require("./routes.js")(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
