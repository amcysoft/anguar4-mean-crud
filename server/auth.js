var User = require('./models/user');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
    return {
        getToken: function (user) {
            return jwt.sign(user, app.config.secretKey, {
                expiresIn: 3600
            });
        },
        verifyUser: function (req, res, next) {
            var token = req.body.token || req.query.token || req.headers['x-access-token'];

            if (token) {
                jwt.verify(token, config.secretKey, function (err, decoded) {
                    if (err) {
                        var err = new Error('You are not authenticated!');
                        err.status = 401;
                        return next(err);
                    }
                    else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                var err = new Error('No token provided!');
                err.status = 401;
                return next(err);
            }
        }
    };
};