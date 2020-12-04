import React, { useContext } from 'react'

import PropTypes from 'prop-types'

import { CartCounter, Container, MenuLink, HeaderWrapper } from './styles'

import Logo from '../../assets/images/logo.svg'
import CartIcon from '../../assets/images/cart-icon.svg'
import { Img } from '../../utils/styles'
import icons from '../../utils/icons'
import Nav from './nav'

import { Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons'
import useQuantity from '../../utils/useQuantity'

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

        <MenuLink className="cart cart__desktop" to="/cart">
          {hasItems && <CartCounter>{quantity}</CartCounter>}
          Cart <img src={CartIcon} />
        </MenuLink>
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
