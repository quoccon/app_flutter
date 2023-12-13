const myMD = require('../model/users.model');
var objReturn = {
    status: 1,
    msg: "",
    infoU: "",
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


exports.getAllU = async(req,res,next) => {
    try {
        const allU = await myMD.usersModel.find();
        console.log("Lấy thành công");
        res.status(200).json(allU);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Lỗi lấy danh sách người dùng"});
        console.log("Lỗi lấy danh sách");
    }
}

exports.findUser = async(req, res,next) => {
  try {
    const {name} = req.body;

    const users = await myMD.usersModel.find({
        username:{$regex:name, $options:'i'},
    });

    if(users.length>0) {
        console.log("Oke");
        return res.status(200).json(users);
       
    }else{
        console.log("Không tìm thấy người dùng");
        return res.status(404).json({error:"Không tìm thấy người dùng"});
       
    }
  } catch (error) {
    console.log(error);
    console.log("Lỗi khi tìm kiếm");

  }
}

// exports.editU = async(req,res,next) => {
//     if(req.method === "POST"){
//         try {
//             const 
//         } catch (error) {
            
//         }
//     }
// }

exports.getUserInfo = async(req,res,next) => {
    try {
        if(req.method == "GET"){
            if(!req.session.userId){
                objReturn.msg = "Not logged in";
                objReturn.status = 1;
            }
        }
    } catch (error) {
        
    }
}