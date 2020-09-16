import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img, { GatsbyImageProps, FluidObject } from 'gatsby-image';

import { Query, ContentfulAsset } from '../../../graphql-types';

type Props = Omit<GatsbyImageProps, 'fixed'> & {
  contentfulId: ContentfulAsset['contentful_id'];
};

const Image: FunctionComponent<Props> = ({ contentfulId, ...props }) => {
  const { allContentfulAsset } = useStaticQuery<Query>(
    graphql`
      query queryForAsset {
        allContentfulAsset {
          nodes {
            contentful_id
            description
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    `,
  );

  const image = allContentfulAsset.nodes.find(
    (node: ContentfulAsset) => node.contentful_id === contentfulId,
  );

  return (
    <Img
      {...props}
      alt={image?.description as string}
      fluid={image?.fluid as FluidObject}
    />
  );
};

export default Image;
