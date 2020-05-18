import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import Footer from "components/Footer"
import Header from "components/Header"
import { ThemeProvider } from "emotion-theming"
import { Global } from "@emotion/core"
import { GlobalStyle } from "../styles/global"
import { theme } from "../styles/theme"
import Helmet from "react-helmet"
import { Box } from "rebass"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />

        <Box maxWidth={1256} width={1} className="layout-container" mx="auto">
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700,900"
              rel="stylesheet"
            />
          </Helmet>
          <div className="Layout">
            {/* <Header /> */}
            <main className="Layout__content">{children}</main>
            {/* <Footer /> */}
          </div>
        </Box>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
