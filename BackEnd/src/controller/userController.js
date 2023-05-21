const userServices = require("../services/userServices");

//Check password and email 
let handeleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: "Missing or invalid parameters!"
        })
    }

    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {'emai and Pass' : "warning!"},
    });
}

module.exports = {
    handeleLogin: handeleLogin,
}