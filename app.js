const express = require("express");
const session = require('express-session'); 
const flash = require('connect-flash'); 
require("dotenv").config();
  
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");

const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(session({ 
    secret: process.env.EXPRESS_SESSION_SECRET, 
    saveUninitialized: true, 
    resave: false
}));
app.use(flash());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
