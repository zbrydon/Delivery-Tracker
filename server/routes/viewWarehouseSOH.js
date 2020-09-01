const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewSOH = require('../services/viewWarehouseSOH');
const viewWarehouseSOH = express.Router();

/**
 * @api {get} /viewWarehouseSOH View Warehouse SOH
 * @apiName View Warehouse SOH
 * @apiGroup Warehouse
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Object} SOH The SOH from that warehouse
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
 * @apiError NotFound The warehouse does not exist.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *           "success": false,
 *           "message": "This warehouse does not esist"
 *      }
 **/

viewWarehouseSOH.get('/viewWarehouseSOH', authenticate, viewSOH, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Displayed',
        SOH: res.locals.SOH
    })
});

module.exports = viewWarehouseSOH; 