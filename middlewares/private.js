var jwt = require('jsonwebtoken');
var SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    console.log('ROUTE:', req.originalUrl);
    console.log('HEADERS RECUS:', req.headers);
    let token = req.headers['x-access-token'] || req.get('Authorization');

    console.log('TOKEN RECUPERE:', token);

    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                req.decoded = decoded;

                const expiresIn = 24 * 60 * 60;
                const newToken = jwt.sign({
                    user: decoded.user
                },
                    SECRET_KEY, {
                    expiresIn: expiresIn
                });
                res.header('Authorization', 'Bearer ' + newToken);
                next();
            }
        });
    } else {
        return res.status(401).json('token_requis');
    }
}
