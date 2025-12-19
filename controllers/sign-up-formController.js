const check = require("express-validator");
const { validationResult } = check;
const dotenv = require('dotenv')
dotenv.config()

async function getPage(req,res){
    res.render("sign-up-form")
}

module.exports = {
    getPage,
}
