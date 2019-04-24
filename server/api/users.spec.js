// /* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'thePug',
        email: codysEmail
      })
    })

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(302)

      expect(res.body).to.be.an('object')
    })
  })
})
