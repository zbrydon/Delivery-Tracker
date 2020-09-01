const express = require('express');
const validate = require('../middlewares/loginValidator');
const authenticateStore = require('../middlewares/authenticateStore');
const authenticateWarehouse = require('../middlewares/authenticateWarehouse');
const loginStore = express.Router();

/**
 * @api {post} /login Login 
 * @apiName Login
 * @apiGroup Store & Warehouse
 *
 * @apiParam { Number}  id Store or Warehouse ID
 * @apiParam { String } password The store or warehouse password
 *
 * @apiSuccess {Boolean} success Login result
 * @apiSuccess {String} message Login status
 * @apiSuccess {Object} tokens The JWT token and JWT refresh token
 * @apiSuccess {String} type The type of user (store || warehouse)
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "Logged In",
 *           "tokens": {
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTEiLCJpYXQiOjE1OTg5NTAxMTcsImV4cCI6MTU5ODk1MTAxN30.B4m-Va1S3cGWcnLQUHW9S5q6Ii6uYwfo-cYZmmhQS1Q",
 *               "refreshToken": "refreshToken"
 *           },
 *           "type": "warehouse"
 *       }
 *
 * @apiError UserNotFound The id of the warehouse was not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "success": false,
 *          "message": "ID does not exist"
 *      }
 **/

loginStore.post('/login', validate, authenticateStore, authenticateWarehouse, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Logged In',
        tokens: res.locals.tokens,
        type: res.locals.type
    })
});

module.exports = loginStore; 