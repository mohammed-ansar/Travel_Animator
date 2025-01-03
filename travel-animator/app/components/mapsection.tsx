
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
  selectedColor: string;
  selectedModel: string;
}

const DynamicMapWithStyles: React.FC<MapProps> = ({
  fromLocation,
  toLocation,
  selectedColor,
  selectedModel,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{
    fromMarker: mapboxgl.Marker | null;
    toMarker: mapboxgl.Marker | null;
    waypoints: mapboxgl.Marker[];
  }>({
    fromMarker: null,
    toMarker: null,
    waypoints: [],
  });

  const fetchCoordinates = async (place: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    return data.features?.[0]?.center || null;
  };

  const drawRoute = () => {
    if (!mapRef.current) return;

    // Get coordinates of from and to markers
    const fromCoords = markersRef.current.fromMarker?.getLngLat();
    const toCoords = markersRef.current.toMarker?.getLngLat();

    if (!fromCoords || !toCoords) return;

    // Combine waypoints with start and end coordinates
    const coordinates = [
      [fromCoords.lng, fromCoords.lat],
      ...markersRef.current.waypoints.map((marker) => [
        marker.getLngLat().lng,
        marker.getLngLat().lat,
      ]),
      [toCoords.lng, toCoords.lat],
    ];

    // Create a GeoJSON line
    const lineGeoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
    };

    // Remove existing route if it exists
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    // Add the new route source
    mapRef.current.addSource("route", {
      type: "geojson",
      data: lineGeoJSON,
    });

    // Add the new route layer
    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": selectedColor || "#121216", // Use selected color for the line
        "line-width": 3,
      },
    });
    // console.log("Selected Color:", selectedColor);

    // Add drag interaction to the route
    let isDragging = false;
    let startCoords: mapboxgl.LngLat | null = null;

    // Mouse down on route to start drag
    mapRef.current.on("mousedown", "route", (e) => {
      isDragging = true;
      startCoords = e.lngLat;
      mapRef.current!.getCanvas().style.cursor = "grabbing";
    });

    // Mouse move to detect dragging
    mapRef.current.on("mousemove", (e) => {
      if (isDragging && startCoords) {
        // Optionally: Show visual feedback (e.g., hover effect) during drag
        mapRef.current!.getCanvas().style.cursor = "grabbing";
      }
    });

    // Mouse up to place a marker
    mapRef.current.on("mouseup", (e) => {
      if (isDragging) {
        isDragging = false;
        mapRef.current!.getCanvas().style.cursor = "";

        // Add a waypoint at the drag end location
        const lngLat = e.lngLat;
        addWaypoint(lngLat);
      }
    });
  };

  const addWaypoint = (lngLat: mapboxgl.LngLat) => {
    const waypointMarker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(lngLat)
      .addTo(mapRef.current!);

    // Update the route when the waypoint is dragged
    waypointMarker.on("dragend", drawRoute);

    // Add the marker to the waypoints array
    markersRef.current.waypoints.push(waypointMarker);

    // Redraw the route
    drawRoute();
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [12.4924, 41.8902],
      zoom: 5,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const updateMap = async () => {
      const fromCoords = await fetchCoordinates(fromLocation);
      const toCoords = await fetchCoordinates(toLocation);

      if (markersRef.current.fromMarker) {
        markersRef.current.fromMarker.remove();
      }

      if (fromCoords) {
        const planeIconContainer = document.createElement("div");
        ReactDOM.createRoot(planeIconContainer).render(<Plane />);

        const fromMarker = new mapboxgl.Marker({
          element: planeIconContainer,
          draggable: true,
        })
          .setLngLat(fromCoords)
          .addTo(mapRef.current);

        fromMarker.on("dragend", drawRoute);
        markersRef.current.fromMarker = fromMarker;
        mapRef.current.flyTo({ center: fromCoords, zoom: 12 });
      }

      if (markersRef.current.toMarker) {
        markersRef.current.toMarker.remove();
      }

      if (toCoords) {
        const flagIconContainer = document.createElement("div");
        ReactDOM.createRoot(flagIconContainer).render(<Destination />);

        const toMarker = new mapboxgl.Marker({
          element: flagIconContainer,
          draggable: true,
        })
          .setLngLat(toCoords)
          .addTo(mapRef.current);

        toMarker.on("dragend", drawRoute);
        markersRef.current.toMarker = toMarker;
      }

      if (fromCoords && toCoords) {
        drawRoute();
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