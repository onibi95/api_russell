/**
 * Routes pour la gestion des utilisateurs
 * @module routes/users
 * @requires express
 * @requires mongoose
 * @requires bcrypt
 * @requires ../services/users
 * @requires ../middlewares/private
 * @requires ../models/user
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var service = require('../services/users');
var private = require('../middlewares/private');
const User = require('../models/user');

/**
 * Schéma Mongoose pour les utilisateurs
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

/**
 * Middleware de pré-sauvegarde pour hacher le mot de passe
 * @param {Function} next - Fonction de callback
 */
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

/**
 * Récupère un utilisateur par son ID
 * @route GET /api/users/:id
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @param {string} id - ID de l'utilisateur
 * @returns {Object} Utilisateur trouvé
 */
router.get('/:id', private.checkJWT, service.getById);

/**
 * Ajoute un nouvel utilisateur
 * @route POST /api/users/
 * @returns {Object} Utilisateur créé
 */
router.post('/', service.add);

/**
 * Met à jour un utilisateur existant
 * @route PATCH /api/users/:id
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @param {string} id - ID de l'utilisateur à mettre à jour
 * @returns {Object} Utilisateur mis à jour
 */
router.patch('/:id', private.checkJWT, service.update);

/**
 * Supprime un utilisateur
 * @route DELETE /api/users/:id
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @param {string} id - ID de l'utilisateur à supprimer
 * @returns {Object} Message de confirmation
 */
router.delete('/:id', private.checkJWT, service.delete);

/**
 * Authentifie un utilisateur
 * @route POST /api/users/authenticate
 * @returns {Object} Token JWT et informations utilisateur
 */
router.post('/authenticate', service.authenticate);

/**
 * Récupère tous les utilisateurs
 * @route GET /api/users
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @returns {Object[]} Liste des utilisateurs
 */
router.get('/', private.checkJWT, async (req, res) => {
  const users = await service.getAllUsers();
  res.json(users);
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resources');
});

module.exports = router;
