const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewTEMP = require('../services/viewWarehouseTEMP');
const viewWarehouseTEMP = express.Router();

/**
 * @api {get} /viewWarehouseTEMP View Warehouse TEMP
 * @apiName View Warehouse TEMP
 * @apiGroup Warehouse
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Object} TEMP The TEMP from that warehouse
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "TEMP Displayed",
 *           "TEMP": {
 *               "frozen": "-6",
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

viewWarehouseTEMP.get('/viewWarehouseTEMP', authenticate, viewTEMP, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'TEMP Displayed',
        TEMP: res.locals.TEMP
    })
});

module.exports = viewWarehouseTEMP; 