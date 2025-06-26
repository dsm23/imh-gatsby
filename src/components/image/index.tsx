import React, { FunctionComponent } from "react";
import { useStaticQuery, graphql } from "gatsby";
// import Img, { GatsbyImageProps, FluidObject } from 'gatsby-image';
import { GatsbyImage } from "gatsby-plugin-image";

import { Query, ContentfulAsset } from "../../../graphql-types";

// type Props = Omit<GatsbyImageProps, 'fixed'> & {
//   contentfulId: ContentfulAsset['contentful_id'];
// };

type Props = any;

const Image: FunctionComponent<Props> = ({ contentfulId, ...props }) => {
  const { allContentfulAsset } = useStaticQuery<Query>(graphql`
    query queryForAsset {
      allContentfulAsset {
        nodes {
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
    }
  `);

  const image = allContentfulAsset.nodes.find(
    (node: ContentfulAsset) => node.contentful_id === contentfulId,
  );

  return (
    <GatsbyImage
      {...props}
      alt={image?.description!}
      image={image?.gatsbyImage}
    />
  );
};

export default Image;
