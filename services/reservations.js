const Reservation = require('../models/reservation');

// Créer une nouvelle réservation
exports.createReservation = async (reservationData) => {
    try {
        const reservation = new Reservation(reservationData);
        return await reservation.save();
    } catch (error) {
        throw error;
    }
};

// Obtenir toutes les réservations
exports.getAllReservations = async () => {
    try {
        console.log('Début de getAllReservations');
        const reservations = await Reservation.find()
            .sort({ startDate: 1 })
            .lean();

        console.log('Réservations brutes trouvées:', reservations.length);

        // Formater les dates et s'assurer que tous les champs sont présents
        const formattedReservations = reservations.map(reservation => {
            console.log('Traitement de la réservation:', reservation._id);
            const formatted = {
                _id: reservation._id,
                catwayNumber: reservation.catwayNumber,
                clientName: reservation.clientName,
                boatName: reservation.boatName,
                startDate: new Date(reservation.startDate),
                endDate: new Date(reservation.endDate)
            };
            console.log('Réservation formatée:', formatted);
            return formatted;
        });

        console.log('Nombre de réservations formatées:', formattedReservations.length);
        return formattedReservations;
    } catch (error) {
        console.error('Erreur dans getAllReservations:', error);
        throw error;
    }
};

// Obtenir une réservation par son ID
exports.getReservationById = async (id) => {
    try {
        return await Reservation.findById(id).populate('catwayNumber');
    } catch (error) {
        throw error;
    }
};

// Mettre à jour une réservation
exports.updateReservation = async (id, updateData) => {
    try {
        return await Reservation.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('catwayNumber');
    } catch (error) {
        throw error;
    }
};

// Supprimer une réservation
exports.deleteReservation = async (id) => {
    try {
        return await Reservation.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

// Obtenir les réservations par numéro de catway
exports.getReservationsByCatway = async (catwayNumber) => {
    try {
        return await Reservation.find({ catwayNumber }).populate('catwayNumber');
    } catch (error) {
        throw error;
    }
};

// Vérifier la disponibilité d'un catway pour une période donnée
exports.checkCatwayAvailability = async (catwayNumber, startDate, endDate) => {
    try {
        const existingReservation = await Reservation.findOne({
            catwayNumber,
            $or: [
                {
                    startDate: { $lte: endDate },
                    endDate: { $gte: startDate }
                }
            ]
        });
        return !existingReservation;
    } catch (error) {
        throw error;
    }
}; 