var jade = require('jade');

exports.index = function(req, res) {
	res.render('index');
}

exports.partial = function(req, res) {
	var pathToTemplate = require('path').resolve(__dirname, '../views/partials') + '/' + req.params.partial + '.jade';
	var template = require('fs').readFileSync(pathToTemplate, 'utf8');
	var jadeFn = jade.compile(template, {filename: pathToTemplate, pretty: true});
	var renderedTemplate = jadeFn();
	console.log(renderedTemplate);
	res.send(renderedTemplate);
}