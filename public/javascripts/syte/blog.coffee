jQuery -> 
	class BlogView extends Backbone.View
		initialize: (opts) ->
			@model.fetch()
		render: ->
			# @model.posts.models[0]

	class BlogPostView extends Backbone.View
		tagName: "article"
		initialize:(opts) ->
			_.bindAll @
			@post = opts.model
			@render()

		render: -> 
			post = @post
			json = @post.toJSON()
			json.formated_date = @post.formated_date()
			el = @el
			$.get @post.template(), (hbs) -> 
				temp = Handlebars.compile(hbs)
				html = temp(json)
				$(el).html(html)
				offset = $(el).offset()
				offset.bottom = offset.top + $(el).height()
				post.set('offset', offset)

	class BlogPost extends Backbone.Model
		initialize: () ->

		template: () ->
			type = this.get('type')
			if (type == 'text')
			    hbs_url = '/templates/blog-post-text.html'
			else if (type == 'photo')
			    hbs_url = '/templates/blog-post-photo.html'
			else if (type == 'link')
			    hbs_url = '/templates/blog-post-link.html'
			else if (type == 'video')
			    hbs_url = '/templates/blog-post-video.html'
			else if (type == 'audio')
			    hbs_url = '/templates/blog-post-audio.html'
			else if (type == 'quote')
			    hbs_url = '/templates/blog-post-quote.html'
			
			return hbs_url

		formated_date: () ->
			return moment(this.get('date')).format('MMMM DD, YYYY')

		changeActive: (active) ->
			el = @get('view').$el
			if active
				el.find('a#date').addClass('adjusted').addClass('active')
			else
				el.find('a#date').removeClass('adjusted').removeClass('active')

	class BlogPosts extends Backbone.Collection
		initialize: ->
			this.on 'reset', (posts) ->
				el = $('section.blog-section')
				el.empty()
				_.each posts.models, (post) -> 
					el.append("<article id='"+post.id+"'></article>")
					view = new BlogPostView
				      el: el.find("article#"+post.id),
				      model: post
					post.set('view', view)
		model: BlogPost
		url: ->
			return '/blog.json'

	# Set up in the window!
	window.posts = new BlogPosts
	window.blog_view = new BlogView
		model: window.posts
		el: $('section.blog-section')

	# Setup other stuff
	adjustSelection('home')
	setupLinks()