const express = require('express');
const router = express.Router();
const catwayService = require('../services/catways');
const private = require('../middlewares/private');

// CRUD routes
router.get('/', private.checkJWT, async (req, res) => {
    try {
        const catways = await catwayService.getAll();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des catways' });
    }
});

router.get('/:id', private.checkJWT, catwayService.getById);
router.post('/', private.checkJWT, catwayService.create);
router.patch('/:id', private.checkJWT, catwayService.update);
router.delete('/:id', private.checkJWT, catwayService.delete);

module.exports = router; 