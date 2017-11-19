'use strict';
var fs = require('fs');

exports = module.exports = function(app) {
	// Start: Initialze basic configuration for project
	require('./config')(app);
	// Start: Initialze basic configuration for project

	// Start: Connection to the Database
	require('./connection')(app);
	// End: Connection to the Database
	
	app.Auth = require('./auth')(app);
	
	app.models = {};
	// Start: Autoload all the models in models folder
	fs.readdirSync(__dirname + '/models').forEach(file => {
		var f = file.replace('.js', '');
		if(f != 'models') {
			var cap = f.charAt(0).toUpperCase() + f.slice(1);
			app.models[cap] = require('./models/'+f);
		}
	});
	// End: Autoload all the models in models folder

	// Start: Autoload all the server API routes
	fs.readdirSync(__dirname + '/routes').forEach(file => {
		var f = file.replace('.js', '');
		if(f != 'router') {
			app.use('/api/'+f, require('./routes/'+f)(app));
		}
	});
	// End: Autoload all the server API routes
};