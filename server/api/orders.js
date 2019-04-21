const router = require('express').Router()
const {Order} = require('../db/models/')

router.get('/', async (req, res, next) => {
  try {
    if (req.session && req.session.passport) {
      console.log("I AM LOGGED IN!!!!!!!!!!!!!!")
      const cartToReload = await Order.findAll({where: {
        userId: req.session.passport.user,
        fulfilled: false
      }})
      res.status(201).send(cartToReload)
    }
    } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.session && req.session.passport) {
      const newOrder = await Order.create({
        userId: req.session.passport.user,
        productId: req.body.id,
        fulfilled: false
      })
      res.status(201).send(newOrder)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (req.session && req.session.passport) {
      const newOrder = await Order.update(
        {fulfilled: true},
        {where: {userId: req.session.passport.user}}
      )
      res.status(201).send(newOrder)
    } else {
      const guestOrder = await Order.create({
        userId: null,

        productId: req.body.id,
        fulfilled: true
      })
      res.status(201).send(guestOrder)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    if (req.session && req.session.passport) {
      await Order.destroy(
        {where:
          {userId: req.session.passport.user,
          fulfilled: false,
          productId: productId}
        }
      )
      res.status(202).send("item deleted from cart")
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
