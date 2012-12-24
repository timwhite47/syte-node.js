var Tumblr = require('tumblr').Tumblr
  , Twitter = require('twitter')
  , GitHubApi = require("github")
  , ig = require('instagram-node').instagram({});

module.exports = function (app) {
	app.get('/blog.json', function (req, res) {
	  var blog_config = app.get('syte_settings').integrations.tumblr;
	  console.log(blog_config);
	  var blog = new Tumblr(blog_config.blogUrl, blog_config.oauthCusumerKey);
	  blog.posts({limit: 20, offset:req.query.o}, function(error, response) {
	    // if (error) {throw new Error(error)};
	    res.json({response:response});
	  });
	});

	app.get('/tweets.json', function (req, res) {
	  var twitter_config = app.get('syte_settings').integrations.twitter
	  var twit = new Twitter(twitter_config.oauth);

	  twit.get('/statuses/user_timeline.json', {screen_name:twitter_config.username}, function(data) {
	      res.json({data: data})
	  });
	})

	app.get('/github.json', function (req, res) {
	  var github_config = app.get('syte_settings').integrations.github;
	  var github = new GitHubApi({version: "3.0.0"});
	  
	  github.user.getFrom({user: github_config.username }, function(err, user) {
	      github.repos.getFromUser({user: github_config.username }, function (err, repos) {
	        res.json({user: user, repos: repos});
	      });
	  });
	});

	app.get('/foursquare.json', function (req, res) {
		console.log('current_user = ', req.user)
		var foursquare_config = app.get('syte_settings').integrations.foursquare
		
		if (foursquare_config.accessToken) {
			var foursquare = require('4sq');
			var fsq = new foursquare({token: foursquare_config.accessToken});	
			fsq.checkins('self', {}, function(error, checkin_data) {
			  fsq.user('self', {}, function (error, user_data) {
			  	console.log('checkins', checkin_data, user_data)
			  	res.json({checkins: checkin_data.checkins, user: user_data.user, });
			  })
			});
		} else {
			res.json({});
		}

	})
	app.get('/instagram.json', function (req, res) {
		var instagram_config = app.get('syte_settings').integrations.instagram
		ig.use({ access_token: instagram_config.accessToken });
		// ig.use({ client_id: instagram_config.client_id, client_secret: instagram_config.client_secret });
		ig.user(instagram_config.uid, function(err, user_result, limit) {
			ig.user_media_recent(instagram_config.uid, {}, function(err, medias, pagination, limit) {
				console.log(err, medias, pagination, limit);
				res.json({media:medias, user: user_result});
			});
		});

	})

}