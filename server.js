// Imports express into our app and sets it up for use
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Defines a PORT for the server to listen for requests
const PORT = 8080;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets our server to use the public directory for static assets
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://admin:password1@ds121163.mlab.com:21163/todolistdb',{ useNewUrlParser: true});
 //var MONGOD_URI = process.env.MONGOD_URI || "mongoddb://localhost/mongoHeadlines";
 // mongoose.connect(MONGODB_URI);
// Routes
// -----------------

require('./public/routes/api-routes')(app);
require('./public/routes/html-routes')(app);

// Starts our server on the predefined PORT
app.listen(PORT, function(){
  console.log(`App is now listening on PORT ${PORT}`)
})