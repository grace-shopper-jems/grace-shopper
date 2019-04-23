const router = require('express').Router()
const {Newsletter} = require('../db/models/')

router.post('/', async (req, res, next) => {
  try {
    const email = await Newsletter.create(req.body)
    res.status(201).send(email)
  } catch (error) {
    next(error)
  }
})

module.exports = router
