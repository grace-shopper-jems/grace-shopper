import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'

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

const deleteItem = productid => ({type: DELETE_ITEM, productid})

const updateItem = (productid, input) => ({type: UPDATE_ITEM, productid, input})

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

export const deleteProduct = productid => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/products/${productid}`)
    dispatch(deleteItem(productid))
  } catch (error) {
    console.error(error.message)
  }
}

export const updateProduct = (productid, input) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${productid}`, input)
    dispatch(updateItem(productid, data))
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
    case DELETE_ITEM:
      let newProductsArr = state.allProducts.filter(
        product => product.id !== action.productid
      )
      return {...state, allProducts: newProductsArr}
    case UPDATE_ITEM:
      let updatedProducts = state.allProducts.filter(
        product =>
          product.id === action.productid ? {...product, input} : product
      )
      return {
        ...state,
        allProducts: updatedProducts,
        singleProduct: action.input
      }
    default:
      return state
  }
}
