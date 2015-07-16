'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/books_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Book = require('../models/Book');

describe('my books REST api tests', function(){
	after(function(done){
		mongoose.connection.db.dropDatabase(function(){
			done();
		});
	});

	it('get all books', function(done){
		chai.request('localhost:3000')
		.get('/api/books')
		.end(function(err, res){
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			expect(Array.isArray(res.body)).to.eql(true);

			done();
		});
	});

	describe('test functionalities of the objects. Need to have an existing book to work with', function(){
		beforeEach(function(done){
			var testBook = new Book({author: 'Mr. Nathan R', age: 43});
			testBook.save(function(err, data){
				if(err) throw err;

				this.testBook = data;
				done();
			}.bind(this));
		});

		it('should be able to create a book in a beforeEach block', function(){
			expect(this.testBook.author).to.eql('Mr. Nathan R');
			expect(this.testBook.age).to.eql(43);
			expect(this.testBook).to.have.property('_id');
		});

		it('should update a boook', function(done){
			var id = this.testBook._id;
			chai.request('localhost:3000')
			.put('/api/books/' + id)
			.send({author: 'Mr. Dave G'})
			.end(function(err, res){
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('success');
				done();
			});
		});

		it('should be able to delete a book', function(done){
			chai.request('localhost:3000')
			.del('/api/books/' + this.testBook._id)
			.end(function(err, res){
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('success');
				done();
			});
		});
	});
});