'use strict';

//var Note = require('../models/Note');
var Book = require('../models/Book');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json()); 

  router.get('/books', eatAuth, function(req, res) {
    Book.find({authorId: req.user._id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.post('/books', eatAuth, function(req, res) {
    var newBook = new Book(req.body); 
    newBook.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.put('/books/:id', eatAuth, function(req, res) {
    var updatedBook = req.body;
    delete updatedBook._id;

    Book.update({'_id': req.params.id}, updatedBook, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'success'}); 
    });
  });

  router.delete('/books/:id', eatAuth, function(req, res) {
    Book.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'success'});
    });
  });
};
