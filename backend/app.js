const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(cookieParser());
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// config
dotenv.config({ path: "backend/config/config.env" });

// route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
