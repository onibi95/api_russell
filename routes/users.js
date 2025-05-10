var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var service = require('../services/users');
var private = require('../middlewares/private');
const User = require('../models/user');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

router.get('/:id', private.checkJWT, service.getById);
router.put('/add', service.add);
router.patch('/:id', private.checkJWT, service.update);
router.delete('/:id', private.checkJWT, service.delete);

router.post('/authenticate', service.authenticate);


router.get('/', async function (req, res, next) {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resources');
});

module.exports = router;
