'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangetis!';

var booksRoutes = express.Router();
var usersRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/books_test');

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/books_routes')(booksRoutes);
require('./routes/auth_routes')(usersRoutes, passport);

app.use('/api', booksRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
