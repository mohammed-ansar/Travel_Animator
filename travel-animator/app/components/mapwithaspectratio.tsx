"use-client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom/client";
import { along, length, bearing } from "@turf/turf";
import * as turf from "@turf/turf";



mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

interface MapProps {
  fromLocation: string;
  toLocation: string;
  selectedColor: string;
  selectedModel: string;
  aspectRatio?: "1:1" | "9:16" | "16:9"; 
  selectedMapStyle: string;  
  route: GeoJSON.Geometry | null;
  // setSelectedMapStyle: React.Dispatch<React.SetStateAction<string>>; 
  duration : number;
  modelSize : number;
}

const MapWithAspectRatios: React.FC<MapProps & { selectedMapStyle: string }> = ({
  fromLocation,
  toLocation,
  selectedColor,
  selectedModel,
  aspectRatio = "1:1", // Default to 16:9
  selectedMapStyle,
  route,
  duration,
  modelSize
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
  const animationRef = useRef<mapboxgl.Marker | null>(null);
  const stepRef = useRef(0);


  const fetchCoordinates = async (place: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    return data.features?.[0]?.center || null;
  };

  const animateModelAlongRoute = () => {
    if (!route || !mapRef.current) return;
  
    const routeCoordinates = route.coordinates;
    const routeLength = routeCoordinates.length;
  
  
    if (stepRef.current >= routeLength) {
      // Show the entire route after animation completes
      const bounds = new mapboxgl.LngLatBounds();
      routeCoordinates.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds, { padding: 40, maxZoom: 8 });
  
      // Restart animation after a short delay
      setTimeout(() => {
        stepRef.current = 0;
        animateModelAlongRoute();
      }, 3000); // Pause before restarting
      return;
    }
  
    // Current point on the route
    const currentPoint = routeCoordinates[stepRef.current];
  
 // Dynamically calculate zoom level based on duration
 const maxZoom = 14; // Closest zoom level
 const minZoom = 6;  // Farthest zoom level
 const zoomLevel = Math.min(
   maxZoom,
   Math.max(minZoom, minZoom - (duration / 60) * (minZoom - maxZoom))
 );

 // Step duration calculation based on zoom level and duration
 const totalDurationMs = duration * 1000; // Convert duration to milliseconds
 const stepDuration = totalDurationMs / routeLength;
    // Draw the animated route up to the current point
    const animatedRoute = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: routeCoordinates.slice(0, stepRef.current + 1),
      },
    };
  
    // Update or add the animated route source and layer
    if (mapRef.current.getSource("animated-route")) {
      mapRef.current.getSource("animated-route").setData(animatedRoute);
    } else {
      mapRef.current.addSource("animated-route", {
        type: "geojson",
        data: animatedRoute,
      });
  
      mapRef.current.addLayer({
        id: "animated-route",
        type: "line",
        source: "animated-route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": selectedColor || "#121216",
          "line-width": 5,
        },
      });
    }
  
    // Update animation marker
    if (!animationRef.current) {
      const modelElement = document.createElement("div");
      ReactDOM.createRoot(modelElement).render(
        <img
          src={`/models/${selectedModel}.png`}
          alt={selectedModel}
          style={{
            width: `${48 * modelSize}px`,
            height: `${48 * modelSize}px`,
            objectFit: "contain",
          }}
        />
      );
  
      animationRef.current = new mapboxgl.Marker({
        element: modelElement,
      })
        .setLngLat(currentPoint)
        .addTo(mapRef.current);
    } else {
      animationRef.current.setLngLat(currentPoint);
    }
  
    // Smoothly follow the model's movement
    mapRef.current.easeTo({
      center: currentPoint,
      zoom: zoomLevel, // Dynamic zoom based on duration
      pitch: 60, // Add a 3D effect
      speed: 0.3, // Slow panning speed for smooth effect
      duration: 500,
      bearing: turf.bearing(
        turf.point(currentPoint),
        turf.point(routeCoordinates[Math.min(stepRef.current + 1, routeLength - 1)])
      ),
    });
  
    // Move to the next step after the calculated step duration
    stepRef.current++;
    setTimeout(() => requestAnimationFrame(animateModelAlongRoute), stepDuration);
  };
  

// Update the marker size when modelSize changes
useEffect(() => {
  if (!animationRef.current || !mapRef.current) return;

  // Remove the existing marker
  animationRef.current.remove();

  // Create a new marker element with the updated size
  const modelElement = document.createElement("div");
  ReactDOM.createRoot(modelElement).render(
    <img
      src={`/models/${selectedModel}.png`}
      alt={selectedModel}
      style={{
        width: `${48 * modelSize}px`,
        height: `${48 * modelSize}px`,
        objectFit: "contain",
      }}
    />
  );

  // Add a new marker with the updated element
  animationRef.current = new mapboxgl.Marker({
    element: modelElement,
  })
    .setLngLat(animationRef.current.getLngLat()) // Keep the current position
    .addTo(mapRef.current);
}, [modelSize, selectedModel]); // Update when modelSize or selectedModel changes

useEffect(() => {
  if (duration && route) {
    stepRef.current = 0; // Reset the animation step
    animateModelAlongRoute(); // Restart the animation with the updated duration
  }
}, [duration]); // Re-run when duration changes


  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
  
    const initializeMap = async () => {
      const fromCoords = await fetchCoordinates(fromLocation);
      const toCoords = await fetchCoordinates(toLocation);
      if (!fromCoords || !toCoords) return; // Ensure both coordinates are fetched
  
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: fromCoords, // Center the map at the starting location
        zoom: 5,
      });
  
      mapRef.current.on("load", () => {
        if (route) animateModelAlongRoute();
      });
    };
  
    initializeMap();
  }, [route]);
  

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

