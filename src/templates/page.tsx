import React, { FunctionComponent } from "react";
import { graphql, PageRendererProps } from "gatsby";
import { Options } from "@contentful/rich-text-react-renderer";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

import "twin.macro";

import Anchor from "../components/anchor";
import Image from "../components/image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Query } from "../../graphql-types";

interface Props extends PageRendererProps {
  data: Query;
}

const Bold: FunctionComponent = ({ children }) => (
  <span tw="text-gray-900 font-bold">{children}</span>
);

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 tw="mt-4 font-medium text-2xl text-gray-900">{children}</h2>
    ),

    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p tw="mt-2 text-gray-900">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul tw="my-2 list-disc list-outside">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li tw="ml-8">{children}</li>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <Image
        tw="text-center shadow-lg mx-auto max-w-screen-md"
        contentfulId={node?.data?.target?.contentful_id}
      />
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri}>{children}</Anchor>
    ),
  },
  // renderText: text => text.replace('!', '?'),
};

const PageTemplate: FunctionComponent<Props> = ({ data, location }) => {
  const body = data?.contentfulPage?.content;
  const header = data?.contentfulPage?.header ?? "";

  return (
    <Layout location={location}>
      <SEO description="Test" title={header} />
      <h1 tw="text-4xl">{header}</h1>
      {/* @ts-ignore */}
      <div tw="mb-4">{renderRichText(body, options)}</div>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      header
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
          }
        }
      }
    }
  }
`;
