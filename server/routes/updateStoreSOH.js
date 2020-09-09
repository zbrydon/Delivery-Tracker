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
 * @apiParam { String } productType The type of SOH being updated (frozen || dairy || meat || produce || ambient)
 * @apiParam { Number } quantity The new quantity
 *
 * @apiSuccess {Boolean} success Update result
 * @apiSuccess {String} message Update status
 * @apiSuccess {Object} store The store that was updated
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "SOH Updated",
 *           "store": {
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

updateStoreSOH.post('/updateStoreSOH', authenticateStore, validate, updateStoreSOHH ,(req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Updated',
        store: res.locals.store
    })
    
});


module.exports = updateStoreSOH; 