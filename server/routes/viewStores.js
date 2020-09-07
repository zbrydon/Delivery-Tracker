const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewStoress = require('../services/viewStores');
const viewStores = express.Router();

/**
 * @api {get} /viewStores View Stores that have outstanding orders
 * @apiName View Stores
 * @apiGroup Warehouse
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Object} stores List of store ids
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": true,
 *          "message": "Stores Displayed",
 *          "stores": [
 *              {
 *                  "id": 11111
 *              },
 *              {
 *                  "id": 11112
 *              },
 *              {
 *                  "id": 11113
 *              }
 *          ]
 *      }
 *
 * @apiError NotFound No Stores have Ordered.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *           "success": false,
 *           "message": "No Stores have ordered"
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