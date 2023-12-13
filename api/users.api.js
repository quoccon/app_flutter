const myMD = require('../model/users.model');
var objReturn = {
    status: 1,
    msg: "",
    infoU: "",
}
exports.getAllU = (req, res, next) => {

}

exports.regU = async (req, res, next) => {
    if (req.method == "POST") {
        console.log(req.body);
        let objU = await myMD.usersModel.findOne({ username: req.body.username });
        console.log(req.body.username);
        console.log(req.body.password);
        console.log(req.body.email);
        console.log(req.body.phone);

        //lưu
        if (
            req.body.username != null
            // req.body.email != null &&
            // req.body.password != null &&
            // req.body.confirmPassword != null &&
            // req.body.password === req.body.confirmPassword
        ) {
            if (objU != null) {
                objReturn.msg = "Tài khoản đã tồn tại";
                objReturn.status = 3;
                console.log("Tài khoản đã được đăng kí");
            } else {
                try {
                    let objU = new myMD.usersModel();
                    objU.username = req.body.username;
                    objU.password = req.body.password
                    // objU.email = req.body.email;
                    // objU.phone = req.body.phone;
                    objU.status = 1 //người dùng đang kích hoạt


                    await objU.save();
                    console.log("Oke");
                    console.log(objU);
                    objReturn.msg = "abc!";
                    objReturn.status = 0;
                } catch (error) {
                    console.log(error);
                    console.log("Lỗi rồi");
                }
            }
        } else {
            console.log("cccccc");

        }
    }

    res.json(objReturn);
};

// exports.Reg = async (req, res, next) => {
//     try {
//         const { username, password, confirmPass } = req.body;


//         if(password !== confirmPass){
//             return res.status(400).json({message:"Mật khẩu không trùng khớp"})
//         }

//         // Kiểm tra xem tên người dùng đã tồn tại chưa
//         const existingUser = await myMD.usersModel.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
//         }

//         // Tạo một người dùng mới
//         const newUser = new myMD.usersModel({ username, password });

//         // Lưu người dùng vào cơ sở dữ liệu
//         await newUser.save();

//         res.status(200).json({ message: "Đăng ký thành công" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Lỗi" });
//     }
// };

// exports.loginU = async (req, res,next) => {
//     try {
//         if(req.method == 'POST'){
//             const {username,password} = req.body;
//             const user = await myMD.usersModel.findOne({username});

//             if(!user){
//                 objReturn.msg ="User not found";
//                 objReturn.status = 3;
//                 return res.json(objReturn);
//             }
//             const hashPass = md5(password);
//             if(user.password === hashPass){
//                 objReturn.msg = "Đăng nhập thành công!";
//                 objReturn.status = 0;
//                 objReturn.infoU = {
//                     username: user.username,
//                     // email: user.email,
//                     // phone: user.phone,
//                     status: user.status
//                 };
//             }else{
//                 objReturn.msg = "Mật khẩu không đúng"
//                 objReturn.status = 3;
//             }

//             res.json(objReturn);
//         }else{
//             objReturn.msg = "Yêu cầu không hợp lệ";
//             objReturn.status = 3;
//             res.json(objReturn);
//         }
//     } catch (error) {
//         console.log("Đăng nhập lỗi"+error);
//         objReturn.msg = "Đã sảy ra lỗi";
//         objReturn.status = 3;
//         res.json(objReturn);
//     }
// };

// function md5(input){
//     return require('crypto').createHash('md5').update(input).digest('hex');
// }


// exports.seachU = async (res,req,next) => {
//     const query = req.body.q;

//     try {
//         const U = await myMD.usersModel.find({
//             $or: [
//                 {username: {$regex: query,$options:'i'}},
//             ],
//         });
//         res.json(U);
//     } catch (error) {
//         console.log(error);
//     }
// }

exports.loginU = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            console.log(req.body);
            const { username, password } = req.body;

            const user = await myMD.usersModel.findOne({ username });
            if (!user) {
                objReturn.msg = "Người dùng không tồn tại";
                objReturn.status = 1;
            } else {
                const isPassword = user.comparePassword(password);

                if (isPassword) {
                    req.session.userId = user;
                    console.log(req.session.userId);
                    objReturn.msg = "Đăng nhập thành công1";
                    objReturn.status = 0;
                    console.log("Oke");
                } else {
                    objReturn.msg = "Mật khẩu không đúng";
                    objReturn.status = 2;
                }
            }
        } else {
            objReturn.msg = "Ibvalid method";
            objReturn.status = 3;
        }
    } catch (error) {
        console.log(error);
        console.log("Lỗi đăng nhập");
    }

    res.json(objReturn);
}

exports.findUser = async(req, res,next) => {
    try {
        if(req.method == "GET"){
            const {name} = req.query;

            const users = await myMD.usersModel.find({
                username:{$regex:name , $options:'i'},
            });

            if(users.length>0){
                return res.status(200).json(users);
            }else{
                return res.status(404).json({error:"Không tìm thấy tài khoản"});
            }
        }else{
            return res.status(400).json({error:"Yêu cầu khong hợp lệ"});
        }
    } catch (error) {
        console.log(error);
        console.log("Lỗi khi tìm kiếm");
        return res.status(500).json({ error: "Lỗi" });
    }
}