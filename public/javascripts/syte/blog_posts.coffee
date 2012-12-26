jQuery -> 
	class BlogView extends Backbone.View
		initialize: (opts) ->
			console.log opts
			console.log(@model)
			@model.fetch()
		render: ->
			# HB

	class BlogPostView extends Backbone.View
		tagName: "article"
		initialize:(opts) ->
			console.log('fooobar')
			_.bindAll @
			@post = opts.model
			$(@el).empty()
			@render()

		render: -> 
			json = @post.toJSON()
			json.formated_date = @post.formated_date()
			el = @el
			console.log el
			$.get @post.template(), (hbs) -> 
				temp = Handlebars.compile(hbs)
				html = temp(json)
				$(el).append(html)

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

	class BlogPosts extends Backbone.Collection
		initialize: ->
			this.on 'reset', (posts) ->
				console.log('posts', posts)
				_.each posts.models, (post) -> 
					new BlogPostView({
				      el: $('section.blog-section'),
				      model: post
				    })
		model: BlogPost
		url: ->
			return '/blog.json'

	window.posts = new BlogPosts
	params = 
		model: window.posts
		el: $('section.blog-section')

	window.blog_view = new BlogView params