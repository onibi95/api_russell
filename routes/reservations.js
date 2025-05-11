const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservations');

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtenir toutes les réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtenir une réservation par son ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour une réservation
router.put('/:id', async (req, res) => {
    try {
        const reservation = await reservationService.updateReservation(req.params.id, req.body);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await reservationService.deleteReservation(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtenir les réservations par numéro de catway
router.get('/catway/:catwayNumber', async (req, res) => {
    try {
        const reservations = await reservationService.getReservationsByCatway(req.params.catwayNumber);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Vérifier la disponibilité d'un catway
router.get('/availability/:catwayNumber', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Les dates de début et de fin sont requises' });
        }
        const isAvailable = await reservationService.checkCatwayAvailability(
            req.params.catwayNumber,
            new Date(startDate),
            new Date(endDate)
        );
        res.json({ available: isAvailable });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 