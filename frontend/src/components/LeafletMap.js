import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-bing-layer'; // Import Leaflet-Bing-Layer
import L from 'leaflet'; // Import Leaflet
import 'leaflet-draw'; // Import Leaflet Draw
import 'leaflet-draw/dist/leaflet.draw.css'; // Import Leaflet Draw CSS

function LeafletMap() {
  const mapRef = useRef(null);
  const [drawnPolygons, setDrawnPolygons] = useState([]); // State to store drawn polygons

  useEffect(() => {
    if (mapRef.current) {
      // Define available base maps
      const baseMaps = {
        'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
        'Bing Maps': L.tileLayer.bing({
          bingMapsKey: localStorage.getItem('bing_api'),
          imagerySet: 'Aerial',
        }),
      };

      // Initialize the map with Bing Maps as the default base layer
      const map = L.map(mapRef.current, {
        layers: [baseMaps['Bing Maps']], // Specify Bing Maps as the default base layer
      }).setView([51.505, -0.09], 12); // Set the initial center and zoom level

      // Create a FeatureGroup for storing drawn polygons
      const drawnItems = new L.FeatureGroup().addTo(map);

      // Initialize the Leaflet Draw control with editing enabled
      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems, // Enable editing for drawn polygons
        },
        draw: {
          polygon: true, // Allow drawing polygons
          marker: false,
          circle: false,
          circlemarker: false,
          rectangle: false,
          polyline: false,
        },
      });

      map.addControl(drawControl);

      // Event listener for when a polygon is drawn
      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        const geometry = layer.toGeoJSON().geometry; // Save the drawn polygon's geometry
        setDrawnPolygons((prevPolygons) => [...prevPolygons, geometry]); // Store the drawn polygon geometry
        drawnItems.addLayer(layer); // Add the drawn polygon to the feature group
      });

      // Event listener for when a polygon is edited
      map.on('draw:edited', (event) => {
        const layers = event.layers;
        layers.eachLayer((layer) => {
          const geometry = layer.toGeoJSON().geometry; // Get the edited polygon's geometry
          setDrawnPolygons((prevPolygons) =>
            prevPolygons.map((polygon, index) => (index === 0 ? geometry : polygon))
          ); // Update the stored polygon geometry
        });
      });

      // Event listener for when a polygon is deleted
      map.on('draw:deleted', () => {
        setDrawnPolygons([]); // Clear the stored polygon geometries when deleted
      });

      // Create a control for switching between base maps
      L.control.layers(baseMaps).addTo(map);

      return () => {
        map.remove(); // Remove the map when the component unmounts
      };
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default LeafletMap;
