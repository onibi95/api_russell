const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const fileService = require('../services/files');
const { checkJWT } = require('../middlewares/private');

// Route pour afficher la page des fichiers
router.get('/', (req, res) => {
    res.render('files');
});

// Route protégée pour l'upload de fichiers
router.post('/', checkJWT, upload.single('upload_file'), fileService.uploadFile);

// Route protégée pour récupérer les fichiers d'un utilisateur
router.get('/:userId', checkJWT, fileService.getFiles);

module.exports = router;