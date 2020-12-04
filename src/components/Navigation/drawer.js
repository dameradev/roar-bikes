import styled from 'styled-components'
import React from 'react'
import Nav from './nav'
import useQuantity from '../../utils/useQuantity'

const DrawerStyles = styled.div`
  position: fixed;
  /* top: 0; */
  right: 0;
  height: 100vh;
  /* width: 40vw; */
  padding: 0 3rem 3rem 3rem;

  z-index: 100000;
  background: var(--black);
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  transition: all 0.5s ease-in-out;
  transform: ${props =>
    !props.isOpenNav ? 'translate(200px)' : 'translate(0)'};
  a {
    color: #fff;
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
  const [hasItems, quantity] = useQuantity()
  return (
    <DrawerStyles
      className={`${isOpenNav && 'drawer-open'} drawer`}
      isOpenNav={isOpenNav}
    >
      <Nav
        hasItems={hasItems}
        quantity={quantity}
        className="mobile-nav"
        isOpenNav={isOpenNav}
        toggleNav={toggleNav}
      />
    </DrawerStyles>
  )
}

export default Drawer
