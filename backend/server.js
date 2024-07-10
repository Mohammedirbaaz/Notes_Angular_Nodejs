const express = require('express')
const app = express()
const port = 3000;
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const Mongoose = require("mongoose");
require('dotenv').config();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.options("*", cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200,credentails:true }));
app.use(cors({ origin: "http://localhost:4200", optionsSuccessStatus: 200 ,credentails:true}));



Mongoose.connect(process.env.URL).then(()=>{
  console.log("Database Established");
}).catch(err=>{
  console.log(err);
});

const UserHandler = require("./reg_login.js")
const NotesHandler = require("./notes.js")

app.use("/user",UserHandler)
app.use("/notes",NotesHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});