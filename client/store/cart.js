import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeItem = product => ({type: REMOVE_ITEM, product})

/**
 * THUNK CREATORS
 */

export const completeOrder = () => async dispatch => {
  try {
    let currentCart = await dispatch(getCart())
    currentCart.map(async cartItem => {
      await axios.post('/api/products', cartItem)
    })
    dispatch(clearCart())
  } catch (error) {
    console.error(error)
  }
}

export default function(state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('CART', state)
      console.log('....ACTION.PRODUCT', action.product)
      return [...state, action.product]
    case REMOVE_ITEM:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}
