import styled from '@emotion/styled'
import React from 'react'
import { CartCounter, MenuLink } from './styles'
import { respondTo } from '../../utils/respondTo'

const NavStyles = styled.nav`
width: 100%;
  /* ${respondTo.tabletMini`
      display: none;
  `} */

  .hamburger {
      color: white;
      display: none;
    ${respondTo.tabletMini`
      display: block;
    `} 
  }
`

const Nav = ({ hasItems, quantity, className }) => {
  return (
    <NavStyles className={className}>
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
    </NavStyles>
  )
}

export default Nav
