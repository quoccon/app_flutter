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
    router.get('/searchU',userControl.findUser);
    router.get('/getUInfo',userControl.getUserInfo);
    //mess
    router.post('/api-postmessage',messControl.createMess);
    router.get('/getUserMess',messControl.getUMess);
    router.get('/api-getmessage/:usersId',messControl.getAllMess);
    router.get('/api-getmessage',messControl.getAllMess);


    return app.use('/',router);
}

module.exports = initWebRouter;
 