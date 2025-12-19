const express = require("express")
const router = express.Router()
const check = require("express-validator");
const checkFunction = check.check;
const signUpFormController = require("../controllers/sign-up-formController")

router.get("/", signUpFormController.getPage)

module.exports  = router