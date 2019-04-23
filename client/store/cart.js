import axios from 'axios'
import store from './index'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_SINGLE_ITEM = 'REMOVE_SINGLE_ITEM'
const ADD_SINGLE_ITEM = 'ADD_SINGLE_ITEM'

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
export const removeSingleItem = product => ({
  type: REMOVE_SINGLE_ITEM,
  product
})
export const addSingleItem = product => ({
  type: ADD_SINGLE_ITEM,
  product
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

export const deleteSingleItem = product => async dispatch => {
  try {
    dispatch(removeSingleItem(product))
    await axios.delete(`/api/orders/${product.id}`)
  } catch (error) {
    console.error(error)
  }
}

export const incrementSingleItem = product => async dispatch => {
  try {
    dispatch(addSingleItem(product))
    await axios.post('/api/orders', product)
  } catch (error) {
    console.error(error)
  }
}

export const reloadCart = () => async dispatch => {
  try {
    store.getState().cart.cart.map(eachProduct => {
      dispatch(addToOrder(eachProduct))
    })
    dispatch(clearCart())
    const {data} = await axios.get('/api/orders')
    data.map(eachProduct => {
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
    case REMOVE_SINGLE_ITEM:
      state.quantity--
      let newCart = state.cart.slice()
      for (let i = newCart.length - 1; i > -1; i--) {
        let item = newCart[i]
        if (item.id === action.product.id) {
          newCart.splice(i, 1)
          break
        }
      }
      return {...state, cart: newCart}
    case ADD_SINGLE_ITEM:
      state.quantity++
      return {...state, cart: [...state.cart, action.product]}
    case CLEAR_CART:
      return {...state, cart: [], quantity: 0}
    default:
      return state
  }
}
