import React from "react"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import { Box, Flex, Heading } from "rebass"
import { SliceZone } from "../components/SliceZone"

const RenderBody = ({ home, meta }) => (
  <>
    <Helmet
      title="Sean Pagal"
      titleTemplate={`%s | Pixel Art`}
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
        {home.heading && (
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
        )}
      </Box>
      {home.subheading && (
        <Box maxWidth={1156} mt={[9]}>
          <Heading as="h2" variant="heading2" textAlign="center">
            {RichText.asText(home.subheading)}
          </Heading>
        </Box>
      )}
      <SliceZone data={home.body} />
    </Flex>
  </>
)

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allClient_pages.edges.slice(0, 1).pop()
  const meta = data.site.siteMetadata

  if (!doc) return null

  return (
    <Layout>
      <RenderBody home={doc.node} meta={meta} />
    </Layout>
  )
}

export const query = graphql`
  {
    prismic {
      allClient_pages {
        edges {
          node {
            heading
            subheading
            body {
              __typename
              ... on PRISMIC_Client_pageBodyText {
                type
                primary {
                  text
                  alignment
                  margin_top
                  margin_bottom
                  max_width
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
