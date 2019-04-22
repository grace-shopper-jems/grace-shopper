const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATEONLY
  }
})

module.exports = Order
