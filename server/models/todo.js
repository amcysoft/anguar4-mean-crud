var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		date: {
			type: Date,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Todo', Todo);