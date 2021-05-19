import SyMarkerImage from './sy-marker-white.png';
import Leaflet from 'leaflet';

const isBrowser = typeof window !== 'undefined';

/**
 * Leaflet doesn't support SSR, so we run into issues
 * with window if leaflet is loaded directly. Check file gatsby-node
 * for the webpack config injection with replaces it with the null loaders.
 * This also means Leaflet will be null here in this case. Handle accordingly.
 *
 * Related:
 * https://github.com/PaulLeCam/react-leaflet/issues/495
 */
let SatellytesMarkerIcon: any = undefined;

if (isBrowser) {
  SatellytesMarkerIcon = Leaflet.icon({
    iconUrl: SyMarkerImage,
    iconSize: [32, 44],
    iconAnchor: [32 / 2, 44],
    tooltipAnchor: [0, 10],
  });
}

export { SatellytesMarkerIcon };
