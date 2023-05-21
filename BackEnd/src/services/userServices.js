const db = require('../models/index.js');
const bcrypt = require('bcrypt');

//Login
let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist){
                //User already exists
                let user = await db.User.findOne({
                    where: { email: email},

                    //sử dụng để check lấy các dữ liệu được chọn đê xuất ra màn hình
                    attributes: ["email", "roleId", 'password'],
                    raw: true,
                });
                if (user){
                    //Copate password
                    let checkPasword =  bcrypt.compareSync(password, user.password);
                    if (checkPasword) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";

                        //Nếu thìm thấy chạy vào đây và xóa đi password delete user.password;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Warning password!"
                    };
                } else {
                    userData.errCode = 2,
                    userData.errMessage = `User's not found password`; 
                };
            } else {
                //Return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email int's exits in your system. Plz try other email`
            };
            resolve(userData);
        } catch (error) {
            reject(error);
        };
    },
)};

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if (user){
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    }
)}

module.exports = {
    handleUserLogin: handleUserLogin,
}