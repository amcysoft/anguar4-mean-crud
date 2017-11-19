'use strict';
var router = require('express').Router();

exports = module.exports = function(app) {
	router.get('/', function(req, res, next) {
		app.models.Todo.find({})
			.exec(function(err, todos) {
				if(err) next(err);
				
				res.status(200)
				.json(todos || []);
			});
	});
	router.post('/', function(req, res, next) {
		var data = {
			title: req.body.title,
			description: req.body.description,
			date: req.body.date
		};
		app.models.Todo.create(data, function(err, todo) {
			if(err) next(err);

			res.status(200).json({
				todo: todo,
				message: 'Todo has been added successfully.'
			});

		});
	});
	router.put('/:id', function(req, res, next) {
		var data = {
			title: req.body.title,
			description: req.body.description,
			date: req.body.date
		};
		app.models.Todo.findOneAndUpdate({_id: req.params.id}, data, {new: true}, function(err, todo) {
			if(err) return next(err);
			
			res.status(200).json({
				todo: todo,
				message: 'Todo has been updated successfully.'
			});

		});
	});
	router.delete('/:id', function(req, res, next) {
		app.models.Todo.findOneAndRemove({_id: req.params.id}, function(err) {
			if(err) return next(err);

			res.status(200).json({
				message: 'Todo has been deleted successfully.'
			});
		});
	});
	return router;
};