import React from "react"
import { RichText } from "prismic-reactjs"
import { Box, Flex, Text, Image, Heading } from "rebass"
import Iframe from "react-iframe"

export const SliceZone = ({ data }) =>
  data.map((slice, i) => {
    switch (slice.type) {
      case "text":
        return (
          <Box className="text" width={1} maxWidth={640} key={i}>
            {RichText.render(slice.primary.text)}
          </Box>
        )
      case "image_grid":
        return <Box className="image-grid">timage gridext</Box>
      case "video_grid":
        return <Box className="video-grid">video grid</Box>
      case "categories":
        return (
          <Box className="video-grid">
            <Flex
              flexDirection="row"
              width={1}
              justifyContent="center"
              flexWrap="wrap"
            >
              {slice.fields.map((item, i) => (
                <Box key={i} maxWidth={280} p={3} sx={{ textAlign: "center" }}>
                  <Heading color="pink" mb={[9]} variant="heading2" as="h2">
                    {RichText.asText(item.title)}
                  </Heading>
                  {item.placeholder_image ? (
                    <Image
                      src={item.placeholder_image.url}
                      alt="placeholder_image"
                    />
                  ) : (
                    <Iframe url={item.embed_url.url} width="100%" />
                  )}
                </Box>
              ))}
            </Flex>
          </Box>
        )
    }
  })
