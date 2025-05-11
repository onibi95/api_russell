var jwt = require('jsonwebtoken');
var SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    console.log('ROUTE:', req.originalUrl);
    console.log('HEADERS RECUS:', req.headers);

    // Vérifier le token dans les en-têtes ou les cookies
    let token = req.headers['x-access-token'] ||
        req.get('Authorization') ||
        req.cookies.token;

    console.log('TOKEN RECUPERE:', token);

    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    if (!token) {
        // Si c'est une requête API, renvoyer une erreur JSON
        if (req.xhr || req.headers.accept.includes('application/json')) {
            return res.status(401).json('token_requis');
        }
        // Sinon, rediriger vers la page de connexion
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.decoded = decoded;
        req.user = decoded.user;

        const expiresIn = 24 * 60 * 60;
        const newToken = jwt.sign({
            user: decoded.user
        },
            SECRET_KEY, {
            expiresIn: expiresIn
        });

        // Définir le token dans les cookies et les en-têtes
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expiresIn * 1000
        });
        res.header('Authorization', 'Bearer ' + newToken);
        next();
    } catch (err) {
        // Si c'est une requête API, renvoyer une erreur JSON
        if (req.xhr || req.headers.accept.includes('application/json')) {
            return res.status(401).json('token_not_valid');
        }
        // Sinon, rediriger vers la page de connexion
        return res.redirect('/');
    }
};
