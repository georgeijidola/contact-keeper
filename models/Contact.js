const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false,
    default: null
  },
  email: {
    type: String,
    required: false
  },
  phoneNo: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('contact', ContactSchema)
