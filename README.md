<div align="center">
<h1>gatsby-source-instagram-json</h1>
</div>

Source plugin for sourcing data from an Instagram **JSON response**.
Simplified and readapted from the [gatsby-source-instagram](https://github.com/oorestisime/gatsby-source-instagram) plugin from [Orestis Ioannou](https://github.com/oorestisime).

The plugin creates the necessary Gatsby GraphQL nodes of an Instagram account from a local JSON file.

This is to avoid problems with public scraping, since Instagram is protected by a login wall.

# Table of Contents

- [Install](#install)
- [How to use](#how-to-use)
- [How to query](#how-to-query)
  - [Posts](#posts)
- [Image processing](#image-processing)

## Install

`npm install gatsby-source-instagram-json`

## How to use

- ### To use this public scraping method you will need the Instagram User id of the account you want to scrape. You can determine it by taking the following steps:

1. Open a browser and go to the Instagram page of the user – e.g. https://www.instagram.com/oasome.blog/
1. Right-click on the web page to open the right-click context menu and select Page Source / View page source / Show Page Source. Safari users, please make sure that the developer tools are enabled – see [Enabling Web Inspector - Apple Developer](https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/Web_Inspector_Tutorial/EnableWebInspector/EnableWebInspector.html)
1. Search for `profilePage_`. The number that follows is the username id. If you view the page source of https://www.instagram.com/oasome.blog/, you will find `profilePage_8556131572`. So, `8556131572` is the username id of the username `oasome.blog`.

- ### Query the instagram API from your browser. If necessary, login to your instagram account.

Query:

`https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"USER_ID","first":100,"after":null}`

Example:

[https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"8556131572","first":100,"after":null}](https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"8556131572","first":100,"after":null})

- ### Save the whole response (copy & paste) into a .json file

  For example copy paste the response into instagramData.json and save it at the root of your Gatsby project

- ### Configure the plugin in your gatsby-config.js as follows

```javascript
// At the top of your gatsby-config.js
const instagramData = require("./instagramData.json")
```

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-instagram-json`,
    options: {
      instagramData: instagramData,
    },
  },
]
```

## How to query

### Posts

The plugin tries to provide uniform results regardless of the way you choose to retrieve the information

Common fields include:

- id
- likes
- original
- timestamp
- comments
- caption
- username
- preview
- mediaType
- permalink
- carouselImages
- thumbnails
- dimensions

```graphql
query {
  allInstaNode {
    edges {
      node {
        id
        likes
        comments
        mediaType
        preview
        original
        timestamp
        caption
        localFile {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        thumbnails {
          src
          config_width
          config_height
        }
        dimensions {
          height
          width
        }
      }
    }
  }
}
```

## Image processing

To use image processing you need gatsby-transformer-sharp, gatsby-plugin-sharp and their dependencies gatsby-image and gatsby-source-filesystem in your gatsby-config.js.

You can apply image processing on each instagram node. To access image processing in your queries you need to use the localFile on the **InstaNode** as shown above.
