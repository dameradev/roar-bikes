import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import ContextProvider from '~/provider/ContextProvider'

import Navigation from '~/components/Navigation'
import GlobalStyles from '../styles/GlobalStyles'
import Typography from '../styles/Typograpy'

import Logo from '../assets/images/logo.svg'
import Footer from '../components/Footer'
import Drawer from '../components/Navigation/drawer'

const Wrapper = styled.main`
  margin: 0 auto;
  margin-top: 12rem;
  /* max-width: 960px; */
  /* padding: 0px 1.0875rem 1.45rem; */
`

const Layout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = navOpen => {
    setNavOpen(!navOpen)
  }

  return (
    <ContextProvider>
      <GlobalStyles />
      <Typography />

      <Navigation toggleNav={toggleNav} isOpenNav={navOpen} />
      {navOpen && <Drawer toggleNav={toggleNav} isOpenNav={navOpen} />}
      <Wrapper>
        {children}
        <Footer />
      </Wrapper>
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

{
  /* <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => ()}
        /> */
}
