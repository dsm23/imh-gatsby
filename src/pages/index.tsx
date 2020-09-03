import React, { FunctionComponent, ReactNode } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import clsx from 'clsx';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Divisor from '../components/divisor';
import Image from '../components/image';

import {
  ContentfulCardBodyRichTextNodeContent,
  Query,
} from '../../graphql-types';

import styles from './index.module.scss';

interface Props extends PageRendererProps {
  data: Query;
}

const Text: FunctionComponent = ({ children }) => (
  <div className="card-body">
    <p className="card-text">{children}</p>
  </div>
);

const ListItem: FunctionComponent = ({ children }) => (
  <li className="list-group-item">{children}</li>
);

const H4: FunctionComponent = ({ children }) => (
  <div className="card-body">
    <h4 className="card-title">{children}</h4>
  </div>
);

const options = {
  renderNode: {
    [BLOCKS.LIST_ITEM]: (_: any, children: ReactNode) => {
      return <ListItem>{children}</ListItem>;
    },
    [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => {
      return <Text>{children}</Text>;
    },
    [BLOCKS.HEADING_4]: (_: any, children: ReactNode) => {
      return <H4>{children}</H4>;
    },
    [BLOCKS.UL_LIST]: (_: any, children: ReactNode) => {
      return <ul className="list-group list-group-flush">{children}</ul>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: ContentfulCardBodyRichTextNodeContent) => {
      return <Image contentfulId={node?.data?.target?.sys?.contentful_id} />;
    },
  },
  // renderText: text => text.replace('!', '?'),
};

const welcomeOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => {
      return <p className="text-primary">{children}</p>;
    },
  },
};

const Home: FunctionComponent<Props> = ({ data, location }) => {
  const cards = data?.allContentfulCard?.nodes ?? [];

  const welcome = data?.contentfulWelcome;

  return (
    <Layout location={location}>
      <SEO
        description="Home page for IMH. UK distributor for power quality devices. Powerside and Dranetz"
        title="Home"
      />
      <section
        id="imh"
        className="py-2 py-md-4 d-md-flex align-items-md-center"
      >
        <div className={styles.flexItem}>
          <h1>{welcome?.header}</h1>
          {documentToReactComponents(welcome?.body?.json, welcomeOptions)}
        </div>
        <Image
          className={clsx(
            'd-none d-md-block m-md-5 rounded-lg shadow-lg',
            styles.flexItem,
          )}
          contentfulId={welcome?.welcomePic?.contentful_id}
        />
      </section>
      <Divisor />
      <section id="powerside" className="py-2 py-md-4 ">
        <h1>Partnered with Powerside</h1>
        <div className="d-md-flex align-items-md-center">
          <Image
            className={clsx('d-block', styles.flexItem)}
            contentfulId="7sKYayeWgbxL0d549lviAc"
          />
          <div className={styles.flexItem}>
            <h2>PQUBE 3</h2>
            <h3>The World's best power quality recorder</h3>
            <p>
              Real-time analysis of voltage and current connections with daily,
              weekly and monthly trends
            </p>
            <p>
              remote monitoring via smartphone, tablet and desktop - on the web
              without additional software
            </p>
            <p>Detailed reports with self-selectable content, eg EN 50160</p>
            <p>Intuitive installation and operation of power analyzers</p>
          </div>
        </div>
      </section>
      <Divisor />
      <section id="pqube" className="py-2 py-md-4 ">
        <h3>
          PQUBE 3 ANALYZERS OFFER SECURITY, MOBILITY AND SAVINGS POTENTIAL IN
          VARIOUS AREAS OF APPLICATION AND INDUSTRIES.
        </h3>
        <div className="d-flex flex-wrap">
          {cards.map(({ body }) => (
            <div className={clsx('card', styles.flexCard)}>
              {documentToReactComponents(
                {
                  ...(body?.json ?? {}),
                  content: body?.json?.content.slice(0, -1),
                },
                options,
              )}
            </div>
          ))}
        </div>
      </section>
      <Divisor />
      <section id="advice" className="py-2 py-md-4">
        <h3>Great products alone are not everything.</h3>
        <p>
          We offer advice, hardware and software configuration, measurement data
          evaluation and training.
        </p>
      </section>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql<Query>`
  query HomeQuery {
    contentfulWelcome(contentful_id: { eq: "6hcNRRouGi4uD9MGL9WCBx" }) {
      header
      body {
        json
      }
      welcomePic {
        contentful_id
      }
    }
    allContentfulCard {
      nodes {
        body {
          json
        }
      }
    }
  }
`;
