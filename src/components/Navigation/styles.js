import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'

export const HeaderWrapper = styled.header`
  background: black;
  margin-top: -12rem;
  height: 120px;
  position: fixed;
  width: 100%;
  z-index: 100;

  border-bottom: 2px solid grey;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 1280px;
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
