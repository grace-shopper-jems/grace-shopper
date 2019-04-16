const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  diameter: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  material: {
    type: Sequelize.STRING,
    allowNull: false
  },
  waterproof: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  strapColor: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
