const check = require("express-validator");
const { validationResult } = check;
const dotenv = require('dotenv')
const db = require("../db/queries")
dotenv.config()

async function getPage(req,res){
    res.render("register")
}

module.exports = {
    getPage,
    
}
