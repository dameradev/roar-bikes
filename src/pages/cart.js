import styled from '@emotion/styled'
import React from 'react'

import Cart from '~/components/Cart'
import { Container } from '~/utils/styles'

const CartPageStyles = styled.div`
  padding: 0 5%;
  margin-top: 5rem;

  .header {
    padding: 3rem 0;
  }

  h1 {
    font-size: 3rem;
    font-weight: 500;
    text-transform: uppercase;
    padding-bottom: 1rem;
  }
  h3 {
    font-size: 1.6rem;
  }
`

const CartPage = () => (
  <CartPageStyles>
    <div className="header">
      <h1>Your Cart</h1>
      <h3>Conitinue shopping</h3>
    </div>
    <Cart />
  </CartPageStyles>
)

export default CartPage
