var jade	= require('jade'),
	fs		= require('fs'),
	path	= require('path');

var pathToData 		= path.resolve(__dirname, '../..') + '/projects.json',
	projects 		= fs.readFileSync(pathToData, 'utf8'),
	projects_json 	= JSON.parse(projects);

exports.index = function(req, res) {
	res.render('index');
}

exports.partial = function(req, res) {
	var pathToTemplate = path.resolve(__dirname, '../views/partials') + '/' + req.params.partial + '.jade',
		template = fs.readFileSync(pathToTemplate, 'utf8'),
		jadeFn = jade.compile(template, {filename: pathToTemplate, pretty: true}),
		renderedTemplate = jadeFn({projects: projects_json.projects});

	res.send(renderedTemplate);
}

exports.getJSON = function(req, res) {
	res.json(projects_json);
}