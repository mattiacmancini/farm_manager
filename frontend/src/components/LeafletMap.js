import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-bing-layer'; // Import Leaflet-Bing-Layer
import L from 'leaflet'; // Import Leaflet

function LeafletMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 12); // Set the initial center and zoom level

      // Add the Bing Aerial Layer
      L.tileLayer.bing({
        bingMapsKey: localStorage.getItem('bing_api'), // Replace with your Bing Maps API Key
        imagerySet: 'Aerial',
      }).addTo(map);

      return () => {
        map.remove(); // Remove the map when the component unmounts
      };
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>;
}

export default LeafletMap;
