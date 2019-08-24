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
        const contacts = await Contact.find({owner: req.user.id}).sort({
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

  updateContact: [
    auth,
    async (req, res) => {
      const {firstName, lastName, email, phoneNo, type} = req.body

      // Build contact object
      const contactFields = {}
      if (firstName) contactFields.firstName = firstName
      if (lastName) contactFields.lastName = lastName
      if (email) contactFields.email = email
      if (phoneNo) contactFields.phoneNo = phoneNo
      if (type) contactFields.type = type

      try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({msg: 'Contact not found'})

        // Make sure user owns contact
        if (contact.owner.toString() !== req.user.id)
          return res.status(401).json({msg: 'Not authorized'})

        contact = await Contact.findByIdAndUpdate(
          req.params.id,
          {$set: contactFields},
          {new: true}
        )

        res.json(contact)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    }
  ],

  deleteContact: [
    auth,
    async (req, res) => {
      try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({msg: 'Contact not found'})

        // Make sure user owns contact
        if (contact.owner.toString() !== req.user.id)
          return res.status(401).json({msg: 'Not authorized'})

        await Contact.findByIdAndRemove(req.params.id)

        res.json({msg: 'Contact removed'})
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    }
  ]
}
