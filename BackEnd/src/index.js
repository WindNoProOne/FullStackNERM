const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Import file
const viewEngine = require('./config/viewEngine.js');
const initWebRouters = require('./routers/webs');
const connectDB = require('./config/connectDB.js');

//Cài biến môi trường để lấy được port
const port = process.env.PORT ?? 8080;
require('dotenv').config();


//cors config
var cors = require('cors');
app.use( cors({
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
}),
);


//config Biến môi tường
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Config router đến các file
viewEngine(app);
initWebRouters(app);

//connect Db
connectDB(app);

//Chạy localhost
app.listen(port, () => {
    console.log(`BackEnd Nodejs Is runing the http://localhost:${port}`);
});