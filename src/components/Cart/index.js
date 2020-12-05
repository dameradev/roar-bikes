import styled from '@emotion/styled'
import { Table } from 'react-bootstrap'
import React, { useContext } from 'react'

import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'

import { respondTo } from '../../utils/respondTo'
const CartStyles = styled.div`
  table {
    ${respondTo.tabletMini`
        .img {
          display: none;
        }
    `}
  }
`

const CheckoutInformation = styled.div`
  margin: 5rem 0;
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 2rem;
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
    <CartStyles>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="img"></th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{lineItems}</tbody>
      </Table>

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
    </CartStyles>
  )
}

export default Cart
