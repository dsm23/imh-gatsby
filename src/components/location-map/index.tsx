import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import Pin from "../svgs/pin";

import { Query } from "../../../graphql-types";

import FlexItem from "../flex-item";

import {
  FullscreenControlStyles,
  GeolocateStyles,
  NavStyles,
  ScaleControlStyles,
} from "../mapbox";

const geo = {
  latitude: 51.577794,
  longitude: 0.719838,
};

const Map = () => {
  const [viewport, setViewport] = useState({
    ...geo,
    zoom: 14,
  });

  const { site } = useStaticQuery<Query>(graphql`
    query {
      site {
        siteMetadata {
          mapboxToken
        }
      }
    }
  `);

  const mapboxToken = site?.siteMetadata?.mapboxToken as string;

  if (!mapboxToken) {
    console.error(
      "ERROR: Mapbox token is required in gatsby-config.js siteMetadata",
    );
  }

  return (
    <FlexItem basis="75%" tw="w-full shadow-lg">
      <ReactMapGL
        {...viewport}
        width="100%"
        height={400}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Pin {...geo} />

        <GeolocateStyles>
          <GeolocateControl />
        </GeolocateStyles>

        <FullscreenControlStyles>
          <FullscreenControl />
        </FullscreenControlStyles>

        <NavStyles>
          <NavigationControl />
        </NavStyles>

        <ScaleControlStyles>
          <ScaleControl />
        </ScaleControlStyles>
      </ReactMapGL>
    </FlexItem>
  );
};

export default Map;
