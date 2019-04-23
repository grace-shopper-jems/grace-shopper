const User = require('./user')
const Product = require('./products')
const Order = require('./order')
const Newsletter = require('./newsletter')

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsTo(Product)
Product.hasMany(Order)

module.exports = {
  User,
  Product,
  Order,
  Newsletter
}
