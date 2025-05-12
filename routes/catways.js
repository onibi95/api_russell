/**
 * Routes pour la gestion des catways
 * @module routes/catways
 * @requires express
 * @requires ../services/catways
 * @requires ../middlewares/private
 */

const express = require('express');
const router = express.Router();
const catwayService = require('../services/catways');
const private = require('../middlewares/private');

/**
 * Récupère tous les catways
 * @route GET /api/catways
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @returns {Object[]} Liste des catways
 * @throws {Error} 500 - Erreur serveur
 */
router.get('/', private.checkJWT, async (req, res) => {
    try {
        const catways = await catwayService.getAll();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des catways' });
    }
});

/**
 * Récupère un catway par son ID
 * @route GET /api/catways/:id
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @param {string} id - ID du catway
 * @returns {Object} Catway trouvé
 */
router.get('/:id', private.checkJWT, catwayService.getById);

/**
 * Crée un nouveau catway
 * @route POST /api/catways
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @returns {Object} Catway créé
 */
router.post('/', private.checkJWT, catwayService.create);

/**
 * Met à jour un catway existant
 * @route PATCH /api/catways/:id
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @param {string} id - ID du catway à mettre à jour
 * @returns {Object} Catway mis à jour
 */
router.patch('/:id', private.checkJWT, catwayService.update);

/**
 * Supprime un catway
 * @route DELETE /api/catways/:id
 * @middleware {Function} private.checkJWT - Vérifie l'authentification
 * @param {string} id - ID du catway à supprimer
 * @returns {Object} Message de confirmation
 */
router.delete('/:id', private.checkJWT, catwayService.delete);

module.exports = router; 