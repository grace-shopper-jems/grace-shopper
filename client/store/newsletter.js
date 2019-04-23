import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_EMAIL = 'ADD_EMAIL'

/**
 * INITIAL STATE
 */
const initialState = ''

/**
 * ACTION CREATORS
 */
const addEmail = email => ({type: ADD_EMAIL, email})

/**
 * THUNK CREATORS
 */
export const addEmailThunk = email => async dispatch => {
  try {
    await axios.post('/api/newsletter', {email})
    dispatch(addEmail(email))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EMAIL:
      return action.email
    default:
      return state
  }
}
