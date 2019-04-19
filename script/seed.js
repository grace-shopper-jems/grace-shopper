'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'The Pug',
      email: 'cody@email.com',
      password: '123',
      isAdmin: true,
      phoneNumber: '917-456-2859',
      streetAddressShip: '123 baker street',
      cityShip: 'New York',
      stateShip: 'NY',
      zipShip: 10001,
      streetAddressBill: '123 baker street',
      cityBill: 'New York',
      stateBill: 'New York',
      zipBill: 10001
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'The Cat',
      email: 'murphy@email.com',
      password: '123',
      isAdmin: false,
      phoneNumber: '917-456-1111',
      streetAddressShip: '122 cat street',
      cityShip: 'New York',
      stateShip: 'NY',
      zipShip: 10022,
      streetAddressBill: '111 muffin street',
      cityBill: 'New York',
      stateBill: 'New York',
      zipBill: 10033
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Generic A',
      price: 229999,
      diameter: 40,
      material: 'Stainless Steel',
      waterproof: true,
      quantity: 20,
      strapColor: 'Black'
    }),
    Product.create({
      name: 'Generic A',
      price: 229999,
      diameter: 42,
      material: 'Stainless Steel',
      waterproof: true,
      quantity: 25,
      strapColor: 'Black'
    }),
    Product.create({
      name: 'Generic B',
      price: 1299999,
      diameter: 40,
      material: 'Yellow Gold',
      waterproof: true,
      quantity: 5,
      strapColor: 'Brown'
    }),
    Product.create({
      name: 'Generic B',
      price: 1299999,
      diameter: 42,
      material: 'Yellow Gold',
      waterproof: true,
      quantity: 6,
      strapColor: 'Brown'
    }),
    Product.create({
      name: 'Generic C',
      price: 1599999,
      diameter: 40,
      material: 'White Gold',
      waterproof: true,
      quantity: 3,
      strapColor: 'Black'
    }),
    Product.create({
      name: 'Generic C',
      price: 1599999,
      diameter: 42,
      material: 'White Gold',
      waterproof: true,
      quantity: 4,
      strapColor: 'Black'
    }),
    Product.create({
      name: 'Generic D',
      price: 5799999,
      diameter: 40,
      material: 'Platinum',
      waterproof: true,
      quantity: 2,
      strapColor: 'Black'
    }),
    Product.create({
      name: 'Generic D',
      price: 5799999,
      diameter: 40,
      material: 'Platinum',
      waterproof: true,
      quantity: 3,
      strapColor: 'Black'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
