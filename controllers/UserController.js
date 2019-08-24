const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

// Load User Model
const User = require('../models/User')

module.exports = {
  register: [
    // Validate Form
    [
      check('firstName', 'Please add First Name')
        .trim()
        .not()
        .isEmpty(),
      check('lastName', 'Please add Last Name')
        .trim()
        .not()
        .isEmpty(),
      check('email', 'Please enter a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({min: 6})
    ],

    // Receive data
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }

      const {firstName, lastName, email, password} = req.body

      try {
        let user = await User.findOne({email})

        if (user) {
          return res.status(400).json({msg: 'User already exists'})
        }

        user = new User({
          firstName,
          lastName,
          email,
          password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
          user: {
            id: user.id
          }
        }

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err
            res.json({token})
          }
        )
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    }
  ]
}
