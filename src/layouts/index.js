import React, { useEffect, useState } from 'react'
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
  margin-top: 7rem;
  /* max-width: 960px; */
  /* padding: 0px 1.0875rem 1.45rem; */
`

const Layout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = navOpen => {
    setNavOpen(!navOpen)
  }

  useEffect(() => {
    const scrollY = children.props.location.state?.scrollY
    if (scrollY > 0) {
      window.scrollTo(0, scrollY)
    }
  })

  return (
    <ContextProvider>
      <GlobalStyles />
      <Typography />

      <Navigation toggleNav={toggleNav} isOpenNav={navOpen} />
      <Drawer has toggleNav={toggleNav} isOpenNav={navOpen} />
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
