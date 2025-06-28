"use client";

import { useEffect, useRef } from "react";
import type { FunctionComponent } from "react";
import mapboxgl from "mapbox-gl";

type Props = {
  token: string;
};

const Map: FunctionComponent<Props> = ({ token }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: ref.current as HTMLDivElement, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/dark-v9", // style URL
      center: [0.719838, 51.577794],
      zoom: 13, // starting zoom
    });

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });

    new mapboxgl.Marker().setLngLat([0.719838, 51.577794]).addTo(map);

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
    );
  }, [token]);

  return (
    <div ref={ref} className="elevation mt-4 h-96 w-full rounded-lg md:mt-0" />
  );
};

export default Map;
