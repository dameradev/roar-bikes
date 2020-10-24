import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import { CartCounter, Container, MenuLink, HeaderWrapper } from './styles'

import Logo from '../../assets/images/logo.svg'
import { Img } from '../../utils/styles'
import icons from '../../utils/icons'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <HeaderWrapper>
      <Container>
        <MenuLink to="/">{icons.Logo}</MenuLink>

        <ul>
          <li>
            <MenuLink to="/">Home</MenuLink>
          </li>
          <li>
            <MenuLink to="/bikes">Bikes</MenuLink>
          </li>
          <li>
            <MenuLink to="/accessories">Accesories</MenuLink>
          </li>
          <li>
            <MenuLink to="/cart">
              {hasItems && <CartCounter>{quantity}</CartCounter>}
              Cart 🛍
            </MenuLink>
          </li>
        </ul>
      </Container>
    </HeaderWrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
