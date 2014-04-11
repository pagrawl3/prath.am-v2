var express = require('express'),
	path 		= require('path'),
	rootPath	= path.normalize(__dirname + '/..');

module.exports = function (app) {

	app.set('showStackError', true)
	//Setup the public serving directory
	app.use(express.static(rootPath + '/assets/public'))
	//Set the view templating engine and the views directory
	app.set('views', rootPath + '/app/views')
	app.set('view engine', 'jade')

	//Default app configurations
	app.configure(function() {
		//bodyParser
		app.use(express.bodyParser())
		app.use(express.methodOverride())
		//Use the router
		app.use(app.router)
	})
}