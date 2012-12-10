
/**
 * Module dependencies.
 */

var express = require('express')
  
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')

var app = express();
var c = require('./config');
var routes = require('./routes');
var integrations = require('./routes/integrations')(app);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set("syte_settings", c.config);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index', { syteSettings: app.get('syte_settings') });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
