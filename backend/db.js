const mongoose = require('mongoose'),
      dbURL    = 'mongodb+srv://robert:test@cluster0-dphmn.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(dbURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));