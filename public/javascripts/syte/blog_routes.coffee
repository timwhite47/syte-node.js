jQuery ->

	class BlogRouter extends Backbone.Router
		initialize: ->
			this.route('post/:post_id', "post")
			this.route('', "index")

		post: (post_id) ->
			console.log('post :)', post_id)
			post = window.posts.get(post_id)
			$('section.blog-section').empty()
			window.posts.renderPost(post)

		index: ->
			console.log('at index')
			window.posts.fetch()

	window.blogRoutes = new BlogRouter

	Backbone.history.start({pushState: true})
	
	$("a.blog_post_link'").live "click", (event) -> 
		post_id = $(this).data('post-id')
		window.blogRoutes.navigate('post/'+post_id, {trigger: true})
		return false

