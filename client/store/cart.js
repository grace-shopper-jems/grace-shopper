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

export const getCart = (products) => ({type: GET_CART, products})
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
      await axios.put('/api/orders', cartItem)
    })
    localStorage.clear()
    dispatch(clearCart())
  } catch (error) {
    console.error(error)
  }
}

export const addToOrder = product => async dispatch => {
  try {
    await axios.post('/api/orders', product)
  } catch (error) {
    console.error(error)
  }
}

export const deleteItems = (product, quantity) => async dispatch => {
  try {
    dispatch(removeItem(product, quantity))
    for (let i = 0; i < quantity; i++) {
      await axios.delete(`/api/orders/${product.id}`)
    }
  } catch (error) {
    console.error(error)
  }
}

export const reloadCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    console.log("THIS IS THE ORDER DATA", data)
    dispatch(getCart(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: [action.products]}
    case ADD_TO_CART:
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
