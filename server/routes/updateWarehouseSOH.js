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
 * @apiParam { String } productType The type of SOH being updated (frozen || dairy || meat || produce || ambient)
 * @apiParam { Number } quantity The new quantity
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
 *           "warehouse": {
 *               "_id": "5f3d14a15b6d3362e810f462",
 *               "id": 11111,
 *               "password": "$2b$10$.SlJBhXYNPWPaaAZ1JPyXOvQqPBGuEpuTkwmpe.XzPP5JO5c0QYPu",
 *               "location": {
 *                   "lat": -37.650623,
 *                   "long": 145.025698
 *               },
 *               "hasOrdered": false,
 *               "__v": 0,
 *               "SOH": {
 *                   "frozen": "3",
 *                   "dairy": 0,
 *                   "meat": 0,
 *                   "produce": 0,
 *                   "ambient": 0
 *               }
 *           }
 *       }
 *
 * @apiError BadRequest The product type is incorrect.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 406 BadRequest
 *      {
 *           "success": false,
 *           "message": "Product Type in incorrect format"
 *      }
 **/

updateWarehouseSOH.post('/updateWarehouseSOH', authenticateWarehouse, validate, updateWarehouseSOHH ,(req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Updated',
        warehouse: res.locals.warehouse
    })
    
});


module.exports = updateWarehouseSOH; 