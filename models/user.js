var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var User = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },

    firstname: {
        type: String,
        trim: true,
        required: [true, 'Le prénom est requis']
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'L\'email est requis'],
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        trim: true
    },

    created_at: {
        type: Date, default:
            Date.now
    },

    updated_at: {
        type: Date, default:
            Date.now
    }
});

User.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', User);