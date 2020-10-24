import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import ContextProvider from '~/provider/ContextProvider'

import Navigation from '~/components/Navigation'
import GlobalStyles from '../styles/GlobalStyles'
import Typography from '../styles/Typograpy'

import Logo from '../assets/images/logo.svg'

const Wrapper = styled.main`
  margin: 0 auto;
  margin-top: 12rem;
  /* max-width: 960px; */
  /* padding: 0px 1.0875rem 1.45rem; */
`

const Layout = ({ children }) => {
  return (
    <ContextProvider>
      <GlobalStyles />
      <Typography />

      <Navigation />
      <Wrapper>
        {children}
        <footer>
          {/* © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a> */}
        </footer>
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
