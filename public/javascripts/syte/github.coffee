jQuery ->
	class GithubView extends Backbone.View
		initialize: (opts) ->
			@git_data = opts.model.models[0].toJSON()
			template_data = @git_data 
			$.get '/templates/github-profile.html', (hbs) ->
				template = Handlebars.compile(hbs)
				el = template template_data 
				adjustSelection('github')
				$(el).modal().on 'hidden', () ->
				    $(el).remove()
				    adjustSelection('home')
				
				window.sidebar_spinner.stop()

	class Github extends Backbone.Model
		initialize: () ->

	class GithubData extends Backbone.Collection
		initialize: () -> 
			this.on 'reset', (data) ->
				view = new GithubView
			      el: @el,
			      model: data

		model: Github
		url: () ->
			return '/github.json'

	window.GithubData = new GithubData