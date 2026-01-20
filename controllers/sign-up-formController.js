const check = require("express-validator");
const { validationResult } = check;
const dotenv = require('dotenv')
dotenv.config()
const db = require("../db/pool")
const bcrypt = require("bcryptjs");


async function getPage(req,res){
    res.render("sign-up-form")
}

async function postForm(req,res){
    console.log(req.body.fname, req.body.lname, req.body.email, false, req.body.password)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try{
        await db.query("INSERT INTO users (first_name, last_name, email, member_status, hashed_password) VALUES ($1, $2, $3, $4, $5)", [req.body.fname, req.body.lname, req.body.email, false, hashedPassword])
    } catch (error){
        console.error(error)
        next(error)
    }
}

module.exports = {
    getPage,
    postForm,
}
