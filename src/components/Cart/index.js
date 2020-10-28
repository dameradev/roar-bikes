import styled from '@emotion/styled'
import React, { useContext } from 'react'

import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'

const CartStyles = styled.div`
  padding: 2rem 0;
  .product-header ul {
    display: flex;
    background: #eee;
    padding: 2rem 1rem;
    margin-bottom: 1rem;
    li {
      width: 15%;
      font-size: 2.4rem;

      &:first-of-type {
        flex-grow: 1;
      }
      &:not(:first-of-type) {
        text-align: left;
      }
    }
  }
`
const CheckoutInformation = styled.div`
  margin-top: 3rem;
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    button {
      width: 100%;
      font-size: 2.5rem;
      justify-self: center;
    }
  }
`
const Cart = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <>
      <CartStyles>
        <div className="product-header">
          <ul>
            <li>Product</li>
            <li>Name</li>
            <li>Price</li>
            <li>Quanitity</li>
            <li>Total</li>
          </ul>
          {lineItems}
        </div>
      </CartStyles>
      <CheckoutInformation>
        <ul>
          <li>
            <h2>Subtotal</h2>
            <p>$ {checkout.subtotalPrice}</p>
          </li>
          <li>
            <h2>Taxes</h2>
            <p>$ {checkout.totalTax}</p>
          </li>
          <li>
            <h2>Total</h2>
            <p>$ {checkout.totalPrice}</p>
          </li>
          <li>
            <button
              onClick={handleCheckout}
              disabled={checkout.lineItems.length === 0}
            >
              Check out
            </button>
          </li>
        </ul>
      </CheckoutInformation>
    </>
  )
}

export default Cart
