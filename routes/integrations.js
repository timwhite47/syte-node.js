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

	  if (false) {
	  	res.json(cache.get(cache_key))
	  } else {
	  	var blog = new Tumblr(blog_config.blogUrl, blog_config.oauthCusumerKey);
	  	blog.posts({limit: 20, offset:offset}, function(error, response) {
	  	  // if (error) {throw new Error(error)};
	  	  console.log(response.posts);
	  	  blog_resp = response.posts;
	  	  cache.put(cache_key, blog_resp, cache_time);
	  	  res.json(blog_resp);
	  	});
	  }

	});

	app.get('/tweets.json', function (req, res) {
	  var cache_key = 'tweets'

	  if (cache.get(cache_key)) {
	  	res.json(cache.get(cache_key))
	  } else {
	  	var twitter_config = app.get('syte_settings').integrations.twitter
	  	var twit = new Twitter(twitter_config.oauth);
	  	twit.get('/statuses/user_timeline.json', {screen_name:twitter_config.username}, function(data) {
	  		tweets = {data: data};
	  		cache.put(cache_key, tweets, cache_time);
	  	    res.json(tweets);
	  	});
	  }

	})

	app.get('/github.json', function (req, res) {
		var cache_key = 'github'
		if (cache.get(cache_key)) {
			res.json(cache.get(cache_key))
		} else {
			var github_config = app.get('syte_settings').integrations.github;
			var github = new GitHubApi({version: "3.0.0"});
			
			github.user.getFrom({user: github_config.username }, function(err, user) {
			    github.repos.getFromUser({user: github_config.username }, function (err, repos) {
					github_resp = {user: user, repos: repos}

					cache.put(cache_key, github_resp, cache_time);
			     	res.json(github_resp);
			    });
			});
		}

	});

	app.get('/foursquare.json', function (req, res) {
		var cache_key = 'foursquare';
		if (cache.get(cache_key)) {
			res.json(cache.get(cache_key))
		} else {
			var foursquare_config = app.get('syte_settings').integrations.foursquare
			if (foursquare_config.accessToken) {
				var foursquare = require('4sq');
				var fsq = new foursquare({token: foursquare_config.accessToken});	
				
				fsq.checkins('self', {}, function(error, checkin_data) {
				  fsq.user('self', {}, function (error, user_data) {
				  	var foursquare_data = {checkins: checkin_data.checkins, user: user_data.user, }
				  	cache.put(cache_key, foursquare_data, cache_time);
				  	res.json(foursquare_data);
				  })
				});
			} else {
				res.json({});
			}
		}
		


	})
	app.get('/instagram.json', function (req, res) {
		var cache_key = 'instagram';
		if (cache.get(cache_key)) {
			res.json(cache.get(cache_key))
		} else {
			var instagram_config = app.get('syte_settings').integrations.instagram
			ig.use({ access_token: instagram_config.accessToken });
			// ig.use({ client_id: instagram_config.client_id, client_secret: instagram_config.client_secret });
			ig.user(instagram_config.uid, function(err, user_result, limit) {
				ig.user_media_recent(instagram_config.uid, {}, function(err, medias, pagination, limit) {
					var instagram_data = {media:medias, user: user_result}
					cache.put(cache_key, instagram_data, cache_time);
					res.json(instagram_data);
				});
			});
		}

	})

}