const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewStoress = require('../services/viewStores');
const viewStores = express.Router();

/**
 * @api {get} /viewStoreSOH View Store SOH
 * @apiName View Store SOH
 * @apiGroup Store
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Object} SOH The SOH from that store
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "SOH Displayed",
 *           "SOH": {
 *               "frozen": "6",
 *               "dairy": 0,
 *               "meat": 0,
 *               "produce": 0,
 *               "ambient": 0
 *           }
 *       }
 *
 * @apiError NotFound The store does not exist.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *           "success": false,
 *           "message": "This store does not esist"
 *      }
 **/

viewStores.get('/viewStores', authenticate, viewStoress, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Stores Displayed',
        stores: res.locals.stores
    })
});

module.exports = viewStores; 