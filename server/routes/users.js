'use strict';
var router = require('express').Router();
var passport = require('passport');

exports = module.exports = function(app) {
	router.get('/', function(req, res, next) {
		// Get all the users
		app.models.User.find({})
			.select('first_name last_name username email')
			.exec(function(err, users) {
				if(err) next(err);
				
				res.status(200)
				.json(users || []);
			});
	});
	router.post('/', registerUser('User has been added successfully.'));
	router.put('/:id', function(req, res, next) {
		if(!req.body.first_name) {
			var err = new Error("First name is required.");
			err.status = 400;
			next(err);
		}
		if(!req.body.last_name) {
			var err = new Error("Last name is required.");
			err.status = 400;
			next(err);
		}
		var data = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			email: req.body.email
		};
		app.models.User.findOneAndUpdate({_id: req.params.id}, data, {new: true}, function(err, user) {

			if(err) {
				if(err.code && err.code === 11000) {
					var err = new Error("A user with the given username is already registered.");
				}
				err.status = 400;
				next(err);
			} else {

				var u = {
					_id: user._id,
					first_name: user.first_name,
					last_name: user.last_name,
					username: user.username,
					email: user.email
				};
				if(user && req.body.password) {
					user.setPassword(req.body.password, function(err) {
						if(err) next(err);

			            user.save();
			            res.status(200).json({
			            	user: u,
							message: 'User has been updated successfully'
						});
			        });
				} else {
					res.status(200).json({
						user: u,
						message: 'User has been updated successfully.'
					});
				}
			}

		});
	});
	router.delete('/:id', function(req, res, next) {
		app.models.User.findOneAndRemove({_id: req.params.id}, function(err) {
			if(err) return next(err);

			res.status(200).json({
				message: 'User has been deleted successfully.'
			});
		});
	});

	router.post('/login', function (req, res, next) {
		passport.authenticate('local', function (err, user, info) {

			if (err) return next(err);
			if (!user) {
				err = new Error(info.message || info);
				err.status = 400;
				return next(err);
			}

			req.logIn(user, function (err) {
				if (err) return next(err);

				var token = app.Auth.getToken({ "_id": user._id });
				res.status(200).json({
					status: 'Login successful!',
					success: true,
					full_name: user.full_name,
					username: user.username,
					email: user.email,
					token: token
				});
			});

		})(req, res, next);
	});
	router.post('/register', registerUser('User has been added successfully.'));

	router.get('/google', passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/plus.profile.emails.read'
		]
	}), function (req, res) { });

	router.get('/google/callback', function (req, res, next) {
		passport.authenticate('google', function (err, user, info) {

			if (err) return next(err);
			if (!user) {
				return res.redirect('/api/users/google');
			}

			req.logIn(user, function (err) {
				if (err) return next(err);

				var token = app.Auth.getToken({ "_id": user._id });
				var resp = {
					status: 'Login successful!',
					success: true,
					full_name: user.full_name,
					username: user.username,
					email: user.email,
					token: token
				};
				var html = `
					<script>
						window.onload = function() {
							console.log(this.opener);
							this.opener.postMessage(`+ JSON.stringify(resp) +`, 'http://localhost:4200');
							window.close();
						};
					</script>`;
				return res.status(200).send(html);
			});

		})(req, res, next);
	});

	function registerUser(message) {
		return function(req, res, next) {
			console.log(req.body);
			if (!req.body.first_name) {
				var err = new Error("First name is required.");
				err.status = 400;
				next(err);
			}
			if (!req.body.last_name) {
				var err = new Error("Last name is required.");
				err.status = 400;
				next(err);
			}
			app.models.User.register(new app.models.User({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				username: req.body.username,
				email: req.body.email
			}), req.body.password, function (err, user) {

				if (err) {
					if (err.code && err.code === 11000) {
						var err = new Error("A user with the given username is already registered.");
					}
					err.status = 400;
					next(err);
				} else {
					user.save(function (err, user) {
						if (err) next(err);

						var u = {
							_id: user._id,
							first_name: user.first_name,
							last_name: user.last_name,
							username: user.username,
							email: user.email
						};
						res.status(200).json({
							user: u,
							message: message
						});
					});
				}
			});
		};
	}
	return router;
};