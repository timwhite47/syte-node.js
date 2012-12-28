jQuery ->
	class TwitterView extends Backbone.View
		initialize: (opts) ->
			@tweets = opts.model
			_.each @tweets.models, (tweet) ->
				tweet.set('formated_date', moment(tweet.get('created_at')).fromNow())

			user = @tweets.models[0].get('user')
			tweets = _.map @tweets.models, (tweet) ->
				tweet.toJSON()

			template_data =
				user: user
				tweets: tweets

			$.get '/templates/twitter-view.html', (hbs) ->
				template = Handlebars.compile(hbs)
				el = template template_data
				adjustSelection('twitter');
				$(el).modal().on 'hidden', () ->
				    $(el).remove()
				    adjustSelection('home')

	class Tweet extends Backbone.Model
		initialize: () ->

	class Tweets extends Backbone.Collection
		initialize: () -> 
			this.on 'reset', (tweets) ->
				view = new TwitterView
			      el: @el,
			      model: tweets

		model: Tweet
		url: () ->
			return '/tweets.json'

	window.Tweets = new Tweets