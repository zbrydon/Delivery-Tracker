const express = require('express');
const validate = require('../middlewares/registerValidator');
const createStore = require('../services/createStore');
const registerStore = express.Router();

/**
 * @api {post} /registerStore Register Store
 * @apiName Register Store
 * @apiGroup Store
 *
 * @apiParam { Number}  id Store  ID (Five digits long)
 * @apiParam { String } password The Store's password
 * @apiParam { Object } location The Store's location
 *
 * @apiSuccess {Boolean} success Register result
 * @apiSuccess {String} message Register status
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "Store Created"
 *       }
 *
 * @apiError StoreExists The id of the store is already in use.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 406 StoreExists
 *      {
 *          "success": false,
 *          "message": "ID already exists"
 *      }
 **/

registerStore.post('/registerStore', validate, createStore , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Store Created'
    })
});

module.exports = registerStore;  