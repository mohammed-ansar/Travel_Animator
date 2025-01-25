"use-client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom/client";
import Plane from "../icons/Plane";
import Destination from "../icons/Destination";
import Car from "../icons/Car";
import ModelSelector from "./modelselector";
import * as turf from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

interface MapProps {
  fromLocation: string;
  toLocation: string;
  selectedColor: string;
  setRoute: (route: GeoJSON.Geometry | null) => void;
  setWaypoints: React.Dispatch<
    React.SetStateAction<{ startingPoint: string; endingPoint: string }>
  >;
}

const DynamicMapWithStyles: React.FC<MapProps> = ({
  fromLocation,
  toLocation,
  selectedColor,
  setWaypoints,
  setRoute,
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
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedColorModel, setSelectedColorModel] = useState<string | null>(
    null
  );

  const fetchCoordinates = async (place: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    return data.features?.[0]?.center || null;
  };

  const fetchAddress = async (lngLat: mapboxgl.LngLat) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    return data.features?.[0]?.place_name || "Unknown Location";
  };

  const addWaypoint = (lngLat: mapboxgl.LngLat) => {
    const carIconContainer = document.createElement("div");
    ReactDOM.createRoot(carIconContainer).render(<Car />); // Render a car icon.

    const waypointMarker = new mapboxgl.Marker({
      element: carIconContainer,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(mapRef.current!);

    // Update the route when the waypoint is dragged.
    waypointMarker.on("dragend", () => {
      drawRoute();
    });

    // Remove the waypoint on double-click.
    waypointMarker.getElement().addEventListener("dblclick", () => {
      const index = markersRef.current.waypoints.indexOf(waypointMarker);
      if (index !== -1) {
        markersRef.current.waypoints.splice(index, 1); // Remove from waypoints list
        waypointMarker.remove(); // Remove marker from the map
        drawRoute(); // Redraw the route
      }
    });

    // Long press logic for waypoint.
    let longPressTimeout: NodeJS.Timeout;

    const handleLongPressStart = () => {
      longPressTimeout = setTimeout(() => {
        setShowModelSelector(true); // Open the ModelSelector.
      }, 500); // 500ms long press duration.
    };

    const handleLongPressEnd = () => {
      clearTimeout(longPressTimeout); // Clear timeout on early release.
    };

    const waypointElement = waypointMarker.getElement();
    waypointElement.addEventListener("mousedown", handleLongPressStart);
    waypointElement.addEventListener("mouseup", handleLongPressEnd);
    waypointElement.addEventListener("mouseleave", handleLongPressEnd);
    waypointElement.addEventListener("touchstart", handleLongPressStart);
    waypointElement.addEventListener("touchend", handleLongPressEnd);
    waypointElement.addEventListener("touchcancel", handleLongPressEnd);

    markersRef.current.waypoints.push(waypointMarker);

    drawRoute(); // Redraw the route.
  };

  const drawRoute = () => {
    if (!mapRef.current) return;

    const fromCoords = markersRef.current.fromMarker?.getLngLat();
    const toCoords = markersRef.current.toMarker?.getLngLat();

    if (!fromCoords || !toCoords) return;

    const coordinates = [
      [fromCoords.lng, fromCoords.lat],
      ...markersRef.current.waypoints.map((marker) => [
        marker.getLngLat().lng,
        marker.getLngLat().lat,
      ]),
      [toCoords.lng, toCoords.lat],
    ];

    const lineGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
      properties: {},
    };

    const curvedLine = turf.bezierSpline(lineGeoJSON);
    setRoute(curvedLine.geometry);

    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    mapRef.current.addSource("route", {
      type: "geojson",
      data: curvedLine,
    });

    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": selectedColor || "#121216",
        "line-width": 5,
      },
    });

    // Add interaction to add waypoints by clicking the route.
    mapRef.current.on("click", "route", (e) => {
      const lngLat = e.lngLat;
      addWaypoint(lngLat); // Add a waypoint on click.
    });
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

        fromMarker.on("dragend", async () => {
          const updatedCoords = fromMarker.getLngLat();
          const newAddress = await fetchAddress(updatedCoords);
          setWaypoints((prev) => ({ ...prev, startingPoint: newAddress })); // Update input field
          drawRoute();
        });

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

        toMarker.on("dragend", async () => {
          const updatedCoords = toMarker.getLngLat();
          const newAddress = await fetchAddress(updatedCoords);
          setWaypoints((prev) => ({ ...prev, endingPoint: newAddress })); // Update input field
          drawRoute();
        });

        markersRef.current.toMarker = toMarker;
      }

      if (fromCoords && toCoords) {
        mapRef.current.fitBounds(
          [
            [fromCoords[0], fromCoords[1]],
            [toCoords[0], toCoords[1]],
          ],
          { padding: 60 }
        );
        drawRoute();
      }
    };

    updateMap();
  }, [fromLocation, toLocation, selectedColor]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapRef.current.getSource("route")) {
      mapRef.current.setPaintProperty("route", "line-color", selectedColor);
    }
  }, [selectedColor]); // Reapply route color whenever the color changes

  return (
    <>
      <div
        className="mr-3 ml-3 rounded-3xl border border-gray-800"
        ref={mapContainerRef}
        style={{ flex: 1, height: "83vh", width: "100%" }}
      />
      {showModelSelector && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ModelSelector
            selectedModel={selectedModel}
            selectedColor={selectedColor}
            setSelectedModel={setSelectedModel}
            setSelectedColor={setSelectedColorModel}
            onClose={() => setShowModelSelector(false)}
          />
        </div>
      )}
    </>
  );
};

export default DynamicMapWithStyles;
