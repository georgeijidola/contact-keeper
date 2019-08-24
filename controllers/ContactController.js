const auth = require('../middlewares/auth')
const {check, validationResult} = require('express-validator')

// Load User Model
const User = require('../models/User')

// Load Contact Model
const Contact = require('../models/Contact')

module.exports = {
  getContacts: [
    auth,
    async (req, res) => {
      try {
        const contacts = await Contact.find({user: req.user.id}).sort({
          date: -1
        })
        res.json(contacts)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    }
  ],

  addContact: [
    auth,
    [
      check('firstName', 'First Name is required')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }

      const {firstName, lastName, email, phoneNo, type} = req.body

      try {
        const newContact = new Contact({
          firstName,
          lastName,
          email,
          phoneNo,
          type,
          owner: req.user.id
        })

        const contact = await newContact.save()

        res.json(contact)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    }
  ],

  updateContact: (req, res) => {
    res.send('Update contact')
  },

  deleteContact: (req, res) => {
    res.send('Delete contact')
  }
}
