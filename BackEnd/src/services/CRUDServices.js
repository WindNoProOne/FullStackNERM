const bcrypt = require('bcrypt');
const db = require('../models/index.js');

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hastPasswordFromBcipt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password :  hastPasswordFromBcipt,
                firstName: data.firstName,
                lastName: data.lastName,
                address:  data.address,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
            });
            resolve('Connect create User successfully!');
        } catch (error) {
            reject(error);
        }
    })
}

    //đổi PassWord
    const salt = bcrypt.genSaltSync(10);
    let hashUserPassword = (password) => {
        return new Promise( async (resolve, reject) => {
            try {
                var hastPassword = await bcrypt.hashSync(password, salt);
                resolve(hastPassword);
            } catch (error) {
                reject(error);
            }
        });
    };

//View User
let getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try {
            var users = db.User.findAll({
                raw: true,
            });
            resolve (users)
        } catch (error) {
            reject("Get all users failed" + error);
        }
    })
}

//Update User
let getUserInfoById = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            // findOne Trả về 1 phần tử
            let user = await db.User.findOne({
                where: {id: userId}
            })

            if(user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (error) {
            reject(error);
        }
    })
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                // Save the updated user data
                await user.save();

                let allUsers = await db.User.findAll();
                // Resolve with the updated user object
                resolve(allUsers);
            } else {
                // Resolve with no value if user not found
                resolve();
            }
        } catch (error) {
            // Reject with error if there was an issue updating the user
            reject(error);
        }
    });
};

//Delete user Date
let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            });
            if(user) {
                await user.destroy();
            }
            resolve(); //return
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}