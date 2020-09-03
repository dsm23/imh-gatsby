import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import RobotSVG from '../components/svgs/robot404';

const NotFoundPage: FunctionComponent<PageRendererProps> = ({ location }) => (
  <Layout location={location}>
    <SEO title="404: Not found" />
    <h1 className="sr-only">Not Found</h1>
    <RobotSVG />
  </Layout>
);

export default NotFoundPage;
