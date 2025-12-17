const path = require("node:path")
const express = require("express")
const app = express()
const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))
const dotenv = require('dotenv');
dotenv.config();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })) 
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

app.get('/', function (req, res) {
    res.render('index');
})

app.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    throw error
  }
  console.log(`My first Express app - listening on port ${process.env.PORT || 3000}!`)
})