const dotenv = require('dotenv')
dotenv.config()
const db = require("../db/pool")

async function getPage(req, res, next){
    if(!req.isAuthenticated()){
        res.render("index")
    }else{
         res.render("membership")
    }
    
}

async function postForm(req, res){

}



module.exports = {
    getPage,
    postForm
}