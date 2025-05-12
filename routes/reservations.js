/**
 * Routes pour la gestion des réservations
 * @module routes/reservations
 * @requires express
 * @requires ../services/reservations
 */

const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservations');

/**
 * Crée une nouvelle réservation
 * @route POST /api/reservations
 * @param {Object} req.body - Données de la réservation
 * @returns {Object} 201 - Réservation créée
 * @returns {Object} 400 - Erreur de validation
 */
router.post('/', async (req, res) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * Récupère toutes les réservations
 * @route GET /api/reservations
 * @returns {Object[]} 200 - Liste des réservations
 * @returns {Object} 500 - Erreur serveur
 */
router.get('/', async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Récupère une réservation par son ID
 * @route GET /api/reservations/:id
 * @param {string} id - ID de la réservation
 * @returns {Object} 200 - Réservation trouvée
 * @returns {Object} 404 - Réservation non trouvée
 * @returns {Object} 500 - Erreur serveur
 */
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

/**
 * Met à jour une réservation existante
 * @route PUT /api/reservations/:id
 * @param {string} id - ID de la réservation
 * @param {Object} req.body - Nouvelles données de la réservation
 * @returns {Object} 200 - Réservation mise à jour
 * @returns {Object} 404 - Réservation non trouvée
 * @returns {Object} 400 - Erreur de validation
 */
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

/**
 * Supprime une réservation
 * @route DELETE /api/reservations/:id
 * @param {string} id - ID de la réservation
 * @returns {Object} 200 - Message de confirmation
 * @returns {Object} 404 - Réservation non trouvée
 * @returns {Object} 500 - Erreur serveur
 */
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

/**
 * Récupère les réservations par numéro de catway
 * @route GET /api/reservations/catway/:catwayNumber
 * @param {string} catwayNumber - Numéro du catway
 * @returns {Object[]} 200 - Liste des réservations pour le catway
 * @returns {Object} 500 - Erreur serveur
 */
router.get('/catway/:catwayNumber', async (req, res) => {
    try {
        const reservations = await reservationService.getReservationsByCatway(req.params.catwayNumber);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Vérifie la disponibilité d'un catway pour une période donnée
 * @route GET /api/reservations/availability/:catwayNumber
 * @param {string} catwayNumber - Numéro du catway
 * @param {string} startDate - Date de début (query parameter)
 * @param {string} endDate - Date de fin (query parameter)
 * @returns {Object} 200 - Statut de disponibilité
 * @returns {Object} 400 - Dates manquantes
 * @returns {Object} 500 - Erreur serveur
 */
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