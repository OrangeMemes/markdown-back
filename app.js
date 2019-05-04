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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        throw err;
    }
    app.locals.collection = db.db().collection("documents");
});

app.use('/documents', documentsRouter);
module.exports = app;
