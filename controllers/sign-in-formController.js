const check = require("express-validator");
const { validationResult } = check;
const dotenv = require('dotenv')
dotenv.config()
const db = require("../db/pool");
const passport = require("passport");

async function getPage(req, res){
    res.render("sign-in-form")
}

async function postForm(req, res, next){
    console.log(req.body.password, req.body.username)
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sign-in"
    })(req, res, next)
}

module.exports = {
    getPage,
    postForm
}