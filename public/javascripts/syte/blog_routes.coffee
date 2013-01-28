jQuery ->

	class BlogRouter extends Backbone.Router
		initialize: ->
			this.route('post/:post_id', "post")
			this.route('', "index")

		post: (post_id) ->
			post = window.posts.get(post_id)
			$('section.blog-section').empty()
			window.posts.renderPost(post)

		index: ->
			console.log('at index')

	window.blogRoutes = new BlogRouter

	Backbone.history.start({pushState: true})