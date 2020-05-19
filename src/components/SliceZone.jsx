import React from "react"
import { RichText } from "prismic-reactjs"
import { Box, Flex, Text, Image, Heading } from "rebass"
import Iframe from "react-iframe"
import Masonry from "react-masonry-css"
import ScrollAnimation from "react-animate-on-scroll"

const breakpointColumnsObj = {
  default: 3,
  1256: 3,
  756: 2,
  512: 1,
}

export const SliceZone = ({ data }) =>
  data.map((slice, i) => {
    switch (slice.type) {
      case "text":
        return (
          <ScrollAnimation
            animateIn="fadeInUp"
            delay={200}
            duration={0.8}
            animateOnce
            key={i}
          >
            <Box
              className="text"
              width={1}
              maxWidth={640}
              mt={[slice.primary.margin_top || "72px"]}
              mb={[slice.primary.margin_bottom || "72px"]}
              sx={{
                textAlign: "center",
              }}
            >
              {RichText.render(slice.primary.text)}
            </Box>
          </ScrollAnimation>
        )
      case "image_grid":
        return (
          <Box
            className="image-grid"
            width={1}
            key={i}
            sx={{
              ".image-masonry-grid": {
                display: "flex",
                marginLeft: "-30px" /* gutter size offset */,
                width: "auto",
              },
              ".image-grid-column": {
                paddingLeft: "30px" /* gutter size */,
                backgroundClip: "padding-box",
              },
              ".my-masonry-grid_column > .image-grid-image": {
                /* change div to reference your elements you put in <Masonry> */
                background: "grey",
                marginBottom: "30px",
              },
            }}
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="image-masonry-grid"
              columnClassName="image-grid-column"
            >
              {slice.fields.map((image, i) => (
                <Image
                  className="image-grid-image"
                  src={image.image.url}
                  key={i}
                />
              ))}
            </Masonry>
          </Box>
        )
      case "video_grid":
        return (
          <Flex
            className="video-grid"
            flexDirection={["column", null, null, "row"]}
            width={1}
            justifyContent="center"
            flexWrap="wrap"
            width={1}
            key={i}
          >
            {slice.fields.map((item, i) => (
              <Box
                key={i}
                width={[1, null, "45%"]}
                height={0}
                m={3}
                pt={["56.25%", null, null, "36%"]}
                sx={{
                  position: "relative",
                  overflow: "hidden",

                  iframe: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <Iframe url={item.embed_url.url} allowFullScreen />
              </Box>
            ))}
          </Flex>
        )
      case "categories":
        return (
          <Box className="categories" key={i}>
            <Flex
              flexDirection="row"
              width={1}
              justifyContent="center"
              flexWrap="wrap"
            >
              {slice.fields.map((item, i) => (
                <Box key={i} maxWidth={315} p={3} sx={{ textAlign: "center" }}>
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
      case "text_with_image":
        return (
          <Box className="text-with-images" maxWidth={1140} width={1}>
            <Flex flexDirection="column" justifyContent="flex-start" width={1}>
              <Text>{RichText.render(slice.primary.heading1)}</Text>
              <Text>{RichText.render(slice.primary.copy)}</Text>
              <Flex flexDirection="column">
                {slice.fields.map((item, i) => (
                  <Image
                    src={item.image.url}
                    width={item.image.dimensions.width}
                    key={i}
                    my={8}
                  />
                ))}
              </Flex>
            </Flex>
          </Box>
        )
    }
  })
