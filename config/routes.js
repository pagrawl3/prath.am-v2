var sock 		= require('./socketLayer')

module.exports = function(app, io, spotify, mpdplay) {
	//__IMPORT ALL THE CONTROLLERS
	var	main 			= require('../app/controllers/main')

	//__Routes
	app.get('/partials/:partial', main.partial);
	app.get('/*', main.index);

}


