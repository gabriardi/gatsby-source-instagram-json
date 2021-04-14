require(`dotenv`).config()
const instagramData = require(`./instagramSampleData.json`)

module.exports = {
  siteMetadata: {
    title: `gatsby-source-instagram-exaple`,
    author: `@oorestisime`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-instagram-json`,
      options: {
        instagramData: instagramData,
      },
    },
  ],
}
