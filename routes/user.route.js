const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.editUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;