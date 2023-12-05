const db = require('./db');

const usersChema = new db.mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        // confirmPassword: { type: String, required: true },
        // email: { type: String, required: true },
        // phone: { type: String, required: true },
    },
    {
        collection: 'users',
    }
);

usersChema.methods.comparePassword = function(candidatePassword) {
    return this.password === candidatePassword;
};

let usersModel = db.mongoose.model('usersModel', usersChema);

module.exports = { usersModel };
     