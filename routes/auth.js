const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

// @route GET api/auth
// @desc Get logged in user
// @access Private
router
  .route('/')
  .get(AuthController.getLoggedInUser)

  // @route POST api/auth
  // @desc Auth user & get token
  // @access Public

  .post(AuthController.logIn)

module.exports = router
