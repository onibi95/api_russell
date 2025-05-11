require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');
var reservationsRouter = require('./routes/reservations');
const { default: mongoose } = require('mongoose');

var mongodb = require('./db/mongoose');

mongodb.initClientDbConnection();

var app = express();

// Configuration des vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares de base
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuration CORS
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*',
    credentials: true
}));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes des vues (doivent être avant les routes API)
app.use('/', indexRouter);

// Routes API
app.use('/api/catways', catwaysRouter);
app.use('/api/users', usersRouter);
app.use('/api/reservations', reservationsRouter);

// Gestion des erreurs 404
app.use(function (req, res, next) {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'not-found' });
});

// Gestion des erreurs 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ name: 'API', version: '1.0', status: 500, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

module.exports = app;
