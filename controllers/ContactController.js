module.exports = {
  getUsers: (req, res) => {
    res.send('Get all users contacts')
  },
  addContact: (req, res) => {
    res.send('Add contact')
  },
  updateContact: (req, res) => {
    res.send('Update contact')
  },
  deleteContact: (req, res) => {
    res.send('Delete contact')
  }
}
