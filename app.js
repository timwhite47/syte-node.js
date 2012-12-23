
/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , everyauth = require('everyauth');


var app = express();
var c = require('./config');
var routes = require('./routes');
var integrations = require('./routes/integrations')(app);
everyauth.debug = true;
everyauth.foursquare
  .appId(c.config.integrations.foursquare.client_id)
  .appSecret(c.config.integrations.foursquare.client_secret)
  .entryPath('/auth/foursquare')
  .getSession(function (argument) {
    console.log(argument);
    return {}
  })
  .findOrCreateUser( function (session, accessToken, accessTokExtra, metadata) {
    // find or create user logic goes here
    if (metadata.id == c.config.integrations.foursquare.uid) {
      c.config.integrations.foursquare.accessToken = accessToken;
      c.config.integrations.foursquare.profile = metadata;
    } else {
      // Theres a hacker a foot
    }

    return c.config.integrations.foursquare.profile
  })
  .callbackPath('/auth/foursquare/callback')
  .redirectPath('/')

everyauth.everymodule.findUserById( function (userId, callback) {
  // Something should go here....
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(everyauth.middleware());
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set("syte_settings", c.config);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  console.log('config', c.config.integrations.foursquare)
  res.render('index', { syteSettings: app.get('syte_settings') });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
