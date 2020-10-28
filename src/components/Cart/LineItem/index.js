import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { Wrapper } from './styles'
import styled from '@emotion/styled'
import { Delete as DeleteIcon } from '@material-ui/icons'

const LineItemStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  &:nth-of-type(2) {
    background: #eee;
  }
  a {
    flex-grow: 1;
    img {
      width: 20rem;
      height: auto;
    }
  }
  p {
    width: 15%;
    text-align: left;
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      width: 3rem;
      height: 3rem;
    }
  }
`
const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  console.log(item, 'item')
  const variantImage = item.variant.image ? (
    <img
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      height="60px"
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  return (
    <LineItemStyles>
      {console.log(item)}
      <Link to={`/product/${item.variant.product.handle}/`}>
        {variantImage}
      </Link>

      <p>
        {item.title}
        {`  `}
        {item.variant.title === !'Default Title' ? item.variant.title : ''}
      </p>
      <p>$ {item.variant.price}</p>
      {/* <p>{item.price}</p> */}
      {/* {selectedOptions} */}

      <p>{item.quantity}</p>
      <p className="total">
        $ {item.quantity * item.variant.price}.00
        <DeleteIcon onClick={handleRemove}>Remove</DeleteIcon>
      </p>
    </LineItemStyles>
  )
}

export default LineItem
