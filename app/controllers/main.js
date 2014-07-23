var jade	= require('jade'),
	fs		= require('fs'),
	path	= require('path');

var pathToProjectData 		= path.resolve(__dirname, '../..') + '/projects.json',
	projects 				= fs.readFileSync(pathToProjectData, 'utf8'),
	projects_json 			= JSON.parse(projects);

var pathToProfileData		= path.resolve(__dirname, '../..') + '/profile.json',
	profile 				= fs.readFileSync(pathToProfileData, 'utf8'),
	profile_json 			= JSON.parse(profile);

exports.index = function(req, res) {
	res.render('index');
}

exports.cv = function(req, res) {
	var tempFile = path.resolve(__dirname, '../../assets/public/downloads') + '/cv.pdf';
	fs.readFile(tempFile, function (err,data){
		res.contentType("application/pdf");
		res.send(data);
	});
}

exports.partial = function(req, res) {
	var pathToTemplate = path.resolve(__dirname, '../views/partials') + '/' + req.params.partial + '.jade',
		template = fs.readFileSync(pathToTemplate, 'utf8'),
		jadeFn = jade.compile(template, {filename: pathToTemplate, pretty: true}),
		renderedTemplate = jadeFn({projects: projects_json.projects, profile: profile_json.profile});

	res.send(renderedTemplate);
}

exports.getJSON = function(req, res) {
	res.json(projects_json);
}