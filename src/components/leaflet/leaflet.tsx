import {
  CircleMarker,
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LatLngExpression } from 'leaflet';
import { up } from '../breakpoint/breakpoint';

import { BringMeHome } from './bring-home';
import { SatellytesMarkerIcon } from './sy-marker';
import { StaticReplacement } from './static-map-image';
const MAP_VIEW_ZOOM = 20;

const OFFICE_COORDINATES: LatLngExpression = [48.13479, 11.56839];
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoic3ktYmVlcCIsImEiOiJja291MXRiZTAwMWNyMm5tcGc3Ymt6N2lkIn0.GqMzCE54VnlA8_XOqIPgyg';
const MAPBOX_TILE_LAYER_DEFAULT = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;
const MAPBOX_TILE_LAYER_DARK = `https://api.mapbox.com/styles/v1/sy-beep/ckou1zo8004q917pout1cyhcy/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;

const MAP_IMAGE_PREVIEW = `https://api.mapbox.com/styles/v1/sy-beep/ckou1zo8004q917pout1cyhcy/static/11.5684,48.1348,${
  MAP_VIEW_ZOOM - 2
},0/1200x560?access_token=${MAPBOX_ACCESS_TOKEN}`;

/**
 * ⚠️ Attribution is mandatory to fulfill the license and please update accordingly if using a different source than mapbox
 * Resource: https://docs.mapbox.com/help/getting-started/attribution/
 */
const MAPBOX_ATTRIBUTION = `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`;

// We need to give the leaflet container itself an explicit height
// and a distinct z-index to move underneath the fixed header;
const MapContainerWithHeight = styled(MapContainer)`
  height: 344px;

  ${up('md')} {
    height: 560px;
  }
  z-index: 0;
`;
const MapWrapper = styled.div`
  z-index: 0;
  position: relative;
`;

export const Leaflet = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  });

  // we don't want to render leaflet outside of the browser (SSR)
  if (!isBrowser) {
    return <StaticReplacement url={MAP_IMAGE_PREVIEW} />;
  }

  const MapView = (
    <MapContainerWithHeight
      whenCreated={setMapInstance as any}
      zoomControl={false}
      center={OFFICE_COORDINATES}
      zoom={MAP_VIEW_ZOOM}
      scrollWheelZoom={true}
    >
      {/*Introduce a LayerControl so we can offer multiple tile layers if people want to explore the city
      without the minimal skin (and if they are curious enough to find the layer toggle of course)*/}
      <LayersControl position="bottomright">
        <ZoomControl position="bottomleft" />

        <LayersControl.BaseLayer checked name="Satellytes World">
          {/*use a bigger tile (512 instead of 256) combined with an offset of the zoom level (to match the other zoom level) set to make the labels larger*/}
          {/*via https://stackoverflow.com/questions/37040494/street-labels-in-mapbox-tile-layer-too-small*/}
          <TileLayer
            maxZoom={22}
            attribution={MAPBOX_ATTRIBUTION}
            tileSize={512}
            zoomOffset={-1}
            url={MAPBOX_TILE_LAYER_DARK}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Default (Light & Streets)">
          <TileLayer
            maxZoom={22}
            tileSize={512}
            zoomOffset={-1}
            attribution={MAPBOX_ATTRIBUTION}
            url={MAPBOX_TILE_LAYER_DEFAULT}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Marker position={OFFICE_COORDINATES} icon={SatellytesMarkerIcon} />

      <CircleMarker
        center={OFFICE_COORDINATES}
        pathOptions={{ color: '#668CFF', opacity: 0.2 }}
        radius={170}
      />
    </MapContainerWithHeight>
  );

  return (
    <MapWrapper>
      {MapView}
      {mapInstance ? (
        <BringMeHome
          center={OFFICE_COORDINATES}
          zoom={MAP_VIEW_ZOOM}
          map={mapInstance}
        >
          Lost?{' '}
          <span
            role={'img'}
            aria-label={"see no evil monkey emoji, because it's embarassing"}
          >
            🙈
          </span>{' '}
          Click here.
        </BringMeHome>
      ) : null}
    </MapWrapper>
  );
};
