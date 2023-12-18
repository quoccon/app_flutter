const myMD = require('../model/message.model');
const myMyU = require('../model/users.model')
// const socketIo = require('socket.io');

exports.createMess = async (req, res, next) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.session.userId;
        console.log(senderId);

        //xem có đoạn chat chưa
        let conversation = await myMD.messageModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });


        //chưa có thì tạo mới
        if (!conversation) {
            conversation = new myMD.messageModel({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        //thêm tin nhắn mới
        conversation.messages.push({ senderId, message });
        const saveMess = await conversation.save();
        console.log(saveMess);
        return res.status(200).json(saveMess);
    } catch (error) {
        console.log("Loi gui tin nhan");
        console.log(error);
        return res.status(500).json({ error: "Lỗi" });
    }
}

exports.getAllMess = async (req, res, next) => {
    try {
        const { usersId } = req.params;

        const conversation = await myMD.messageModel.findOne({
            participants: { $all: [req.session.userId, usersId] }
        });

        if (conversation) {
            return res.status(200).json(conversation.messages);
        } else {
            return res.status(404).json({ error: "Cuộc hội thoại không tồn tại" });
        }

    } catch (error) {
        console.log(error);
        console.log("Khong co du lieu");
        res.status(500).json({ error: "Loi" })
    }
}


exports.getUMess = async (req, res, next) => {
   try {
    const senderId = req.session.userId;
    console.log("Sender ID:", senderId);
    
    const conversations = await myMD.messageModel.find({
        participants:{$ne: senderId}
    });

    const receiverIds = conversations.map(conversation => {
        return conversation.participants.find(_id => _id !== senderId);
    });

    console.log(receiverIds);
    return res.status(200).json({receiverIds})
   } catch (error) {
    console.log(error);
    console.log("Lỗi");
   }
}



