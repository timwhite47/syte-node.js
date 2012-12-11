var Tumblr = require('tumblr').Tumblr
  , Twitter = require('twitter')
  , GitHubApi = require("github");

module.exports = function (app) {
	app.get('/blog.json', function (req, res) {
	  var blog_config = app.get('syte_settings').integrations.tumblr;
	  console.log(blog_config);
	  var blog = new Tumblr(blog_config.blogUrl, blog_config.oauthCusumerKey);
	  blog.posts({limit: 20, offset:req.query.o}, function(error, response) {
	    if (error) {throw new Error(error)};
	    res.json({response:response});
	  });
	});

	app.get('/tweets', function (req, res) {
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
}