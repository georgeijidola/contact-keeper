const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

// @route POST api/users
// @desc Register a user
// @access Public
router.route('/').post(UserController.register)

module.exports = router
