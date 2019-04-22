const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      streetAddressShip: user.streetAddressShip,
      cityShip: user.cityShip,
      stateShip: user.stateShip,
      zipShip: user.zipShip,
      streetAddressBill: user.streetAddressBill,
      cityBill: user.cityBill,
      stateBill: user.stateBill,
      zipBill: user.zipBill
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const [rowsUpdated, userUpdate] = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        streetAddressShip: req.body.streetAddressShip,
        cityShip: req.body.cityShip,
        stateShip: req.body.stateShip,
        zipShip: req.body.zipShip,
        streetAddressBill: req.body.streetAddressBill,
        cityBill: req.body.cityBill,
        stateBill: req.body.stateBill,
        zipBill: req.body.zipBill
      },
      {returning: true, where: {id: req.params.userId}}
    )
    res.send(userUpdate[0])
  } catch (err) {
    next(err)
  }
})
