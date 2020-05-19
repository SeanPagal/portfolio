import React, { useState } from "react"
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
import Iframe from "react-iframe"
import YouTube from "react-youtube"
import { useWindowSize } from "../utils/useWindowSize"

const Layout = ({ children }) => {
  const [videoOpacity, setVideoOpacity] = useState(0)
  const size = useWindowSize()

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
            <Box
              className="background-overlay"
              width={1}
              sx={{
                background: "#000",
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -99,
                opacity: videoOpacity,
                iframe: {
                  visibility: "visible",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: -2,
                  marginTop: "-200px",
                },
              }}
            >
              <YouTube
                videoId="U-sgYMB2Pm0"
                opts={{
                  playerVars: {
                    controls: 0,
                    autoplay: 1,
                    rel: 0,
                    mute: 1,
                    loop: 1,
                    playsinline: 1,
                    modestbranding: 1,
                    allowfullscreen: 1,
                  },
                }}
                onReady={() => {
                  setVideoOpacity(0.51)
                }}
              />
            </Box>
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
