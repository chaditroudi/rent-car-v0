
const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

const auth = require('../middleware/auth.middleware');

const { updateUserValidator, deleteUserValidator, createUserValidator } = require('../helper/user-validator.helper');

router.get('/get-users', auth, userController.getUsers,);
router.put('/update-user/:id', auth, updateUserValidator, userController.updateUser);
router.post('/delete-user', auth, deleteUserValidator, userController.deleteUser);
router.post('/create-user', auth, createUserValidator, userController.createUser);


module.exports = router;
