const myMD = require('../model/users.model');
var objReturn = {
    status:1,
    msg:"",
    infoU:"",
}
exports.getAllU  = (req,res,next) => {

}

exports.regU = async (req,res,next) => {
    if(req.method == "POST"){
        console.log(req.body);
        let objU = await myMD.usersModel.findOne({username: req.body.username});

        //lưu
        if(
            req.body.username != null &&
            req.body.email != null &&
            req.body.password != null
        ){
            if(objU != null){
                objReturn.msg = "Tài khoản đã tồn tại";
                objReturn.status = 3;
                console.log("Tài khoản đã được đăng kí");
            }else{
                try {
                    let objU = new myMD.usersModel();
                    objU.username = req.body.username;
                    objU.password = req.body.password;
                    objU.email = req.body.email;
                    objU.phone = req.body.phone;
                    objU.status = 1 //người dùng đang kích hoạt

                    await objU.save();
                    console.log("Oke");
                    console.log(objU);
                    objReturn.msg = "Đăng kí tài khoản thành công!";
                    objReturn.status = 0;
                } catch (error) {
                    console.log(error);
                    console.log("Lỗi rồi");
                }
            }
        }else{
            console.log("Chưa đăng kí được");
        }
    }

    res.json(objReturn);
};


exports.loginU = async (req, res,next) => {
    try {
        if(req.method == 'POST'){
            const {username,password} = req.body;
            const user = await myMD.usersModel.findOne({username});

            if(!user){
                objReturn.msg ="User not found";
                objReturn.status = 3;
                return res.json(objReturn);
            }
            const hashPass = md5(password);
            if(user.password === hashPass){
                objReturn.msg = "Đăng nhập thành công!";
                objReturn.status = 0;
                objReturn.infoU = {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    status: user.status
                };
            }else{
                objReturn.msg = "Mật khẩu không đúng"
                objReturn.status = 3;
            }

            res.json(objReturn);
        }else{
            objReturn.msg = "Yêu cầu không hợp lệ";
            objReturn.status = 3;
            res.json(objReturn);
        }
    } catch (error) {
        console.log("Đăng nhập lỗi"+error);
        objReturn.msg = "Đã sảy ra lỗi";
        objReturn.status = 3;
        res.json(objReturn);
    }
};

function md5(input){
    return require('crypto').createHash('md5').update(input).digest('hex');
}