import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Query, ContentfulAsset } from '../../graphql-types';

import styles from './svgContentful.module.scss';

interface Props {
  contentfulId: ContentfulAsset['contentful_id'];
}

const Image: FunctionComponent<Props> = ({ contentfulId }) => {
  const { allContentfulAsset } = useStaticQuery<Query>(
    graphql`
      query queryForSVGAsset {
        allContentfulAsset {
          nodes {
            contentful_id
            description
            file {
              contentType
              fileName
              url
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
    <div className={styles.imgWrapper}>
      <img
        className={styles.img}
        src={`https:${image.file.url}`}
        alt={image.description}
      />
    </div>
  );
};

export default Image;
