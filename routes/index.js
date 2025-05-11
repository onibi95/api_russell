var express = require('express');
var router = express.Router();
const { checkJWT } = require('../middlewares/private');
const userRoute = require('./users');
const catwayService = require('../services/catways');
const reservationService = require('../services/reservations');
const userService = require('../services/users');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Accueil',
    apiName: process.env.Mon_Api || 'API Russell'
  });
});

// Route dashboard (avec checkJWT)
router.get('/dashboard', checkJWT, async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    console.log('Réservations pour le dashboard:', JSON.stringify(reservations, null, 2));
    res.render('dashboard', {
      title: 'Tableau de Bord',
      user: req.user,
      reservations: reservations || []
    });
  } catch (error) {
    console.error('Erreur lors du chargement du dashboard:', error);
    // En cas d'erreur, on renvoie quand même le dashboard avec un tableau vide
    res.render('dashboard', {
      title: 'Tableau de Bord',
      user: req.user,
      reservations: []
    });
  }
});

// Route catways (vue)
router.get('/catways', checkJWT, async (req, res) => {
  try {
    const catways = await catwayService.getAll();
    res.render('catways', {
      title: 'Gestion des Catways',
      user: req.user,
      catways: catways || []
    });
  } catch (error) {
    console.error('Erreur lors du chargement des catways:', error);
    res.render('catways', {
      title: 'Gestion des Catways',
      user: req.user,
      catways: []
    });
  }
});

// Route reservations (vue)
router.get('/reservations', checkJWT, async (req, res) => {
  try {
    console.log('Début de la route /reservations');
    const catways = await catwayService.getAll();
    console.log('Catways récupérés:', JSON.stringify(catways, null, 2));

    const reservations = await reservationService.getAllReservations();
    console.log('Réservations récupérées:', JSON.stringify(reservations, null, 2));

    const viewData = {
      title: 'Gestion des Réservations',
      user: req.user,
      catways: catways || [],
      reservations: reservations || []
    };
    console.log('Données envoyées à la vue:', JSON.stringify(viewData, null, 2));

    res.render('reservations', viewData);
  } catch (error) {
    console.error('Erreur lors du chargement des réservations:', error);
    res.render('reservations', {
      title: 'Gestion des Réservations',
      user: req.user,
      catways: [],
      reservations: []
    });
  }
});

// Route users (vue)
router.get('/users', checkJWT, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.render('users', {
      title: 'Gestion des Utilisateurs',
      user: req.user,
      users: users || []
    });
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error);
    res.render('users', {
      title: 'Gestion des Utilisateurs',
      user: req.user,
      users: []
    });
  }
});

// Route de déconnexion
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// Route documentation API
router.get('/api-docs', (req, res) => {
  res.redirect('/api-docs/index.html');
});

router.use('/users', userRoute);

module.exports = router;
