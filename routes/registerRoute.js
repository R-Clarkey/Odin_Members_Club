const express = require("express")
const router = express.Router()
const check = require("express-validator");
const checkFunction = check.check;
const registerController = require("../controllers/registerController")

router.get("/", registerController.getPage)

module.exports  = router