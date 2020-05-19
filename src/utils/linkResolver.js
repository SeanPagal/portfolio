// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

exports.linkResolver = function linkResolver(doc) {
  // Route for blog posts
  if (doc.type === "contact_page") {
    return "/contact"
  }

  if (doc.type === "pixel_page") {
    return "/pixel-art"
  }

  // Homepage route fallback
  return "/"
}
