const express = require('express');
const validate = require('../middlewares/updateSOHValidator');
const authenticateWarehouse = require('../middlewares/authenticateTokenWarehouse');
const updateWarehouseSOHH = require('../services/updateWarehouseSOH');
const updateWarehouseSOH = express.Router();

/**
 * @api {post} /updateWarehouseSOH Update Warehouse SOH
 * @apiName Update Warehouse SOH
 * @apiGroup Warehouse
 *
 * @apiParam { Number } frozenQuantity Number of frozen pallets
 * @apiParam { Number } dairyQuantity Number of dairy pallets
 * @apiParam { Number } meatQuantity Number of meat pallets
 * @apiParam { Number } produceQuantity Number of produce pallets
 * @apiParam { Number } ambientQuantity Number of ambient pallets
 *
 * @apiSuccess {Boolean} success Update result
 * @apiSuccess {String} message Update status
 * @apiSuccess {Object} warehouse The warehouse that was updated
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "SOH Updated",
 *           "warehouseSOH": {
 *               "frozen": 3,
 *                   "dairy": 0,
 *                   "meat": 0,
 *                   "produce": 0,
 *                   "ambient": 0
 *           },
 *           "warehouseID": 1111
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

updateWarehouseSOH.post('/updateWarehouseSOH', authenticateWarehouse, validate, updateWarehouseSOHH , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Updated',
        warehouseSOH: res.locals.warehouseSOH,
        warehouseID: res.locals.warehouseID
    })
    
});


module.exports = updateWarehouseSOH; 