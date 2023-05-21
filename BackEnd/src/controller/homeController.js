const db = require('../models/index.js');
const CRUDServices = require('../services/CRUDServices.js');

let getHomePage = async (req, res) => {
    try {
        // User: Đặt tên gì vào chỗ này cũng được vì ở đây nó như name của 1 bẳng
        let data = await db.User.findAll();
        return res.render('home.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getCRUD = async (req, res) => {
    try {
        return res.render('crud.ejs');  
    } catch (error) {
        console.log(error);
    }
};

//Create Users
let postCRUD =  async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log("Message: " + message);
    return res.send("Post Crud form servers");
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser();
    return res.render('display-crud.ejs', {
        dataTable: data
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId){
        let userData = await CRUDServices.getUserInfoById(userId);
        return res.render("edit_crud.ejs", {
            user: userData
        });
    } else{
        return res.send("User Not Found");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers =  await CRUDServices.updateUserData(data);
    return res.render("display-crud.ejs", {
        dataTable: allUsers
    });
}

//Delete user data
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServices.deleteUserById(id);
        return res.send("Delete the user succeed!")
    } else {
        return res.send("User Node default");
    }
};

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}