const { default: mongoose } = require('mongoose');
const db = require('./db');

const messageSchema = new db.mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userModel'
            }
        ],
        messages: [
            {
                senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'userModel'
                },
                message: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        collection: 'message'
    }
);

const messageModel = db.mongoose.model('messageModel', messageSchema);

module.exports = { messageModel };
