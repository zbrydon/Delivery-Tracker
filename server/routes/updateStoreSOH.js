const express = require('express');
const validate = require('../middlewares/updateSOHValidator');
const authenticateStore = require('../middlewares/authenticateTokenStore');
const updateStoreSOHH = require('../services/updateStoreSOH');
const updateStoreSOH = express.Router();

/**
 * @api {post} /updateStoreSOH Update Store SOH
 * @apiName Update Store SOH
 * @apiGroup Store
 *
 * @apiParam { Number } frozenQuantity Number of frozen pallets
 * @apiParam { Number } dairyQuantity Number of dairy pallets
 * @apiParam { Number } meatQuantity Number of meat pallets
 * @apiParam { Number } produceQuantity Number of produce pallets
 * @apiParam { Number } ambientQuantity Number of ambient pallets
 *
 * @apiSuccess {Boolean} success Update result
 * @apiSuccess {String} message Update status
 * @apiSuccess {Object} storeSOH The store that was updated
 * @apiSuccess {Number} storeID The stores id
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "SOH Updated",
 *           "storeSOH": {
 *               "frozen": 3,
 *                   "dairy": 0,
 *                   "meat": 0,
 *                   "produce": 0,
 *                   "ambient": 0
 *           },
 *           "storeID": 11111
 *       }
 *
 * @apiError BadRequest The quantity is incorrect.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *           "success": false,
 *           "message": "Quantity inncorrect"
 *      }
 **/

updateStoreSOH.post('/updateStoreSOH', authenticateStore, validate, updateStoreSOHH ,(req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Updated',
        storeSOH: res.locals.storeSOH,
        storeID: res.locals.storeID
    })
    
});


module.exports = updateStoreSOH; 