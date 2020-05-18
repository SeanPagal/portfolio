import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql, Link } from "gatsby"

import Layout from "components/Layout"
import { Box, Flex, Text, Image } from "rebass"
import { SliceZone } from "../components/SliceZone"

const RenderBody = ({ home, projects, meta }) => (
  <>
    {console.log(home.body)}
    <Helmet
      title={meta.title}
      titleTemplate={`%s | ${meta.title}`}
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
      <Box mt={[15]} maxWidth={560}>
        <Text
          as="h1"
          fontWeight={400}
          textAlign="center"
          color="yellow"
          fontSize="17.6vmin"
          lineHeight={0.8}
          sx={{ textTransform: "uppercase" }}
        >
          {RichText.asText(home.heading)}
        </Text>
      </Box>
      <Box maxWidth={860} mt={[9]}>
        <Text
          as="h2"
          fontWeight={400}
          textAlign="center"
          color="pink"
          sx={{ textTransform: "uppercase" }}
          fontSize="2.6rem"
          lineHeight={1.2}
        >
          {RichText.asText(home.subheading)}
        </Text>
      </Box>
      <Flex>
        {home.social_media.map((item, i) => (
          <a href={item.icon_link.url} key={i}>
            hi
            <Image src="" alt="" />
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
                }
              }
              ... on PRISMIC_Home_pageBodyCategories {
                type
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
