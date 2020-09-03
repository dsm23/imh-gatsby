/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require("path");
require('dotenv').config({
  path: `.env`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.',
  );
}

const siteUrl = `http://imh.co.uk`;

module.exports = {
  siteMetadata: {
    title: `IMH Technologies`,
    description: `IMH website page`,
    author: `dsm23`,
    mapboxToken: process.env.MAPBOX_API_TOKEN || '',
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-graphql-codegen`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-typescript`,
    // {
    //   resolve: `gatsby-plugin-typescript`,
    //   options: {
    //     isTSX: true, // defaults to false
    //     jsxPragma: `jsx`, // defaults to "React"
    //     allExtensions: true, // defaults to false
    //   },
    // },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        ignore: ['google-fonts/'],
        // printRejected: true,
        whitelist: [
          'body',
          'html',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Nunito Sans`,
            variants: [`400`, `600`, `700`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
          trackingId: process.env.GA_TRACKING_ID,
          cookieDomain: 'imh.co.uk',
          cookieName: 'imh-ga',
          anonymize: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `IMH Technologies`,
        short_name: `IMH`,
        start_url: `/`,
        background_color: `#319795`,
        theme_color: `#319795`,
        display: `standalone`,
        icon: `src/images/wifi.svg`, // This path is relative to the root of the site.
      },
    },
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`],
      },
    },
  ],
};
