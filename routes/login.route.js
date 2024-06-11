const router = require("express").Router();
const { loginController } = require("../controllers");

router.post("/login", loginController.loginUser);

module.exports = router;