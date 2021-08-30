import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import * as actions from '../actions'


class Payments extends Component {
  render () {
    return (
        <StripeCheckout // by default it use dollars in amount
            name="Emaily"
            description="$5 for 5 email credits"
            amount={500}  // the amount is in cents, 5 dollars is 500 cents
            token={token => this.props.handleToken(token)} // token is expecting to receive a callback function that callback function will be called after we have successfully retrieved a authorization token from the Stripe API
            stripeKey={process.env.REACT_APP_STRIPE_KEY } // this is a publishable key. variable is injected into this kind of slot right here when REACT app is actually built by create app.
        >
          <button className="btn">
            Add Credits
          </button>
          </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments)