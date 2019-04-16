import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product})

export default function(state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...cart, action.product]
    default:
      return state
  }
}
