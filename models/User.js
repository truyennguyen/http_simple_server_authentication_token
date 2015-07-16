'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  username: String,
  basic: {
    email: { type: String, unique: true},
    password: String
  }
});

userSchema.methods.generateHash = function(password, callback) {
	bcrypt.hash(password, null, null, function(err, hash){
		if(err) return callback(err);
		callback(null, hash);
	});
};

userSchema.methods.checkPassword = function(password, callback) {
	bcrypt.compare(password, this.basic.password, function(err, res){
		if(err) return callback(err);
		callback(null, res);
	});
};

userSchema.methods.generateToken = function(secret, callback) {
	eat.encode({id: this._id}, secret, callback);
};

module.exports = mongoose.model('User', userSchema);