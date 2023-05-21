const express = require('express');

const configViewengines = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set('views', './src/views');
}


module.exports = configViewengines;
