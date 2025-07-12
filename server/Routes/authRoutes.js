const express = require("express")
const { loginUser } = require("../Controller/authController")

const router = express.Router()

router.post("/login" ,  loginUser)

module.exports = router