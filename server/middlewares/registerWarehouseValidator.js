const validator = require('validator');

function validate(req, res, next) {
    const { id, password , confirm_password, location} = req.body
    if (!validator.isInt(id.toString(), { min: 1000, max: 9999 }) || !validator.isLength(password, { min: 8 }) || !validator.isLength(confirm_password, { min: 8 })) {
        return res.status(400).send({
            success: false,
            message: 'ID or Password in incorrect format'
        });
    }if (password != confirm_password) {
        return res.status(406).send({
            success: false,
            message: 'Passwords do not match'
        });
    } const loc = location.lat.toString() + ',' + location.long.toString();
    if (!validator.isLatLong(loc)) {
        return res.status(400).send({
            success: false,
            message: 'Location in Incorrect format'
        });
    }else {
        next();
    }
};

module.exports = validate; 