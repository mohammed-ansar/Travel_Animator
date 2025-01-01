

"use-client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom/client";
import Plane from "../icons/Plane";
import Destination from "../icons/Destination";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

interface MapProps {
  fromLocation: string;
  toLocation: string;
  // showRoute: boolean;
  selectedColor : string;
  selectedModel : string;
}

const DynamicMapWithStyles: React.FC<MapProps> = ({
  fromLocation,
  toLocation,
  selectedColor,
  selectedModel
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Track markers here

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [12.4924, 41.8902], // Default coordinates
      zoom: 5,
    });
  }, []);

  // Fetch coordinates from Mapbox geocoding API
  const fetchCoordinates = async (place: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    return data.features?.[0]?.center || null;
  };

  // Draw route between two locations
  const drawRoute = async (
    fromCoords: [number, number],
    toCoords: [number, number]
  ) => {
    // Check if the route source already exists and remove it if necessary
    if (mapRef.current?.getSource("route")) {
      mapRef.current?.removeLayer("route"); // Remove the layer
      mapRef.current?.removeSource("route"); // Remove the source
    }

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords.join(
        ","
      )};${toCoords.join(",")}?geometries=geojson&access_token=${
        mapboxgl.accessToken
      }`
    );
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0].geometry;

      // Add route to map
      mapRef.current?.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: route,
          properties: {},
        },
      });

      mapRef.current?.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF0A0A",
          "line-width": 3,
        },
      });
    }
  };

  // Update map and markers
  useEffect(() => {
    if (!mapRef.current) return;

    const updateMap = async () => {
      const fromCoords = await fetchCoordinates(fromLocation);
      const toCoords = await fetchCoordinates(toLocation);

      // Remove old markers if any
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = []; // Clear the markers array

      if (fromCoords) {
        const planeIconContainer = document.createElement("div");
        ReactDOM.createRoot(planeIconContainer).render(<Plane />);

        const fromMarker = new mapboxgl.Marker({ element: planeIconContainer })
          .setLngLat(fromCoords)
          .addTo(mapRef.current!);
        markersRef.current.push(fromMarker); // Store the marker for later removal
        mapRef.current!.flyTo({ center: fromCoords, zoom: 12 });
      }

      if (toCoords) {
        const flagIconContainer = document.createElement("div");
        ReactDOM.createRoot(flagIconContainer).render(<Destination />);

        const toMarker = new mapboxgl.Marker({ element: flagIconContainer })
          .setLngLat(toCoords)
          .addTo(mapRef.current!);
        markersRef.current.push(toMarker); // Store the marker for later removal
      }

      if (fromCoords && toCoords) {
        drawRoute(fromCoords, toCoords); // Draw route between locations
      }
    };

    updateMap();
  }, [fromLocation, toLocation]);

  return (
    <div
      className="mr-3 ml-3 rounded-3xl border border-gray-800"
      ref={mapContainerRef}
      style={{ flex: 1, height: "83vh", width: "100%" }}
    />
  );
};

export default DynamicMapWithStyles; 


