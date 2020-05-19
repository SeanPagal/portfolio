import React from "react"
import { navigate } from "gatsby-link"
import Layout from "../components/Layout"
import Helmet from "react-helmet"
import { Box, Flex, Heading } from "rebass"
import { RichText } from "prismic-reactjs"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const RenderBody = ({ home, meta }) => {
  const [state, setState] = React.useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
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
              fontSize="17.6vmin"
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

        <form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your name:
              <br />
              <input type="text" name="name" onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your email:
              <br />
              <input type="email" name="email" onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Message:
              <br />
              <textarea name="message" onChange={handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </Flex>
    </>
  )
}

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allContact_pages.edges.slice(0, 1).pop()
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
      allContact_pages {
        edges {
          node {
            heading
            subheading
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
