const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/server_flutter')
    .then(() => {
        console.log("Kết nối thành công");
    }).catch((error) => {
        console.log("Kết nối thất bại");
    });

module.exports = { mongoose }