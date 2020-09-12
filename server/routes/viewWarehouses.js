const express = require("express");
const authenticate = require("../middlewares/authenticateTokenStore");
const viewWarehousess = require("../services/viewWarehouses");
const viewWarehouses = express.Router();

/**
 * @api {get} /viewWarehouse View Warehouse that have outstanding orders
 * @apiName View Warehouse
 * @apiGroup Store
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Object} stores List of warehouse ids
 * @apiSuccess {Number} count number of warehouse ids returned
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": true,
 *          "message": "Warehouse Displayed",
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
 *          ],
 *          "count": 3
 *      }
 *
 * @apiError NotFound No Warehouse have Ordered.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *           "success": false,
 *           "message": "No Stores have ordered"
 *      }
 **/

viewWarehouses.get("/viewWarehouses", authenticate, viewWarehousess, (req, res) => {
    return res.status(200).send({
        success: true,
        message: "Warehouses Displayed",
        warehouses: res.locals.warehouses,
        count: res.locals.count
    });
});

module.exports = viewWarehouses;
