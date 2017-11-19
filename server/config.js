'use strict';

var config = {
	'secretKey': process.env.SecretKey || '12345-67890-98765-43210',
	'mongoURL': process.env.A4MC_MongoURL || 'YOUR_MONGO_URL',
	'google': {
		clientID: process.env.A4MC_GoogleClient || 'YOUR_GOOGLE_CLIENT_ID',
		clientSecret: process.env.A4MC_GoogleSecret || 'YOUR_GOOGLE_SECRET_KEY',
		callbackURL: process.env.A4MC_GoogleCallback || 'YOUR_GOOGLE_API_CALLBACK_URL'
	},
};
exports = module.exports = function(app) {
	app.config = config;
};

exports.config = config;