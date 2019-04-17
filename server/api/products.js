const router = require('express').Router()
const {Product, Order} = require('../db/models/')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.session.user) {
      const newOrder = await Order.create({
        userid: req.session.user.id,
        productid: Product.id
      })
      res.status(201).send(newOrder)
    } else {
      const guestOrder = await Order.create({
        userid: null,
        productid: Product.id
      })
      res.status(201).send(guestOrder)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
