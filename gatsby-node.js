const Promise = require('bluebird')
const path = require("path")

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  }

  // when building HTML, window is not defined, so Leaflet causes the build to blow up
  if (stage === "build-html") {
    config.module = {
      rules: [
        {
          test: /mapbox-gl/,
          use: loaders.null(),
        },
      ],
    }
  }

  actions.setWebpackConfig(config)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('./src/templates/page.tsx')
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  header
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulPage.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/${post.node.slug}/`,
            component: pageTemplate,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}