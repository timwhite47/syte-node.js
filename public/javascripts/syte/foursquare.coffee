jQuery ->
	class FoursquareView extends Backbone.View
		initialize: (opts) ->
			@foursqare_data = opts.model.models[0].toJSON()
			checkins = _.map @foursqare_data.checkins.items, (checkin) ->
				category = checkin.venue.categories[0]
				if category
					checkin.venue.venueImageURL = category.icon.prefix+'32'+category.icon.suffix
				return checkin

			template_data = 
				user: @foursqare_data.user
				checkins: @foursqare_data.checkins.items

			console.log 'new_data', template_data
			
			$.get '/templates/foursquare-profile.html', (hbs) ->
				template = Handlebars.compile(hbs)
				el = template template_data 
				adjustSelection('foursquare')
				$(el).modal().on 'hidden', () ->
				    $(el).remove()
				    adjustSelection('home')
				window.sidebar_spinner.stop()

	class Foursquare extends Backbone.Model
		initialize: () ->

	class FoursquareData extends Backbone.Collection
		initialize: () -> 
			this.on 'reset', (data) ->
				console.log 'old data', data
				view = new FoursquareView
			      el: @el,
			      model: data

		model: Foursquare
		url: () ->
			return '/foursquare.json'

	window.FoursquareData = new FoursquareData