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
    const newOrder = await Order.create({
      userid: req.session.user.id,
      productid: Product.id
    })
    console.log(req.session.user)
    res.status(201).send(newOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
