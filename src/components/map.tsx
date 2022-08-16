 import { useRef, useState } from "react";
// import Link from "next/link";
// import { Image } from "cloudinary-react";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

import React from 'react';

const Map = () => {
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 49,
    longitude: 34,
    zoom: 10
  })
  const mapRef = useRef<ReactMapGL>(null)
  return (
    <div className='w-full h-full'>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        ref={mapRef}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        minZoom={5}
        maxZoom={15}
        mapStyle='mapbox://styles/mishamk1606/cl6wl0r4p001k16q93jgpjmex'
      />
    </div>
  );
};

export default Map;
