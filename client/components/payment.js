import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {completeOrder} from '../store/cart'
import {connect} from 'react-redux'
// import paymentApi from '../../server/api/checkout'
// import STRIPE_PUBLISHABLE from './constants/stripe'
import PAYMENT_SERVER_URL from '../../server/constants/server'
// elevated this to the CheckoutPage
const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
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
      <div className="checkout">
        <StripeCheckout
          amount={Number(this.props.total)}
          billingAddress
          description="Just a test page!"
          name="Timeless"
          stripeKey="pk_test_BtVtkp5NeH03CaIuy8PkxJE900WxrX8oUQ"
          token={this.onToken()}
          label="Checkout"
          panelLabel="Pay for these jems"
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {completeOrder: cart => dispatch(completeOrder(cart))}
}

export default connect(null, mapDispatchToProps)(Checkout)
