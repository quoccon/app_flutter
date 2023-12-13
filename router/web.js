const express = require('express');
const userControl = require('../api/users.api');
const messControl = require('../api/mess.api');
const router = express.Router();

/**
 * @param{} app express app  
 * 
 */

const initWebRouter = (app) => {
    // user
    router.post('/reg-api',userControl.regU)
    router.post('/login-api',userControl.loginU);
    router.get('/login-api',userControl.loginU);
    router.get('/getAllU',userControl.getAllU);

    //mess
    router.post('/api-postmessage',messControl.createMess);
    router.get('/api-getmessage/:usersId',messControl.getAllMess);

    return app.use('/',router);
}

module.exports = initWebRouter;
 