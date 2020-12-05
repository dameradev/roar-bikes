import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { Wrapper } from './styles'
import styled from '@emotion/styled'
import { Delete as DeleteIcon } from '@material-ui/icons'

import Table from 'react-bootstrap/Table'
import { respondTo } from '../../../utils/respondTo'

const LineItemStyles = styled.tr`
  .total {
    min-width: 15rem;
    p {
      display: inline-block;
    }

    svg {
      float: right;
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

  const variantImage = item.variant.image ? (
    <img
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      height="100px"
      width="160px"
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
      <td className="img">
        <Link to={`/product/${item.variant.product.handle}/`}>
          {variantImage}
        </Link>
      </td>
      <td>
        <p>
          {item.title}
          {item.variant.title === !'Default Title' ? item.variant.title : ''}
        </p>
      </td>
      <td>{item.variant.price}</td>
      <td>{item.quantity}</td>
      <td className="total">
        <p>{item.quantity * item.variant.price}.00</p>
        <DeleteIcon onClick={handleRemove}>Remove</DeleteIcon>
      </td>
    </LineItemStyles>
  )
}

export default LineItem
