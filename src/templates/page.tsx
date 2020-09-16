import React, { FunctionComponent } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import Anchor from '../components/anchor';
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  ContentfulCardBodyRichTextNodeContent,
  Query,
} from '../../graphql-types';

import 'twin.macro';

interface Props extends PageRendererProps {
  data: Query;
}

const Bold: FunctionComponent = ({ children }) => (
  <span tw="text-gray-900 font-bold">{children}</span>
);

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p tw="mt-2 text-gray-900">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul tw="my-2 list-disc list-outside">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li tw="ml-8">{children}</li>,
    [BLOCKS.EMBEDDED_ASSET]: (node: ContentfulCardBodyRichTextNodeContent) => (
      <Image
        tw="text-center shadow-lg mx-auto max-w-screen-md"
        contentfulId={node?.data?.target?.sys?.contentful_id}
      />
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri}>{children}</Anchor>
    ),
  },
  // renderText: text => text.replace('!', '?'),
};

const PageTemplate: FunctionComponent<Props> = ({ data, location }) => {
  const json = data?.contentfulPage?.content?.json ?? {};
  const header = data?.contentfulPage?.header ?? '';

  return (
    <Layout location={location}>
      <SEO description="Test" title={header} />
      <h1 tw="text-4xl">{header}</h1>
      <div tw="mb-4">{documentToReactComponents(json, options)}</div>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
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
