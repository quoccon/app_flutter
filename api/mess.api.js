const myMD = require('../model/message.model');
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
        const {userId} = req.params._id;

        const conversation = await myMD.messageModel.findOne({
            participants:{ $all: [req.user._id, userId]}
        });

        if(conversation){
            return res.status(200).json(conversation.messages);
        }else{
            return res.status(404).json({error:"Cuộc hội thoại không tồn tại"});
        }
        
    } catch (error) {
        console.log(error);
        console.log("Khong co du lieu");
        res.status(500).json({ error: "Loi" })
    }
}




