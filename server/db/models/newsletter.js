const Sequelize = require('sequelize')
const db = require('../db')

const Newsletter = db.define('newsletter', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = Newsletter
