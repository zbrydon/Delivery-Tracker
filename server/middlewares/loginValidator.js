const validator = require('validator');

function validate(req, res, next) {
    const { id, password } = req.body
    if (!validator.isInt(id.toString())) {
        
        return res.status(406).send({
            success: false,
            message: 'ID is not a number'
        });
    } if (!validator.isLength(id.toString(), { min: 4 ,  max: 5 })) {
        
        return res.status(406).send({
            success: false,
            message: 'ID is the incorrect length'
        });
    } if (!validator.isLength(password, { min: 8 })) {
        return res.status(406).send({
            success: false,
            message: 'Password must be longer than 8 characters'
        });
	}else {
        next();
    }
};
module.exports = validate;