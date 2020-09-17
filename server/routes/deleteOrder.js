const express = require('express');
const validate = require('../middlewares/deleteOrderValidator');
const authenticateStore = require('../middlewares/authenticateTokenStore');
const deleteOrderr = require('../services/deleteOrder');
const deleteOrder = express.Router();

/**
 * @api {post} /deleteOrder delete Order
 * @apiName delete Order
 * @apiGroup Store
 *
 * @apiParam { Number } orderId The ID of the order being deleted
 *
 * @apiSuccess {Boolean} success delete result
 * @apiSuccess {String} message delete status
 * @apiSuccess {Object} store The store that was deleted
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": true,
 *          "message": "Order Deleted"
 *      }
 *
 * @apiError BadRequest The order does not belong to that store.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 406 BadRequest
 *      {
 *          "success": false,
 *          "message": "Order does not belong to this store"
 *      }
 **/

deleteOrder.post('/deleteOrder', authenticateStore, validate, deleteOrderr, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Order Deleted'
    })

});


module.exports = deleteOrder; 