import axios from 'axios'
import history from '../history'
import {clearCart, reloadCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER_HISTORY = 'GET_USER_HISTORY'

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  orders: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getUserHistory = orders => ({type: GET_USER_HISTORY, orders})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser.user))
  } catch (err) {
    console.error(err)
  }
}

export const getOrderHistoryThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/all')
    console.log('res in get orders history thunk', res)
    dispatch(getUserHistory(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const auth = (
  firstName,
  lastName,
  email,
  password,
  method
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const login = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password
    })
    dispatch(reloadCart())
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(clearCart())
    history.push('/login')
    localStorage.clear()
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: {}, orders: []}
    case GET_USER_HISTORY:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
