const validator = require('validator');

function validate(req, res, next) {
    const { id, password } = req.body
    if (!validator.isInt(id) || !validator.isLength(password, { min: 8 })) {
        return res.status(400).send({
            success: false,
            message: 'ID or Password in incorrect format'
        });
    } else {
        res.status(200).send({
            success: true,
            message: 'Successfully Logged In'
        });
        next();
    }
};
module.exports = validate;