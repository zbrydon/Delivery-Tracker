const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewTEMP = require('../services/viewStoreTEMP');
const viewStoreTEMP = express.Router();

/**
 * @api {get} /viewStoreTEMP View Store TEMP
 * @apiName View Store TEMP
 * @apiGroup Store
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Object} TEMP The TEMP from that store
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "TEMP Displayed",
 *           "TEMP": {
 *               "frozen": "6",
 *               "dairy": 0,
 *               "meat": 0,
 *               "produce": 0,
 *               "ambient": 0
 *           }
 *       }
 *
 * @apiError NotFound The store does not exist.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *           "success": false,
 *           "message": "This store does not esist"
 *      }
 **/

viewStoreTEMP.get('/viewStoreTEMP', authenticate, viewTEMP, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'TEMP Displayed',
        TEMP: res.locals.TEMP
    })
});

module.exports = viewStoreTEMP; 