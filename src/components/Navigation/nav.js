import styled from '@emotion/styled'
import React from 'react'
import { CartCounter, MenuLink } from './styles'
import { respondTo } from '../../utils/respondTo'

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
          <MenuLink onClick={() => toggleNav(isOpenNav)} to="/cart">
            {hasItems && <CartCounter>{quantity}</CartCounter>}
            Cart 🛍
          </MenuLink>
        </li>
      </ul>
    </NavStyles>
  )
}

export default Nav
