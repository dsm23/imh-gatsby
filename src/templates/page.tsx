import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import { graphql, PageRendererProps } from 'gatsby';
// import { Helmet } from 'react-helmet';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
// import Img from 'gatsby-image'
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  ContentfulCardBodyRichTextNodeContent,
  Query,
} from '../../graphql-types';

import styles from './page.module.scss';

interface Props extends PageRendererProps {
  data: Query;
}

const Bold: FunctionComponent = ({ children }) => (
  <p className="text-primary font-weight-bold">{children}</p>
);

const Text: FunctionComponent = ({ children }) => (
  <p className="text-primary">{children}</p>
);

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: unknown, children: ReactNode) => (
      <Text>{children}</Text>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: ContentfulCardBodyRichTextNodeContent) => {
      return (
        <Image
          className={clsx('img-fluid d-block mx-auto', styles.img)}
          contentfulId={node?.data?.target?.sys?.contentful_id}
        />
      );
    },
  },
  // renderText: text => text.replace('!', '?'),
};

const PageTemplate: FunctionComponent<Props> = ({ data, location }) => {
  const json = data?.contentfulPage?.content?.json ?? {};
  const header = data?.contentfulPage?.header ?? '';

  return (
    <Layout location={location}>
      <SEO description="Test" title={header} />
      <h1>{header}</h1>
      {documentToReactComponents(json, options)}
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql<Query>`
  query PageBySlug($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      header
      content {
        content
        json
      }
    }
  }
`;

//   query BlogPostBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
