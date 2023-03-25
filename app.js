const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//For Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
//Middleware for Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Regular Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//This Simply a morgan middleware
app.use(morgan('tiny'));

//Cookie and file middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

//tmp check
app.set("view engine", "ejs");

//Import all Routes Here
const home = require('./routes/home');
const user = require('./routes/user');
const product = require('./routes/product');
const payment = require('./routes/payment');
const order = require('./routes/order');


//router middleware
app.use('/api/v1',home);
app.use('/api/v1',user); 
app.use('/api/v1',product);
app.use('/api/v1',payment);
app.use('/api/v1',order);


app.get('/signuptest',(req,res)=>{
    res.render('signuptest');
})
//export app js
module.exports = app;