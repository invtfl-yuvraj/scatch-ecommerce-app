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

app.use(session({ 
    secret:'yuvraj', 
    saveUninitialized: true, 
    resave: true
})); 
app.use(flash());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
