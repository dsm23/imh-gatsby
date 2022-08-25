import path from 'path';
import type { GatsbyNode } from 'gatsby';
import type { Query } from './graphql-types';

type Config = {
  resolve: object;
  module: object | undefined;
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
  loaders,
}) => {
  const config: Config = {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },

    module: undefined,
  };

  // when building HTML, window is not defined, so Leaflet causes the build to blow up
  if (stage === 'build-html') {
    config.module = {
      rules: [
        {
          test: /mapbox-gl/,
          use: loaders.null(),
        },
      ],
    };
  }

  actions.setWebpackConfig(config);
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  try {
    const pageTemplate = path.resolve('./src/templates/page.tsx');

    const result = await graphql<Query>(
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
      `,
    );

    if (result.errors) {
      reporter.panicOnBuild(
        `There was an error loading your Contentful posts`,
        result.errors,
      );
      return;
    }

    const posts = result.data?.allContentfulPage.edges ?? [];

    posts.forEach(post => {
      createPage({
        path: `/${post.node.slug}/`,
        component: pageTemplate,
        context: {
          slug: post.node.slug,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
};
