import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  UserHome,
  Products,
  Cart,
  Order,
  Home,
  SingleProduct,
  Checkout,
  OrderHistory,
  UpdateUser
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/products" component={Products} />
        {/* <Route path="/cart" component={Cart} /> */}
        <Route exact path="/order" component={Order} />
        <Route path="/home" component={Home} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route path="/payment" component={Checkout} />
        {isLoggedIn && (
          <Switch>
            <Route path="/profile" component={UserHome} />
            <Route exact path="/orders" component={OrderHistory} />
            <Route path="/editProfile" component={UpdateUser} />
          </Switch>
        )}
        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
