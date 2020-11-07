import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'

import { respondTo } from '../../utils/respondTo'

export const HeaderWrapper = styled.header`
  background: #222222;
  margin-top: -7rem;
  height: 7rem;
  position: fixed;
  width: 100%;
  z-index: 100;

  border-bottom: 2px solid grey;
  .logo {
    display: flex;
    align-items: center;
    svg {
      width: 4rem;
      height: 4rem;
    }
  }
  .nav {
    ${respondTo.tabletMini`
      display: none;
    `}
  }

  .hamburger {
    color: white;
    display: none;
    position: relative;
    .close-icon {
      opacity: 0;
      /* display: none; */
    }

    .close-icon,
    .menu-icon {
      width: 3rem;
      height: 3rem;
      position: absolute;
      right: 0;
      top: -12px;
      transition: all 0.5s;
    }
    ${respondTo.tabletMini`
      display: block;
    `}
  }

  .hamburger-open {
    .menu-icon {
      opacity: 0;
    }
    .close-icon {
      opacity: 1;
    }
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  margin: 0 auto;
  /* max-width: 1280px; */
  height: 100%;
  ul {
    display: flex;
    li {
      line-height: 4rem;
      font-size: 2rem;
      &:not(:last-of-type) {
        padding: 0 2rem;
      }
      a {
        text-transform: uppercase;
      }
    }
  }
`

export const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }
`

export const CartCounter = styled.span`
  background-color: white;
  color: #663399;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  float: right;
  margin: -10px;
  z-index: 20;
`
