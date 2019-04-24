import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {completeOrder} from '../store/cart'
import {connect} from 'react-redux'
import PAYMENT_SERVER_URL from '../../server/constants/server'

const successPayment = () => {
  alert('Payment Successful!')
}

const errorPayment = () => {
  alert('Something went wrong...')
}

class Checkout extends React.Component {
  onToken = () => token => {
    this.props.completeOrder(this.props.cart)
    axios
      .post(PAYMENT_SERVER_URL, {
        source: token.id,
        amount: Number(this.props.total),
        currency: 'USD'
      })
      .then(successPayment)
      .catch(errorPayment)
  }

  render() {
    return (
      <div className="checkout cart__checkout">
          {this.props.total > 0 &&
            <StripeCheckout
              amount={Math.round(Number(this.props.total*100*1.0875))}
              billingAddress
              description="enter 4242 4242 4242 4242 to test"
              name="Timeless"
              stripeKey="pk_test_BtVtkp5NeH03CaIuy8PkxJE900WxrX8oUQ"
              token={this.onToken()}
              label="Checkout"
            />
          }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {completeOrder: cart => dispatch(completeOrder(cart))}
}

export default connect(null, mapDispatchToProps)(Checkout)
