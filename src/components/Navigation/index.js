import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import { CartCounter, Container, MenuLink, HeaderWrapper } from './styles'

import Logo from '../../assets/images/logo.svg'
import { Img } from '../../utils/styles'
import icons from '../../utils/icons'
import Nav from './nav'

import { Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle, isOpenNav, toggleNav }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <HeaderWrapper>
      <Container>
        <MenuLink to="/" className="logo">
          {icons.Logo}
        </MenuLink>

        <Nav
          className="nav"
          isOpenNav={isOpenNav}
          hasItems={hasItems}
          quantity={quantity}
        />
        <div
          className={`hamburger ${isOpenNav && 'hamburger-open'}`}
          onClick={() => toggleNav(isOpenNav)}
        >
          <MenuIcon className="menu-icon" />
          <CloseIcon className="close-icon" />
        </div>
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
