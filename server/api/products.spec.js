/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productName = 'Generic A'
    beforeEach(() => {
      return Product.create({
        name: 'Generic A',
        price: 229999,
        diameter: 40,
        material: 'Stainless Steel',
        waterproof: true,
        quantity: 20,
        strapColor: 'Black'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(productName)
    })
  })
})
