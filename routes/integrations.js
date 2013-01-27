var Tumblr = require('tumblr').Tumblr
  , Twitter = require('twitter')
  , GitHubApi = require("github")
  , ig = require('instagram-node').instagram({})
  , cache = require('memory-cache')
  , cache_time = (60*(60*1000))

module.exports = function (app) {
	app.get('/blog.json', function (req, res) {
	  var blog_config = app.get('syte_settings').integrations.tumblr;
	  console.log(blog_config);
	  var offset;
	  if (req.query.o) {
	  	offset = req.query.o;
	  } else {
	  	offset = 0;
	  }
	  var cache_key = 'blog/'+offset.toString();

	  if (cache.get(cache_key)) {
	  	res.json(cache.get(cache_key))
	  } else {
	  	var blog = new Tumblr(blog_config.blogUrl, blog_config.oauthCusumerKey);
	  	blog.posts({limit: 20, offset:offset}, function(error, response) {
	  	  console.log(response.posts);
	  	  blog_resp = response.posts;
	  	  cache.put(cache_key, blog_resp, cache_time);
	  	  res.json(blog_resp);
	  	});
	  }

	});

	app.get('/tweets.json', function (req, res) {
	  var cache_key = 'tweets'
	  var twitter_config = app.get('syte_settings').integrations.twitter
	  var twit = new Twitter(twitter_config.oauth);
	  twit.get('/statuses/user_timeline.json', {screen_name:twitter_config.username}, function(data) {
	  	tweets = {data: data};
	  	cache.put(cache_key, tweets, cache_time);
	      res.json(data);
	  });

	})

	app.get('/github.json', function (req, res) {
		var cache_key = 'github'
		var github_config = app.get('syte_settings').integrations.github;
		var github = new GitHubApi({version: "3.0.0"});
		
		github.user.getFrom({user: github_config.username }, function(err, user) {
		    github.repos.getFromUser({user: github_config.username }, function (err, repos) {
				github_resp = {user: user, repos: repos}
		     	res.json(github_resp);
		    });
		});

	});

	app.get('/foursquare.json', function (req, res) {
		var foursquare_config = app.get('syte_settings').integrations.foursquare
		var foursquare = require('4sq');
		console.log('in foursquare');
		config.auth.findOne({ provider: 'foursquare' }, function (err, auth) {
			console.log('foursquare_auth', auth)
			if(err) {throw err}
			if (auth) {
				var fsq = new foursquare({token: auth.accessToken});	
				fsq.checkins('self', {}, function(error, checkin_data) {
				  fsq.user('self', {}, function (error, user_data) {
				  	var foursquare_data = {checkins: checkin_data.checkins, user: user_data.user}
				  	res.json(foursquare_data);
				  })
				});
			} else {
				res.json({})
			}
		})
	})
	app.get('/instagram.json', function (req, res) {
		var cache_key = 'instagram';
		var config = app.get('syte_settings')
		var instagram_config = config.integrations.instagram
		config.auth.findOne({ provider: 'instagram' }, function (err, auth) {
			console.log('auth', auth)
			console.log(err, auth)
			if (err) {throw err};
			ig.use({ access_token: auth.accessToken });
			ig.user(instagram_config.uid, function(err, user_result, limit) {
				ig.user_media_recent(instagram_config.uid, {}, function(err, medias, pagination, limit) {
					var instagram_data = {media:medias, user: user_result}
					cache.put(cache_key, instagram_data, cache_time);
					res.json(instagram_data);
				});
			});
			
		});


	})

}