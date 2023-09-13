const express = require('express');
const connectDatabase = require('./config/connection');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
require('dotenv').config();
const errorMiddleware = require("./middlewares/error");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(cors());
const corsOptions ={
  origin:'http://localhost:3000',  
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))
const port = process.env.PORT || 5000;
connectDatabase();
const routes = require('./route/routes');
app.use("/api", routes);

const server = app.listen(port, () => {
    console.log(`Server is running on port  ${port}`);
});
// Middleware for Errors
app.use(errorMiddleware);
module.exports = server;