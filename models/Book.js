'use strict';

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	author: { type: String, required: true},
	age: Number,
	timeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);