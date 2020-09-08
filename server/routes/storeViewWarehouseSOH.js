const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewSOH = require('../services/storeViewWarehouseSOH');
const validate = require('../middlewares/viewSOHValidator');
const storeViewWarehouseSOH = express.Router();

/**
 * @api {post} /viewStoreSOH Store view warehouse SOH
 * @apiName Store view warehouse SOH
 * @apiGroup Store
 *
 * @apiParam {Number} warehouseId The ID of the warehouse 
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
 * @apiError NotFound The warehouse does not exist.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *           "success": false,
 *           "message": "This warehouse does not esist"
 *      }
 **/

storeViewWarehouseSOH.post('/storeViewWarehouseSOH', authenticate, validate ,viewSOH, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Displayed',
        SOH: res.locals.SOH
    })
});

module.exports = storeViewWarehouseSOH; 