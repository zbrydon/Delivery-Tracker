const validator = require('validator');

function validate(req, res, next) {
    const { id, password } = req.body
    if (!validator.isInt(id, { min: 4}) || !validator.isLength(password, { min: 8 })) {
        return res.status(400).send({
            success: false,
            message: 'ID or Password in incorrect format'
        });
    } else {
        next();
    }
};
module.exports = validate;