import React from "react"
import { RichText } from "prismic-reactjs"
import { Box, Flex } from "rebass"

export const SliceZone = ({ data }) =>
  data.map(slice => {
    // Render the right markup for a given slice type
    switch (slice.type) {
      // Featured Items Slice
      case "text":
        return <Box width={1}>{RichText.render(slice.primary.text)}</Box>
      // Text Slice
      case "4":
        return <h1>text</h1>
    }
  })
