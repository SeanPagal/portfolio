module.exports = {
  siteMetadata: {
    title: `Sean Pagal`,
    description: `AUDIO ENGINEER // VIDEO EDITOR // VISUAL ARTIST`,
    author: `Sean Pagal | seanpagal.com`,
    image: "/images/favicon.ico",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/fonts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "sean-portfolio", // (REQUIRED, replace with your own)
        path: "/preview",
        previews: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sean Pagal Portfolio`,
        short_name: `Pagal`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/android-chrome-512x512.png`, // This path is relative to the root of the site.
      },
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
        head: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
