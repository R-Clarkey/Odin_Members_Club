const express = require("express")
const router = express.Router()
const signInFormController = require("../controllers/sign-in-formController")

router.get("/",  signInFormController.getPage)
router.post("/", signInFormController.postForm)



module.exports  = router