const router = require("express").Router();
const { authController } = require("../controllers");

router.post("/auth/login", authController.loginUser);

module.exports = router;