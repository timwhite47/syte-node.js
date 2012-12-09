
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Tumblr = require('tumblr').Tumblr
  , twitter = require('twitter');

var app = express();

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
  app.set("syte_settings", {
    email: "your_email@somewhere.com", 
    name: "John Doe",
    rss: {
      enabled: false,
      feedUrl: "RSS_FEED_URL"
    },
    sidebarBlurb: "This is your syte!",
    syteTitle: "Syte for Node.js",
    usernames: {
      twitter: "twitter_handle", 
      github: "github_handle",
      instagram: "instagram_handle",
      last_fm: "last_fm_handle",
      foursquare: "foursquare_handle",
      tent_io: "tent_io_url",
      soundcloud: "soundcloud_handle",  
      bitbucket: "bitbucket_handle"
    }, 
    integrations: {
      twitter: {
        enabled: true,
        username: "tenacioustimi"
      },
      disqus: {
        enabled: false,
        shortName: "DISQUS_SHORTNAME"
      },  
      tumblr: {
        enabled: true,
        blogUrl: 'blog.tumblr.com',
        oauthCusumerKey: "TUMBLR_OAUTH_KEY",
      },
      github: true,
      instagram: true,
      last_fm: true,
      foursquare: true,
      tentio: {
        enabled: true, 
        entity_uri: "TENT_ENTITY_URI", 
        feed_url: "TENT_FEED_URL"
      },
      dribble: false,
      soundcloud: true,
      bitbucket:true, 
      woopra: {
        enabled: false, 
        trackingDomain: "WOOPRA_TRACKING_DOMAIN",
        idleTimeout: 30,
        includeQuery: false
      },
      googleAnalytics: {
        enabled: true,
        trackingId: "GOOGLE_ANALYTICS_TRACKING_ID" 
      }
    },
    seo: {
      description: "This is a syte site in Node.js",
      keywords: ['these', 'are', 'your', 'keywords'].join()
    },
    hostName: "your-domain-name.com"
  })
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index', { syteSettings: app.get('syte_settings') });
});

app.get('/blog.json', function (req, res) {
  var blog_config = app.get('syte_settings').integrations.tumblr
  var blog = new Tumblr(blog_config.blogUrl, blog_config.oauthCusumerKey);
  console.log('query o', req.query.o)
  blog.posts({limit: 20, offset:req.query.o}, function(error, response) {
    if (error) {
      throw new Error(error);
    }
    res.json({response:response})
  });
});

app.get('/tweets', function (req, res) {
  var twitter_config = app.get('syte_settings').integrations.twitter
  var twit = new twitter({
      consumer_key: 'consumer_key',
      consumer_secret: 'consumer_secret',
      access_token_key: 'access_token_key',
      access_token_secret: 'access_token_secret'
  });
  twit.get('/statuses/user_timeline.json', {screen_name:twitter_config.username}, function(data) {
      res.json({data: data})
  });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
