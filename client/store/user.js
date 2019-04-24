import axios from 'axios'
import history from '../history'
import {clearCart, reloadCart} from './cart'
import {Navbar} from '../components/navbar'
import React from 'react'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER_HISTORY = 'GET_USER_HISTORY'
const UPDATE_USER = 'UPDATE_USER'

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
const updateUser = userInfo => ({type: UPDATE_USER, userInfo})

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

export const updateUserThunk = (id, userInfo) => async dispatch => {
  try {
    await axios.put(`/api/users/${id}`, userInfo)
    dispatch(updateUser(userInfo))
  } catch (error) {
    console.error(error.message)
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
    localStorage.clear()
    return <Navbar />
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
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.userInfo.firstName,
          lastName: action.userInfo.lastName,
          phoneNumber: action.userInfo.phoneNumber,
          streetAddressShip: action.userInfo.streetAddressShip,
          cityShip: action.userInfo.cityShip,
          stateShip: action.userInfo.stateShip,
          zipShip: action.userInfo.zipShip,
          streetAddressBill: action.userInfo.streetAddressBill,
          cityBill: action.userInfo.cityBill,
          stateBill: action.userInfo.stateBill,
          zipBill: action.userInfo.zipBill
        }
      }
    default:
      return state
  }
}
