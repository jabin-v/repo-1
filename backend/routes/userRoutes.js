const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
router.route('/login')
    .post(usersController.loginUser)

module.exports = router