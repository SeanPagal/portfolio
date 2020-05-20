import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Header from "components/Header"
import { ThemeProvider } from "emotion-theming"
import { Global } from "@emotion/core"
import { GlobalStyle } from "../styles/global"
import { theme } from "../styles/theme"
import Helmet from "react-helmet"
import { Box } from "rebass"
import SimpleReactLightbox from "simple-react-lightbox"
import { useMediaQuery } from "react-responsive"
const Layout = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 520px)" })

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          prismic {
            allSite_settingss {
              edges {
                node {
                  background_video {
                    ... on PRISMIC__FileLink {
                      _linkType
                      name
                      url
                      size
                    }
                  }
                  # site_image {
                  #   url
                  # }
                  site_name
                }
              }
            }
          }
        }
      `}
      render={data => (
        <SimpleReactLightbox>
          <ThemeProvider theme={theme}>
            <Global styles={GlobalStyle} />
            {!isMobile && (
              <video playsInline autoPlay muted loop id="bgvid">
                <source
                  src={
                    (data &&
                      data.prismic &&
                      data.prismic.allSite_settingss.edges[0].node
                        .background_video.url) ||
                    ""
                  }
                  type="video/mp4"
                />
              </video>
            )}
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

                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
                />

                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/apple-touch-icon.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/favicon-32x32.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
              </Helmet>
              <div className="Layout">
                <Header />
                <main className="Layout__content">{children}</main>
              </div>
            </Box>
          </ThemeProvider>
        </SimpleReactLightbox>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
