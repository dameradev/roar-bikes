import styled from '@emotion/styled'
import React from 'react'
import Nav from './nav'

const DrawerStyles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 0 3rem 3rem 3rem;

  z-index: 100000;
  background: white;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */

  a {
    color: black;
  }
  .x {
    position: absolute;
    top: 0;
    left: 0.5rem;
    margin: 0;
  }
  .mobile-nav {
    display: flex;
    ul {
      display: flex;
      flex-direction: column;
      text-transform: uppercase;
      text-align: center;
      padding: 0;
      li {
        padding: 2rem 0;
      }
    }
  }
`

const Drawer = ({ isOpenNav, toggleNav }) => {
  return (
    <DrawerStyles>
      <p className="x" onClick={() => toggleNav(isOpenNav)}>
        x
      </p>
      <Nav className="mobile-nav"></Nav>
    </DrawerStyles>
  )
}

export default Drawer
