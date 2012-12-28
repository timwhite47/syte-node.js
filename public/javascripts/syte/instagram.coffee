jQuery ->
	class InstagramView extends Backbone.View
		initialize: (opts) ->
			@instagram_data = opts.model.models[0].toJSON()
			template_data = @instagram_data
			console.log '@instagram_data', @instagram_data

			$.get '/templates/instagram-view.html', (hbs) ->
				template = Handlebars.compile(hbs)
				el = template template_data 
				adjustSelection('instagram')
				$(el).modal().on 'hidden', () ->
				    $(el).remove()
				    adjustSelection('home')
				window.sidebar_spinner.stop()

	class Instagram extends Backbone.Model
		initialize: () ->

	class InstagramData extends Backbone.Collection
		initialize: () -> 
			console.log 'setting up Instagram'
			this.on 'reset', (data) ->
				view = new InstagramView
			      el: @el,
			      model: data

		model: Instagram
		url: () ->
			return '/instagram.json'

	window.InstagramData = new InstagramData