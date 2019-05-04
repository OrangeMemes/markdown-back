var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient    = require('mongodb').MongoClient;

var documentsRouter = require('./routes/documents');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        throw err;
    }
    app.locals.collection = db.db().collection("documents");
});

app.use('/documents', documentsRouter);
module.exports = app;
