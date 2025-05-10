const express = require('express');
const router = express.Router();
const catwayService = require('../services/catways');
const private = require('../middlewares/private');

// CRUD routes
router.get('/', private.checkJWT, catwayService.getAll);
router.get('/:id', private.checkJWT, catwayService.getById);
router.post('/', private.checkJWT, catwayService.create);
router.patch('/:id', private.checkJWT, catwayService.update);
router.delete('/:id', private.checkJWT, catwayService.delete);

module.exports = router; 