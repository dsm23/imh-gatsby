import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { PageRendererProps } from 'gatsby';
import Layout from '../components/layout';
import Map from '../components/locationMap';
import SEO from '../components/seo';

import styles from './contact.module.scss';

const Contact: FunctionComponent<PageRendererProps> = ({ location }) => (
  <Layout location={location}>
    <SEO
      description="Contact page for IMH. UK distributor for power quality devices. Powerside and Dranetz"
      title="Contact"
    />
    <h1>Contact Us</h1>
    <div className="d-md-flex justify-content-between w-100 position-relative">
      <address className={clsx('w-100', styles.address)}>
        <p>Off Millhead Way</p>
        <p>8 Roach View</p>
        <p>Purdeys Industrial Estate</p> <p>Rochford</p>
        <p>Essex</p> <p>SS4 1LB</p>
        <p>
          Email: <a href="mailto:sales@imh.co.uk">sales@imh.co.uk</a>
        </p>
        <p>
          Telephone: <a href="tel:+441702545429">01702 545429</a>
        </p>
      </address>
      <Map />
    </div>
  </Layout>
);

export default Contact;
