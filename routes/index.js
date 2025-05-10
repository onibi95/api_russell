var express = require('express');
var router = express.Router();
const { checkJWT } = require('../middlewares/private');

const userRoute = require('../routes/users');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Accueil',
    apiName: process.env.Mon_Api || 'API Russell'
  });
});

// Route dashboard (sans checkJWT)
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Route catways (vue)
router.get('/catways', (req, res) => {
  res.render('catways');
});

router.use('/users', userRoute);

module.exports = router;
