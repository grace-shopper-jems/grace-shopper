const router = require('express').Router()

var stripe = require('stripe')('sk_test_dNwYshLs50W7TZ6e9cJEIUZd00ehYRZwRx')

router.post('/sessions', async (req, res, next) => {
  await stripe.checkout.sessions.create(
    {
      success_url: 'localhost:8080/order',
      cancel_url: 'localhost:8080/cart',
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          amount: 1500,
          currency: 'usd',
          quantity: 2
        }
      ]
    },
    function(err, session) {
      err.message
    }
  )
})

router.get('/sessions/:id', async (req, res, next) => {
  await stripe.checkout.sessions.retrieve(
    'cs_mxqIDPPscu3mGoKbdoE6vulesoJr8Qr94jnS8ohofdRcADML9HiNDEEm8ZBT5',
    function(err, session) {
      err.message
      // asynchronously called
    }
  )
})

module.exports = router
