const File = require('../models/file');

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été uploadé' });
        }

        const file = new File({
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            description: req.body.description,
            userId: req.body.userId
        });

        await file.save();
        res.status(201).json({
            message: 'Fichier uploadé avec succès',
            file: file
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'upload', error: error.message });
    }
};

exports.getFiles = async (req, res) => {
    try {
        const files = await File.find({ userId: req.params.userId });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des fichiers', error: error.message });
    }
};