import styled from '@emotion/styled'
import React from 'react'
import { CartCounter, MenuLink } from './styles'
import { respondTo } from '../../utils/respondTo'

import CartIcon from '../../assets/images/cart-icon.svg'

const NavStyles = styled.nav`
  .hamburger {
    color: white;
    display: none;

    ${respondTo.tabletMini`
      display: block;
    `}
  }
`

const Nav = ({ hasItems, quantity, className, toggleNav, isOpenNav }) => {
  console.log(hasItems)
  console.log(quantity)
  return (
    <NavStyles className={className}>
      <ul>
        <li>
          <MenuLink onClick={() => toggleNav(isOpenNav)} to="/">
            Home
          </MenuLink>
        </li>
        <li>
          <MenuLink onClick={() => toggleNav(isOpenNav)} to="/bikes">
            Bikes
          </MenuLink>
        </li>
        <li>
          <MenuLink onClick={() => toggleNav(isOpenNav)} to="/accessories">
            Accesories
          </MenuLink>
        </li>

        <li>
          <MenuLink className="cart cart__mobile" to="/cart">
            {hasItems && <CartCounter>{quantity}</CartCounter>}
            Cart <img src={CartIcon} />
          </MenuLink>
        </li>
      </ul>
    </NavStyles>
  )
}

export default Nav
