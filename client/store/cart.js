import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
//const cart = []

const initialState = {
  cart: [],
  quantity: 0
}
/**
 * ACTION CREATORS
 */

export const getCart = products => ({type: GET_CART, products})
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeItem = (product, quantity) => ({
  type: REMOVE_ITEM,
  product,
  quantity
})
export const clearCart = () => ({type: CLEAR_CART})

/**
 * THUNK CREATORS
 */

export const completeOrder = currentCart => dispatch => {
  try {
    currentCart.map(async cartItem => {
      await axios.put('/api/products', cartItem)
    })
    dispatch(clearCart())
  } catch (error) {
    console.error(error)
  }
}

export const addToOrder = product => async dispatch => {
  try {
    await axios.post('/api/products', product)
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.products
    case ADD_TO_CART:
      // console.log('CART', state)
      // console.log('....ACTION.PRODUCT', action.product)
      state.quantity++
      console.log(initialState)
      return {...state, cart: [...state.cart, action.product]}
    case REMOVE_ITEM:
      state.quantity > 1
        ? (state.quantity -= action.quantity)
        : state.quantity--
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.product.id)
      }
    case CLEAR_CART:
      return {...state, cart: [], quantity: 0}
    default:
      return state
  }
}
