"use-client";

import { useEffect, useRef, useState } from "react";
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
  aspectRatio?: "1:1" | "9:16" | "16:9"; 
  selectedMapStyle: string;  
  // setSelectedMapStyle: React.Dispatch<React.SetStateAction<string>>; 
}

const MapWithAspectRatios: React.FC<MapProps & { selectedMapStyle: string }> = ({
  fromLocation,
  toLocation,
  selectedColor,
  selectedModel,
  aspectRatio = "1:1", // Default to 16:9
  selectedMapStyle,
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

  const [dimension, setDimension] = useState("2D");
  const [mapAspectRatio, setMapAspectRatio] = useState(aspectRatio);

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

    // const lineGeoJSON = {
    //   type: "Feature",
    //   geometry: {
    //     type: "LineString",
    //     coordinates,
    //   },
    // };
    const lineGeoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
      properties: {}, // Add this line
    };

    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    mapRef.current.addSource("route", {
      type: "geojson",
      data: lineGeoJSON,
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
        "line-width": 3,
      },
    });
  };

  const addWaypoint = (lngLat: mapboxgl.LngLat) => {
    const waypointMarker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(lngLat)
      .addTo(mapRef.current!);

    waypointMarker.on("dragend", drawRoute);

    markersRef.current.waypoints.push(waypointMarker);

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

  // Update the map style dynamically when `selectedMapStyle` changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(selectedMapStyle);
    }
  }, [selectedMapStyle]);

  const getSizeForAspectRatio = (ratio: string) => {
    switch (ratio) {
      case "1:1":
        return { width: "400px", height: "400px" };
      case "16:9":
        return { width: "600px", height: "300px" };
      case "9:16":
        return { width: "300px", height: "470px" };
      default:
        return { width: "302px", height: "170px" }; // Default to 16:9
    }
  };

  const mapSize = getSizeForAspectRatio(mapAspectRatio);

  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  const handleAspectRatioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMapAspectRatio(e.target.value);
  };

  const handleDimensionChange = (newDimension: "2D" | "3D") => {
    setDimension(newDimension);
    if (mapRef.current) {
      if (newDimension === "2D") {
        mapRef.current.setStyle("mapbox://styles/mapbox/streets-v11");
        mapRef.current.setPitch(0);
      } else {
        mapRef.current.setStyle("mapbox://styles/mapbox/satellite-v9");
        mapRef.current.setPitch(45);
        mapRef.current.setZoom(5);
      }
    }
  };

  return (
    <div
      className="relative w-full mr-3 ml-3 rounded-3xl border border-gray-800"
      style={{
        flex: 1,
        height: "83vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Control Buttons */}
      <div className="absolute top-5 right-5 flex flex-row gap-5 z-10">
        {/* Aspect Ratio Dropdown */}
        <div
          className="relative w-31 text-white rounded-full p-2 shadow-md border border-gray-700 flex items-center cursor-pointer"
          style={{ backgroundColor: "#212121" }}
          onClick={(e) => {
    const selectElement = e.currentTarget.querySelector("select");
    selectElement?.focus(); // Focus on the select dropdown to open it
    selectElement?.click(); // Simulate a click to open it
  }}
        >
          {/* Dynamic Left Icon (Border Line for Ratios) */}
          <div className="flex items-center justify-center w-6 h-6 mr-3 pointer-events-none">
            {mapAspectRatio === "1:1" && (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: "1px solid white",
                  borderRadius: "3px",
                }}
              />
            )}
            {mapAspectRatio === "9:16" && (
              <div
                style={{
                  width: "15px",
                  height: "30px",
                  border: "1px solid white",
                  borderRadius: "3px",
                }}
              />
            )}
            {mapAspectRatio === "16:9" && (
              <div
                style={{
                  width: "30px",
                  height: "17px",
                  border: "1px solid white",
                  borderRadius: "3px",
                }}
              />
            )}
          </div>

          {/* Dropdown */}
          <select
            value={mapAspectRatio}
            onChange={handleAspectRatioChange}
            className="bg-transparent text-white flex-1 outline-none appearance-none cursor-pointer"
          >
            <option
              value="1:1"
              className="hover:bg-gray-600"
              style={{
                backgroundColor: "#212121",
                color: "white",
                padding: "8px",
              }}
            >
              1:1
            </option>
            <option
              value="9:16"
              className="hover:bg-gray-600"
              style={{
                backgroundColor: "#212121",
                color: "white",
                padding: "8px",
              }}
            >
              9:16
            </option>
            <option
              value="16:9"
              className="hover:bg-gray-600"
              style={{
                backgroundColor: "#212121",
                color: "white",
                padding: "8px",
              }}
            >
              16:9
            </option>
          </select>
        </div>

        {/* 2D/3D Toggle Button */}
        <div
          className="flex items-center w-24 h-10 rounded-full p-1 shadow-md border border-gray-700"
          style={{ backgroundColor: "#212121" }}
        >
          <button
            onClick={() => handleDimensionChange("2D")}
            className={`flex-1 h-full rounded-full ${
              dimension === "2D"
                ? "bg-white text-black font-medium"
                : "text-gray-400"
            } flex items-center justify-center transition-all duration-200`}
          >
            2D
          </button>
          <button
            onClick={() => handleDimensionChange("3D")}
            className={`flex-1 h-full rounded-full ${
              dimension === "3D"
                ? "bg-white text-black font-medium"
                : "text-gray-400"
            } flex items-center justify-center transition-all duration-200`}
          >
            3D
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div
        style={{
          position: "relative",
          width: mapSize.width,
          height: mapSize.height,
        }}
      >
        <div
          ref={mapContainerRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: "15px",
          }}
        />
      </div>
    </div>
  );
};

export default MapWithAspectRatios;

