import React, { useState } from 'react';
import clsx from 'clsx';
import { useStaticQuery, graphql } from 'gatsby';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';

import Pin from './svgs/pin';

import { Site } from '../../graphql-types';

import styles from './locationMap.module.scss';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px',
};

const navStyle = {
  position: 'absolute',
  top: 72,
  left: 0,
  padding: '10px',
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px',
};

const geo = {
  latitude: 51.577794,
  longitude: 0.719838,
};

function Map() {
  const [viewport, setViewport] = useState({
    ...geo,
    zoom: 14,
  });

  const { site } = useStaticQuery<Site>(
    graphql`
      query {
        site {
          siteMetadata {
            mapboxToken
          }
        }
      }
    `,
  );

  const mapboxToken = site?.siteMetadata?.mapboxToken;

  if (!mapboxToken) {
    console.error(
      'ERROR: Mapbox token is required in gatsby-config.js siteMetadata',
    );
  }

  return (
    <div className={clsx('w-100 shadow-lg', styles.flexItem)}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height={400}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        <Pin {...geo} />
        <div style={geolocateStyle}>
          <GeolocateControl />
        </div>
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default Map;
