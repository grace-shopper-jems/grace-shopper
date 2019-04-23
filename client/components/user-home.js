import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Admin from './admin'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log('USER HOME PROPS', props)
  const {email} = props

  return (
    <div className="userHome">
      <h3>Welcome, {email}</h3>
      <Link to="/editProfile" className="singleLink">
        Edit Profile
      </Link>
      <Link to="/orders" className="singleLink">
        Order History
      </Link>
      {props.user.isAdmin && <Admin />}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.user,
    email: state.user.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
