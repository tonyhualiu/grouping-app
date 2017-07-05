import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CartActions from '../actions/add_to_cart';
import Shelf from './shelf';

class Cart extends Component {

  render() {
    console.log(this.props);
    const cartItems = this.props.cart.map((item, idx) => {
      return <li key={idx}>{item}</li>;
    });

    return <div><Shelf
      addItem={this.props.actions.addToCart} />
        {cartItems}
      </div>
  }
}

function mapStateToProps(state, prop) {
  return {
    cart: state.cart,
  }
}

function mapDispaptchToProps(dispatch) {
  return {
    actions: bindActionCreators(CartActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispaptchToProps)(Cart);
