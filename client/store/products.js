import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const productState = {
  allProducts: [],
  singleProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const getOneProduct = product => ({type: SINGLE_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const setProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleProduct = productid => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productid}`)
    dispatch(getOneProduct(data))
  } catch (error) {
    console.error(error.message)
  }
}

export default function(state = productState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.products}
    case SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}
