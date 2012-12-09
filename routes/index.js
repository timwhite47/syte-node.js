
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(app)
	res.render('index', { title: 'Express' });
};