"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

const MapWithAspectRatios = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [dimension, setDimension] = useState("2D");

  // Map initialization
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [133.7751, -25.2744], // Default coordinates (Australia)
      zoom: 4,
    });
  }, []);

  // Update map dimension
  useEffect(() => {
    if (!mapRef.current) return;

    if (dimension === "2D") {
      mapRef.current.setStyle("mapbox://styles/mapbox/streets-v11");
      mapRef.current.setPitch(0); // Flat view
    } else if (dimension === "3D") {
      mapRef.current.setStyle("mapbox://styles/mapbox/satellite-v9");
      mapRef.current.setPitch(45); // Perspective
      mapRef.current.setZoom(5);
    }
  }, [dimension]);

  // Handle aspect ratio changes
  const calculateHeight = (width: number): string => {
    switch (aspectRatio) {
      case "1:1":
        return `${width}px`; // Square
      case "9:16":
        return `${(width / 9) * 16}px`; // Portrait
      case "16:9":
        return `${(width / 16) * 9}px`; // Landscape
      default:
        return "500px";
    }
  };

  const mapStyles = {
    width: "100%",
    height: calculateHeight(700), // Adjust based on container width
  };

  return (
    <div
      className="relative w-full mr-3 ml-3 h-[83vh] rounded-2xl border border-gray-800 bg-gray-900 p-4 flex items-center justify-center"
      style={{ backgroundColor: "#121216" }}
    >
      {/* Dropdowns Container */}
      <div className="absolute top-5 right-5 flex flex-row gap-5 z-10">
        {/* Dropdown for Aspect Ratios */}
        <div
          className="relative w-24 text-white rounded-full p-2 shadow-md border border-gray-700 flex items-center cursor-pointer"
          style={{ backgroundColor: "#212121" }}
        >
          {/* Left Icon */}
          <div className="flex items-center justify-center w-4 h-6 border-2 border-white rounded-sm mr-2 pointer-events-none">
            {/* Placeholder for the icon (can replace with an SVG or actual icon) */}
          </div>
          {/* Dropdown Select */}
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="bg-transparent text-white flex-1 outline-none appearance-none cursor-pointer"
          >
            <option value="1:1">1:1</option>
            <option value="9:16">9:16</option>
            <option value="16:9">16:9</option>
          </select>
          {/* Dropdown Arrow */}
          <span className="text-gray-500 ml-2 pointer-events-none">
            &#x25BC;
          </span>
        </div>

        {/* Toggle button */}
        <div
          className="flex items-center w-24 h-10 rounded-full p-1 shadow-md border border-gray-700"
          style={{ backgroundColor: "#212121" }}
        >
          <button
            onClick={() => setDimension("2D")}
            className={`flex-1 h-full rounded-full ${
              dimension === "2D"
                ? "bg-white text-black font-medium"
                : "text-gray-400"
            } flex items-center justify-center transition-all duration-200`}
          >
            2D
          </button>
          <button
            onClick={() => setDimension("3D")}
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
        ref={mapContainerRef}
        className="map-container rounded-xl shadow-lg"
        style={{
          ...mapStyles,
          maxWidth: "90%", // Ensure it doesn’t stretch too wide
          maxHeight: "90%", // Ensure it doesn’t stretch too tall
        }}
      />
    </div>
  );
};

export default MapWithAspectRatios;