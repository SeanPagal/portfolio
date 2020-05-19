import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import { Box, Flex, Image, Heading } from "rebass"
import { SliceZone } from "../components/SliceZone"

const RenderBody = ({ home, meta }) => (
  <>
    <Helmet
      title={meta.title}
      titleTemplate={`${meta.title}`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: meta.title,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: meta.author,
        },
        {
          name: `twitter:title`,
          content: meta.title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ].concat(meta)}
    />
    <Flex
      flexDirection="column"
      width={1}
      justifyContent="center"
      alignItems="center"
    >
      <Box mt={["48px", null, "48px"]} maxWidth={1156}>
        <Heading
          as="h1"
          fontWeight={400}
          textAlign="center"
          color="yellow"
          fontSize="16vmin"
          lineHeight={1}
          sx={{ textTransform: "uppercase" }}
        >
          {RichText.asText(home.heading)}
        </Heading>
      </Box>
      <Box maxWidth={1156} mt={[9]}>
        <Heading as="h2" variant="heading2" textAlign="center">
          {RichText.asText(home.subheading)}
        </Heading>
      </Box>
      <Flex flexDirection="row" mt={8}>
        {home.social_media.map((item, i) => (
          <a href={item.icon_link.url} key={i} target="_blank" rel="noreferrer">
            <Image
              src={item.icon.url}
              alt={item.icon.alt || ""}
              width={[30, 50]}
              mx={4}
            />
          </a>
        ))}
      </Flex>
      <SliceZone data={home.body} />
    </Flex>
  </>
)

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHome_pages.edges.slice(0, 1).pop()
  const meta = data.site.siteMetadata

  if (!doc) return null

  return (
    <Layout>
      <RenderBody home={doc.node} meta={meta} />
    </Layout>
  )
}

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismic {
      allHome_pages {
        edges {
          node {
            heading
            subheading
            social_media {
              icon
              icon_link {
                ... on PRISMIC__ExternalLink {
                  url
                }
              }
            }
            body {
              __typename
              ... on PRISMIC_Home_pageBodyText {
                type
                primary {
                  text
                  alignment
                  margin_top
                  margin_bottom
                }
              }
              ... on PRISMIC_Home_pageBodyCategories {
                type
                primary {
                  margin_top
                  margin_bottom
                }
                fields {
                  title
                  embed_url {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  placeholder_image
                }
              }
              ... on PRISMIC_Home_pageBodyVideo_grid {
                type
                primary {
                  margin_top
                  margin_bottom
                }
                fields {
                  embed_url {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                }
              }
              ... on PRISMIC_Home_pageBodyImage_grid {
                type
                primary {
                  caption
                  margin_top
                  margin_bottom
                }
                fields {
                  image
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
