import React, { Fragment } from "react"
import { RichText } from "prismic-reactjs"
import { Box, Flex, Text, Image, Heading } from "rebass"
import Iframe from "react-iframe"
import Masonry from "react-masonry-css"
import ScrollAnimation from "react-animate-on-scroll"
import { SRLWrapper } from "simple-react-lightbox"
import htmlSerializer from "../utils/htmlSerializer"
import { removeCompressionFromPrismicUrl } from "../utils/prismic-configuration"
import ReactAudioPlayer from "react-audio-player"

const breakpointColumnsObj = {
  default: 3,
  1256: 3,
  756: 2,
  512: 1,
}

export const SliceZone = ({ data }) => {
  return data.map((slice, i) => {
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
              maxWidth={slice.primary.max_width || 640}
              mt={[slice.primary.margin_top || "72px"]}
              mb={[slice.primary.margin_bottom || "72px"]}
              sx={{
                textAlign: slice.primary.alignment || "left",
              }}
            >
              <RichText
                render={slice.primary.text}
                htmlSerializer={htmlSerializer}
              />
            </Box>
          </ScrollAnimation>
        )
      case "image_grid":
        return (
          <Box
            className="image-grid"
            width={1}
            key={i}
            mt={[slice.primary.margin_top || "72px"]}
            mb={[slice.primary.margin_bottom || "72px"]}
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
              ".image-grid-column .image-grid-image": {
                /* change div to reference your elements you put in <Masonry> */
                background: "grey",
                marginBottom: "30px",
              },
            }}
          >
            <SRLWrapper>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="image-masonry-grid"
                columnClassName="image-grid-column"
              >
                {slice.fields.map((image, i) => (
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    delay={100}
                    duration={0.6}
                    animateOnce
                    key={i}
                  >
                    <Image
                      className="image-grid-image"
                      src={removeCompressionFromPrismicUrl(image.image.url)}
                      key={i}
                      sx={{ cursor: "pointer" }}
                      loading="lazy"
                    />
                  </ScrollAnimation>
                ))}
              </Masonry>
            </SRLWrapper>
            <Box
              sx={{
                p: {
                  margin: 0,
                  fontSize: "12px",
                  color: "#545454",
                  textAlign: "right",
                },
              }}
            >
              <RichText
                render={slice.primary.caption}
                htmlSerializer={htmlSerializer}
              />
            </Box>
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
            key={i}
            mt={[slice.primary.margin_top || "72px"]}
            mb={[slice.primary.margin_bottom || "72px"]}
          >
            {slice.fields.map((item, i) => (
              <Box
                key={i}
                width={[1, null, "45%"]}
                height={0}
                m={3}
                pt={["56.25%", null, null, "30%"]}
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
        console.log(slice)
        return (
          <Box
            className="categories"
            key={i}
            mt={[slice.primary.margin_top || "72px"]}
            mb={[slice.primary.margin_bottom || "72px"]}
          >
            <ScrollAnimation
              animateIn="fadeInUp"
              delay={300}
              duration={0.8}
              animateOnce
              key={i}
            >
              <Flex
                flexDirection="row"
                width={1}
                justifyContent="center"
                flexWrap="wrap"
              >
                {slice.fields.map((item, i) => (
                  <Fragment key={i}>
                    <Flex
                      flexDirection="column"
                      justifyContent="flex-start"
                      alignItems="center"
                      maxWidth={315}
                      p={3}
                      sx={{ textAlign: "center", iframe: { minHeight: 260 } }}
                    >
                      <Heading
                        color="pink"
                        mb={[9]}
                        variant="heading2"
                        as="h2"
                        minHeight={["30px", null, 90]}
                      >
                        {RichText.asText(item.title)}
                      </Heading>
                      {item.placeholder_image ? (
                        <Image
                          src={item.placeholder_image.url}
                          alt="placeholder_image"
                        />
                      ) : (
                        <>
                          {item.embed_url._linkType === "Link.file" &&
                          item.embed_url.url.includes("mp3") ? (
                            <ReactAudioPlayer
                              src={item.embed_url.url}
                              controls
                              style={{ marginBottom: "20px" }}
                            />
                          ) : (
                            <Iframe url={item.embed_url.url} width="100%" />
                          )}
                          {item.additional_embed_url && (
                            <Iframe
                              url={item.additional_embed_url.url}
                              width="100%"
                            />
                          )}
                        </>
                      )}
                      {item.copy && (
                        <Text marginTop="20px">
                          {RichText.asText(item.copy)}
                        </Text>
                      )}
                    </Flex>
                  </Fragment>
                ))}
              </Flex>
            </ScrollAnimation>
          </Box>
        )
      case "text_with_image":
        return (
          <Box
            key={i}
            className="text-with-images"
            maxWidth={1140}
            width={1}
            mt={[slice.primary.margin_top || "72px"]}
            mb={[slice.primary.margin_bottom || "72px"]}
          >
            <Flex flexDirection="column" justifyContent="flex-start" width={1}>
              <Text fontSize={["32px"]} fontWeight="bold">
                {RichText.asText(slice.primary.heading1)}
              </Text>
              <Text sx={{ p: { fontSize: "24px" } }} margin="0">
                {slice.primary.copy && (
                  <RichText
                    render={slice.primary.copy}
                    htmlSerializer={htmlSerializer}
                  />
                )}
              </Text>
              <Flex flexDirection="column">
                {slice.fields.map((item, i) => (
                  <Image
                    loading="lazy"
                    src={removeCompressionFromPrismicUrl(item.image.url)}
                    width={item.image.dimensions.width}
                    key={i}
                    my={8}
                  />
                ))}
              </Flex>
            </Flex>
          </Box>
        )
      default:
        return null
    }
  })
}
