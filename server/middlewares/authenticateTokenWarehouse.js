const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ? req.headers.authorization.split(' ')[1] : req.body.token || req.query.token || req.headers.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_WAREHOUSE, (err, obj) => {
            if (err) {
                console.log('this');
                return res.status(406).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                })
            } else {
                res.token = token;
                res.obj = obj;
                next();
            }
        });
    } else { return res.status(403).send({ success: false, message: 'No token provided.' }); }
};

module.exports = authenticateToken;