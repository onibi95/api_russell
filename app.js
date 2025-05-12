/**
 * Configuration principale de l'application Express
 * @module app
 * @requires dotenv
 * @requires express
 * @requires path
 * @requires cookie-parser
 * @requires morgan
 * @requires cors
 * @requires mongoose
 */

require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');
var reservationsRouter = require('./routes/reservations');
const { default: mongoose } = require('mongoose');

var mongodb = require('./db/mongoose');

mongodb.initClientDbConnection();

/**
 * Instance de l'application Express
 * @type {express.Application}
 */
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
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la documentation de l'API
app.get('/api-docs', (req, res) => {
    const docPath = path.join(__dirname, 'API_DOCUMENTATION.md');
    fs.readFile(docPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture de la documentation');
        }
        res.setHeader('Content-Type', 'text/markdown');
        res.send(data);
    });
});

// Routes des vues (doivent être avant les routes API)
app.use('/', indexRouter);

// Routes API
app.use('/api/catways', catwaysRouter);
app.use('/api/users', usersRouter);
app.use('/api/reservations', reservationsRouter);

/**
 * Middleware de gestion des erreurs 404
 * @param {Object} req - L'objet requête Express
 * @param {Object} res - L'objet réponse Express
 * @param {Function} next - La fonction middleware suivante
 */
app.use(function (req, res, next) {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'not-found' });
});

/**
 * Middleware de gestion des erreurs 500
 * @param {Error} err - L'erreur capturée
 * @param {Object} req - L'objet requête Express
 * @param {Object} res - L'objet réponse Express
 * @param {Function} next - La fonction middleware suivante
 */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ name: 'API', version: '1.0', status: 500, message: 'Internal Server Error' });
});

/**
 * Port sur lequel le serveur écoute
 * @type {number}
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Server Started on port ${PORT}`));

module.exports = app;
