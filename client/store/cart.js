import axios from 'axios'
import store from './index'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

const initialState = {
  cart: [],
  quantity: 0
}
/**
 * ACTION CREATORS
 */

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
    console.log("CURRENT CART", currentCart)
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
    store.getState().cart.cart.map((eachProduct) => {
      dispatch(addToOrder(eachProduct))
    })
    dispatch(clearCart())
    const {data} = await axios.get('/api/orders')
    data.map((eachProduct) => {
      for (let i = 0; i < eachProduct.orders.length; i++) {
        dispatch(addToCart(eachProduct))
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      state.quantity++
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
