const express = require('express')
const router = express.Router()

const ContactController = require('../controllers/ContactController')

// @route GET api/contacts
// @desc Get all users contacts
// @access Public
router
  .route('/')
  .get(ContactController.getUsers)

  // @route GET api/contacts
  // @desc Add new contact
  // @access Private
  .post(ContactController.addContact)

// @route PUT api/contacts
// @desc Update contact
// @access Private

router
  .route('/:id')
  .put(ContactController.updateContact)

  // @route DELETE api/contacts
  // @desc Delete contact
  // @access Private

  .delete(ContactController.deleteContact)

module.exports = router
