const router = require("express").Router();
const { userController } = require("../controllers");
const { userAuth } = require("../helpers");

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.editUser);
router.delete("/user/:id", userAuth.verifyUser, userController.deleteUser);

module.exports = router;
