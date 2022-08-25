import React, { FunctionComponent } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { Options } from '@contentful/rich-text-react-renderer';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

import 'twin.macro';

import CardGroup from '../components/card';
import Divisor from '../components/divisor';
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { ContentfulWelcome, Query } from '../../graphql-types';

interface Props extends PageRendererProps {
  data: Query;
}

const ListItem: FunctionComponent = ({ children }) => (
  <>
    {/* <div tw="mt-4 border-t bg-blue-500 w-full" /> */}
    <li className="list-group-item">{children}</li>
  </>
);

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: text => (
      <span tw="text-2xl font-bold text-blue-700">{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.LIST_ITEM]: (_, children) => {
      return <ListItem>{children}</ListItem>;
    },
    [BLOCKS.PARAGRAPH]: (_, children) => {
      return <p tw="mt-4">{children}</p>;
    },
    [BLOCKS.HEADING_4]: (_, children) => {
      return <h4 tw="text-2xl font-bold">{children}</h4>;
    },
    [BLOCKS.UL_LIST]: (_, children) => {
      return <ul tw="ml-5 list-disc">{children}</ul>;
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return <Image contentfulId={node?.data?.target?.contentful_id} />;
    },
  },
  // renderText: text => text.replace('!', '?'),
};

const welcomeOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => {
      return <p tw="text-gray-900 mt-4">{children}</p>;
    },
  },
};

const Home: FunctionComponent<Props> = ({ data, location }) => {
  const cards = data?.allContentfulCard?.nodes ?? [];

  const welcome = data?.contentfulWelcome as ContentfulWelcome;

  return (
    <Layout location={location}>
      <SEO
        description="Home page for IMH. UK distributor for power quality devices. Powerside and Dranetz"
        title="Home"
      />
      <section id="imh" tw="py-2 md:py-4 md:flex md:items-center">
        <div tw="w-full md:w-1/2">
          <h1 tw="text-4xl">{welcome?.header}</h1>
          {/* @ts-ignore */}
          {renderRichText(welcome?.body, welcomeOptions)}
        </div>

        <GatsbyImage
          tw="hidden md:(block w-1/2 m-5) rounded-lg shadow-lg"
          alt={welcome?.welcomePic?.description!}
          image={welcome?.welcomePic?.gatsbyImage}
        />
      </section>
      <Divisor />
      <section id="powerside" tw="py-2 md:py-4 ">
        <h1 tw="text-4xl">Partnered with Powerside</h1>
        <div tw="md:(flex items-center)">
          <Image
            tw="block w-full md:w-1/2"
            contentfulId="7sKYayeWgbxL0d549lviAc"
          />
          <div tw="w-full md:w-1/2">
            <h2 tw="mt-4 text-3xl">PQUBE 3</h2>
            <h3 tw="mt-4 text-xl">The World's best power quality recorder</h3>
            <p tw="mt-3">
              Real-time analysis of voltage and current connections with daily,
              weekly and monthly trends
            </p>
            <p tw="mt-3">
              remote monitoring via smartphone, tablet and desktop - on the web
              without additional software
            </p>
            <p tw="mt-3">
              Detailed reports with self-selectable content, eg EN 50160
            </p>
            <p tw="mt-3">
              Intuitive installation and operation of power analyzers
            </p>
          </div>
        </div>
      </section>
      <Divisor />
      <section id="pqube" tw="py-2 md:py-4">
        <h3>
          PQUBE3 ANALYSERS OFFER SECURITY OF SUPPLY AND SAVINGS POTENTIAL IN
          VARIOUS APPLICATIONS.
        </h3>
        <CardGroup>
          {cards.map(({ body, entryUnused }) => (
            <div
              tw="px-4 py-6 rounded overflow-hidden shadow-lg w-full sm:w-1/2 md:w-1/3"
              key={entryUnused}
            >
              {/* @ts-ignore */}
              {renderRichText(body, options)}
            </div>
          ))}
        </CardGroup>
      </section>
      <Divisor />
      <section id="advice" tw="py-2 md:py-4">
        <h3 tw="text-2xl">Great products deserve great backup</h3>
        <p tw="text-gray-900">
          We offer advice, hardware and software configuration, measurement data
          evaluation, training and post-sales support that is second to none.
        </p>
      </section>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query HomeQuery {
    contentfulWelcome(contentful_id: { eq: "6hcNRRouGi4uD9MGL9WCBx" }) {
      header
      body {
        raw
      }
      welcomePic {
        contentful_id
        description
        gatsbyImage(
          cropFocus: EDGES
          layout: FULL_WIDTH
          placeholder: BLURRED
          width: 192
        )
      }
    }
    allContentfulCard {
      nodes {
        entryUnused
        body {
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
  }
`;
