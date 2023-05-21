const express   = require('express')
const router = express.Router();
const homeController = require('../controller/homeController.js');
const userController = require('../controller/userController.js');

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);

    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);

    router.get('/delete-crud', homeController.deleteCRUD);



    //code Api
    router.post('/api/login', userController.handeleLogin);
    return app.use("/", router);
}


module.exports = initWebRouter;