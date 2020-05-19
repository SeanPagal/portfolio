import React, { useState } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Footer from "components/Footer"
import Header from "components/Header"
import { ThemeProvider } from "emotion-theming"
import { Global } from "@emotion/core"
import { GlobalStyle } from "../styles/global"
import { theme } from "../styles/theme"
import Helmet from "react-helmet"
import { Box } from "rebass"
import YouTube from "react-youtube"

const Layout = ({ children }) => {
  const [videoOpacity, setVideoOpacity] = useState(0)

  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
    },
  }

  return (
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
          <div className="video-background" style={{ opacity: videoOpacity }}>
            <div className="video-foreground">
              <YouTube
                videoId="U-sgYMB2Pm0"
                opts={videoOptions}
                className="video-iframe"
                onReady={() => {
                  setVideoOpacity(0.51)
                }}
              />
            </div>
          </div>
          <Box
            maxWidth={1536}
            width={1}
            className="layout-container"
            mx="auto"
            px={5}
          >
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
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
