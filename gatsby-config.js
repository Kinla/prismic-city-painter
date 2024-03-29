require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },  
    },
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'cpdemo', // (REQUIRED, replace with your own)
        accessToken: `${process.env.API_KEY}`, // (optional API access token)
        path: '/preview', // (optional preview path. Default: /preview)
        previews: true, // (optional, activated Previews. Default: false)
        pages: [{ // (optional, builds pages dynamically)
          type: 'Service',         // TypeName from prismic
          match: '/service/:uid',  // Pages will be generated under this pattern
          path: '/services',        // Placeholder page for unpublished documents
          component: require.resolve('./src/templates/service.js'),
        }],
      }
    }    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,	
  ],
}
