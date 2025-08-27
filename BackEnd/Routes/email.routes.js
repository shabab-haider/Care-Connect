const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller")

router.post("/sendCode", emailController.sendCode)


module.exports = router;
