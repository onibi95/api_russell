const Catway = require('../models/catway');

exports.getAll = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des catways' });
    }
};

exports.getById = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).json({ error: 'Catway non trouvé' });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du catway' });
    }
};

exports.create = async (req, res) => {
    try {
        const catway = new Catway(req.body);
        await catway.save();
        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du catway' });
    }
};

exports.update = async (req, res) => {
    try {
        const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!catway) return res.status(404).json({ error: 'Catway non trouvé' });
        res.json(catway);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour du catway' });
    }
};

exports.delete = async (req, res) => {
    try {
        const catway = await Catway.findByIdAndDelete(req.params.id);
        if (!catway) return res.status(404).json({ error: 'Catway non trouvé' });
        res.json({ message: 'Catway supprimé' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression du catway' });
    }
}; 