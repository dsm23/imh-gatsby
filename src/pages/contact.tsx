import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';

import Anchor from '../components/anchor';
import FlexItem from '../components/flex-item';
import Layout from '../components/layout';
import Map from '../components/location-map';
import SEO from '../components/seo';

import 'twin.macro';

const Contact: FunctionComponent<PageRendererProps> = ({ location }) => (
  <Layout location={location}>
    <SEO
      description="Contact page for IMH. UK distributor for power quality devices. Powerside and Dranetz"
      title="Contact"
    />
    <h1 tw="text-black text-4xl">Contact Us</h1>
    <div tw="md:flex justify-between w-full relative">
      <FlexItem as="address" tw="text-gray-900" basis="25%">
        <p>Off Millhead Way</p>
        <p>8 Roach View</p>
        <p>Purdeys Industrial Estate</p>
        <p>Rochford</p>
        <p>Essex</p> <p>SS4 1LB</p>
        <p>
          Email: <Anchor href="mailto:sales@imh.co.uk">sales@imh.co.uk</Anchor>
        </p>
        <p>
          Telephone: <Anchor href="tel:+441702545429">01702 545429</Anchor>
        </p>
      </FlexItem>
      <Map />
    </div>
  </Layout>
);

export default Contact;
