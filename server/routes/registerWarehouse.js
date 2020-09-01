const express = require('express');
const validate = require('../middlewares/registerValidator');
const createWarehouse = require('../services/createWarehouse');
const registerWarehouse = express.Router();

/**
 * @api {post} /registerWarehouse Register Warehouse
 * @apiName Register Warehouse
 * @apiGroup Warehouse
 *
 * @apiParam { Number}  id Warehouse  ID (Four digits long)
 * @apiParam { String } password The Warehouse's password
 * @apiParam { Object } location The Warehouse's location
 *
 * @apiSuccess {Boolean} success Register result
 * @apiSuccess {String} message Register status
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "Warehouse Created"
 *       }
 *
 * @apiError WarehouseExists The id of the warehouse is already in use.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 406 WarehouseExists
 *      {
 *          "success": false,
 *          "message": "ID already exists"
 *      }
 **/

registerWarehouse.post('/registerWarehouse', validate, createWarehouse , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Warehouse Created'
    })
});

module.exports = registerWarehouse;  