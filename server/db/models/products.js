const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
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
  },
  imgUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product
