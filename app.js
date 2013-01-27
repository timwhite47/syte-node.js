
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
      var foursquare_auth = {provider: 'foursquare', accessToken:accessToken, profile: metadata}
      c.config.auth.findOneAndUpdate({provider: "foursquare"}, foursquare_auth, {upsert: true}, function (fs_auth) {
        if(!fs_auth){
          c.config.auth.create(foursquare_auth, function (e,c) {
            console.log(e,c)
          });
        }
      })
      c.config.integrations.foursquare.accessToken = accessToken;
      c.config.integrations.foursquare.profile = metadata;
    } else {
      // Theres a hacker a foot
    }
    return c.config.integrations.foursquare.profile
  })
  .callbackPath('/auth/foursquare/callback')
  .redirectPath('/')

everyauth.instagram
  .appId(c.config.integrations.instagram.client_id)
  .appSecret(c.config.integrations.instagram.client_secret)
  .getSession(function (argument) {return {}})
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, profile) {
    if (c.config.integrations.instagram.uid == profile.id) {
      var instagram_auth = {provider: 'instagram', accessToken:accessToken, profile:profile}
      c.config.auth.findOneAndUpdate({provider: "instagram"}, instagram_auth, {upsert: true}, function (ig_auth) {
        if(!ig_auth){
          c.config.auth.create(instagram_auth, function (e,c) {
            console.log(e,c)
          });
        }
      })
      
      return profile
    } else {
      // theres a hacker afoot
    }
  })
  .scope('basic')
  .redirectPath('/');

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
  res.render('index', { syteSettings: app.get('syte_settings') });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
