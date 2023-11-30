const express = require('express');
const userControl = require('../api/users.api');
const router = express.Router();

/**
 * @param{} app express app  
 */

const initWebRouter = (app) => {
    router.post('/reg-api',userControl.regU);
    router.post('/login-api',userControl.loginU);
    router.get('login-api',userControl.loginU);

    return app.use('/',router);
}

module.exports = initWebRouter;
