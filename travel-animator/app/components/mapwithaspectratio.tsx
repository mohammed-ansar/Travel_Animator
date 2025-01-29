// "use-client";

// import { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import ReactDOM from "react-dom/client";
// import { along, length, bearing } from "@turf/turf";
// import * as turf from "@turf/turf";
// import { useUIContext } from "../context/UIContext";
// import { ExportVideoCard } from "./ExportVideoCard";
// import { ExportProgressCard } from "./ExportProgressCard";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

// interface MapProps {
//   fromLocation: string;
//   toLocation: string;
//   selectedColor: string;
//   selectedModel: string;
//   aspectRatio?: "1:1" | "9:16" | "16:9";
//   selectedMapStyle: string;
//   route: GeoJSON.Geometry | null;
//   // setSelectedMapStyle: React.Dispatch<React.SetStateAction<string>>;
//   duration: number;
//   modelSize: number;
// }

// const MapWithAspectRatios: React.FC<
//   MapProps & { selectedMapStyle: string }
// > = ({
//   fromLocation,
//   toLocation,
//   selectedColor,
//   selectedModel,
//   aspectRatio = "1:1", // Default to 16:9
//   selectedMapStyle,
//   route,
//   duration,
//   modelSize,
// }) => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const markersRef = useRef<{
//     fromMarker: mapboxgl.Marker | null;
//     toMarker: mapboxgl.Marker | null;
//     waypoints: mapboxgl.Marker[];
//   }>({
//     fromMarker: null,
//     toMarker: null,
//     waypoints: [],
//   });

//   const [dimension, setDimension] = useState("2D");
//   const [mapAspectRatio, setMapAspectRatio] = useState(aspectRatio);
//   const animationRef = useRef<mapboxgl.Marker | null>(null);
//   const stepRef = useRef(0);
//   const { showExportCard, showProgressCard } = useUIContext();

//   const fetchCoordinates = async (place: string) => {
//     const response = await fetch(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         place
//       )}.json?access_token=${mapboxgl.accessToken}`
//     );
//     const data = await response.json();
//     return data.features?.[0]?.center || null;
//   };

//   const [countryFlag, setCountryFlag] = useState("null");

//   const fetchCountryFlag = async (location: string | number | boolean) => {
//     try {
//       const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//           location
//         )}.json?access_token=${mapboxgl.accessToken}`
//       );
//       const data = await response.json();
//       // const countryCode =
//       //   data.features?.find((f: { place_type: string | string[]; }) => f.place_type.includes("country"))
//       //     ?.properties.short_code || null;

//       const countryFeature = data.features?.find(
//         (f: { place_type: string | string[] }) =>
//           f.place_type.includes("country")
//       );

//       const countryCode = countryFeature?.properties?.short_code;

//       if (!countryCode) {
//         console.error(
//           "Country code not found for location:",
//           location,
//           countryFeature
//         );
//       }

//       if (countryCode) {
//         setCountryFlag(
//           `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`
//         );
//         console.log(
//           `Fetching flag from: https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching country flag:", error);
//     }
//   };

//   useEffect(() => {
//     if (fromLocation) {
//       fetchCountryFlag(fromLocation);
//     }
//   }, [fromLocation]);

//   const animateModelAlongRoute = () => {
//     if (!route || !mapRef.current) return;

//     // Ensure the route is a LineString
//     if (route.type !== "LineString") {
//       console.error("Route is not a LineString. Animation aborted.");
//       return;
//     }

//     const routeCoordinates = route.coordinates;
//     const routeLength = routeCoordinates.length;
//     const waypoints = markersRef.current.waypoints || []; // Fix for waypoints

//     if (stepRef.current >= routeLength) {
//       // Show the entire route after animation completes
//       const bounds = new mapboxgl.LngLatBounds();
//       routeCoordinates.forEach((coord) => bounds.extend(coord));
//       mapRef.current.fitBounds(bounds, { padding: 40, maxZoom: 8 });

//       // Restart animation after a short delay
//       setTimeout(() => {
//         stepRef.current = 0;
//         animateModelAlongRoute();
//       }, 3000); // Pause before restarting
//       return;
//     }

//     // Current point on the route
//     const currentPoint = routeCoordinates[stepRef.current];

//     // Dynamically calculate zoom level based on duration
//     const maxZoom = 14; // Closest zoom level
//     const minZoom = 6; // Farthest zoom level
//     const zoomLevel = Math.min(
//       maxZoom,
//       Math.max(minZoom, minZoom - (duration / 60) * (minZoom - maxZoom))
//     );

//     // Step duration calculation based on zoom level and duration
//     const totalFrames = Math.max(1, 30 - waypoints.length); // Total frames (ensure at least 1 frame)
//     const totalDurationMs = duration * 1000; // Total animation duration in milliseconds
//     //  const stepDuration = totalDurationMs / totalFrames;
//     const stepDuration = totalDurationMs / routeLength;

//     // Draw the animated route up to the current point
//     const animatedRoute = {
//       type: "Feature",
//       geometry: {
//         type: "LineString",
//         coordinates: routeCoordinates.slice(0, stepRef.current + 1),
//       },
//     };

//     // Update or add the animated route source and layer
//     if (mapRef.current.getSource("animated-route")) {
//       mapRef.current.getSource("animated-route").setData(animatedRoute);
//     } else {
//       mapRef.current.addSource("animated-route", {
//         type: "geojson",
//         data: animatedRoute,
//       });

//       mapRef.current.addLayer({
//         id: "animated-route",
//         type: "line",
//         source: "animated-route",
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": selectedColor || "#121216",
//           "line-width": 5,
//         },
//       });
//     }

//     // Update animation marker
//     if (!animationRef.current) {
//       const modelElement = document.createElement("div");
//       ReactDOM.createRoot(modelElement).render(
//         <img
//           src={`/models/${selectedModel}.png`}
//           alt={selectedModel}
//           style={{
//             width: `${48 * modelSize}px`,
//             height: `${48 * modelSize}px`,
//             objectFit: "contain",
//           }}
//         />
//       );

//       animationRef.current = new mapboxgl.Marker({
//         element: modelElement,
//       })
//         .setLngLat(currentPoint)
//         .addTo(mapRef.current);
//     } else {
//       animationRef.current.setLngLat(currentPoint);
//     }

//     // Smoothly follow the model's movement
//     mapRef.current.easeTo({
//       center: animationRef.current.getLngLat(),
//       zoom: zoomLevel, // Dynamic zoom based on duration
//       pitch: 60, // Add a 3D effect
//       speed: 0.3, // Slow panning speed for smooth effect
//       duration: 500,
//       bearing: turf.bearing(
//         turf.point(currentPoint),
//         turf.point(
//           routeCoordinates[Math.min(stepRef.current + 1, routeLength - 1)]
//         )
//       ),
//     });

//     // Move to the next step after the calculated step duration
//     stepRef.current++;
//     setTimeout(
//       () => requestAnimationFrame(animateModelAlongRoute),
//       stepDuration
//     );
//   };

"use client";

import { useEffect, useRef, useState,CSSProperties } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom/client";
import { along, length, bearing } from "@turf/turf";
import * as turf from "@turf/turf";
import { useUIContext } from "../context/UIContext";
import { ExportVideoCard } from "./ExportVideoCard";
import { ExportProgressCard } from "./ExportProgressCard";


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
  duration: number;
  modelSize: number;
  isFlagEnabled: boolean;
}

const MapWithAspectRatios: React.FC<
  MapProps & { selectedMapStyle: string }
> = ({
  fromLocation,
  toLocation,
  selectedColor,
  selectedModel,
  aspectRatio = "16:9", // Default to 16:9
  selectedMapStyle,
  route,
  duration,
  modelSize,
  isFlagEnabled,
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
  const { showExportCard, showProgressCard } = useUIContext();

  const fetchCoordinates = async (place: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    return data.features?.[0]?.center || null;
  };

  const [countryFlags, setCountryFlags] = useState<string[]>([]);

  const fetchCountryFlag = async (location: string | number | boolean) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const countryFeature = data.features?.find(
        (f: { place_type: string[] }) => f.place_type.includes("country")
      );

      const countryCode = countryFeature?.properties?.short_code;

      if (!countryCode) {
        console.error(
          "Country code not found for location:",
          location,
          countryFeature
        );
      }

      if (countryCode) {
        const flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
  
        setCountryFlags((prevFlags) => {
          // Avoid duplicates
          if (!prevFlags.includes(flagUrl)) {
            return [...prevFlags, flagUrl];
          }
          return prevFlags;
        });
  
        console.log(`Fetching flag: ${flagUrl}`);
      }
    } catch (error) {
      console.error("Error fetching country flag:", error);
    }
  };

  const animateModelAlongRoute = () => {
    if (!route || !mapRef.current) return;

    if (route.type !== "LineString") {
      console.error("Route is not a LineString. Animation aborted.");
      return;
    }
    if (stepRef.current === 0) {
      setCountryFlags([]); // Reset flags when animation restarts
    }

    const routeCoordinates = route.coordinates;
    const routeLength = routeCoordinates.length;

    if (stepRef.current >= routeLength) {
      const bounds = new mapboxgl.LngLatBounds();
      routeCoordinates.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds, { padding: 40, maxZoom: 8 });

      setTimeout(() => {
        stepRef.current = 0;
        animateModelAlongRoute();
      }, 3000);
      return;
    }

    const currentPoint = routeCoordinates[stepRef.current];
    // const totalDurationMs = duration * 1000;
    // const stepDuration = totalDurationMs / routeLength;

// Fetch country for a point and add to flag list
const fetchCountryForPoint = async (lngLat: number[]) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat[0]},${lngLat[1]}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    const countryFeature = data.features?.find(
      (f: { place_type: string[] }) => f.place_type.includes("country")
    );
    const countryCode = countryFeature?.properties?.short_code;

    if (countryCode) {
      const flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

      setCountryFlags((prevFlags) => {
        // Avoid duplicates
        if (!prevFlags.includes(flagUrl)) {
          return [...prevFlags, flagUrl];
        }
        return prevFlags;
      });
    }
  } catch (error) {
    console.error("Error fetching country flag:", error);
  }
};

fetchCountryForPoint(currentPoint);

    // Total Distance in meters
    const calculateTotalDistance = (coordinates: number[][]): number => {
      let totalDistance = 0;
      for (let i = 0; i < coordinates.length - 1; i++) {
        totalDistance += turf.distance(
          turf.point(coordinates[i]),
          turf.point(coordinates[i + 1])
        ) * 1000; // Convert to meters
      }
      return totalDistance;
    };
 
    const totalDistance = calculateTotalDistance(routeCoordinates); 
    const speed = totalDistance / duration; // Speed in meters per second

    const stepDistance =
      turf.distance(
        turf.point(routeCoordinates[stepRef.current]),
        turf.point(routeCoordinates[Math.min(stepRef.current + 1, routeLength - 1)])
      ) * 1000; // Convert to meters

    const stepDuration = (stepDistance / speed) * 1000; // Convert seconds to milliseconds

    // Animated route drawing logic
    const animatedRoute = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: routeCoordinates.slice(0, stepRef.current + 1),
      },
    };

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


    // mapRef.current.flyTo({ 
    //   zoom: Math.max(10, mapRef.current.getZoom()), // Keep zoom level stable
    // });
    
  const nextPoint = routeCoordinates[Math.min(stepRef.current + 1, routeLength - 1)];
  const bearing = turf.bearing(turf.point(currentPoint), turf.point(nextPoint));

  if (stepRef.current % 5 === 0) {
    mapRef.current.easeTo({
      center: animationRef.current.getLngLat(),
      pitch: 60,
      bearing: bearing,
      duration: stepDuration,
    });
  }

  stepRef.current++;
  requestAnimationFrame(() => animateModelAlongRoute());
};

  useEffect(() => {
    if (fromLocation) {
      fetchCountryFlag(fromLocation);
    }
  }, [fromLocation]);
  

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
        return { width: "340px", height: "470px" };
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

  const containerStyles = {
    flex: 1,
    height: "83vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  
  const flagStyles :CSSProperties = {
    position: "absolute",
    zIndex: 1000,
  };
  
  const exportCardStyles :CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
  };
  
  const aspectRatioBorderStyles = {
    "1:1": { width: "20px", height: "20px" },
    "9:16": { width: "15px", height: "30px" },
    "16:9": { width: "30px", height: "17px" },
  };
  
  const aspectRatioPositions = {
    "1:1": { top: "17%", right: "33%" },
    "9:16": { top: "12%", right: "38%" },
    "16:9": { top: "26%", right: "24%" },
  };

  return (
    <div className="relative w-full mr-3 ml-3 rounded-3xl border border-gray-800" style={containerStyles}>
    {/* Country Flag */}
    {isFlagEnabled && Array.isArray(countryFlags) && countryFlags.length > 0 && (
      <div
        style={{
          ...flagStyles,
          ...aspectRatioPositions[mapAspectRatio],
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(countryFlags.length, 3)}, 1fr)`,
          gap: "5px",
          padding: "5px",
        }}
      >
        {countryFlags.map((flag, index) => (
          <img
            key={index}
            src={flag}
            alt="Country Flag"
            style={{
              width: "40px",
              height: "25px",
              objectFit: "contain",
              borderRadius: "5px",
              transform: "skewY(-5deg)",
            }}
          />
        ))}
      </div>
    )}
  
    {/* Export Cards */}
    {showExportCard && <div style={exportCardStyles}><ExportVideoCard /></div>}
    {showProgressCard && <div className="absolute w-full transform -translate-x-1/7 -translate-y-1/2 z-100"><ExportProgressCard /></div>}
  
    {/* Control Buttons */}
    <div className="absolute top-5 right-5 flex flex-row gap-5 z-10">
      {/* Aspect Ratio Dropdown */}
      <div
        className="relative w-31 text-white rounded-full p-2 shadow-md border border-gray-700 flex items-center cursor-pointer"
        style={{ backgroundColor: "#212121" }}
        onClick={(e) => e.currentTarget.querySelector("select")?.click()}
      >
        <div className="flex items-center justify-center w-6 h-6 mr-3 pointer-events-none">
          <div style={{ ...aspectRatioBorderStyles[mapAspectRatio], border: "1px solid white", borderRadius: "3px" }} />
        </div>
        <select value={mapAspectRatio} onChange={handleAspectRatioChange} className="bg-transparent text-white flex-1 outline-none appearance-none cursor-pointer">
          {["1:1", "9:16", "16:9"].map((ratio) => (
            <option key={ratio} value={ratio} style={{ backgroundColor: "#212121", color: "white", padding: "8px" }}>
              {ratio}
            </option>
          ))}
        </select>
      </div>
  
      {/* 2D/3D Toggle Button */}
      <div className="flex items-center w-24 h-10 rounded-full p-1 shadow-md border border-gray-700" style={{ backgroundColor: "#212121" }}>
        {(["2D", "3D"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => handleDimensionChange(mode)}
            className={`flex-1 h-full rounded-full ${dimension === mode ? "bg-white text-black font-medium" : "text-gray-400"} flex items-center justify-center transition-all duration-200`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  
    {/* Map Container */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      <div
        ref={mapContainerRef}
        style={{
          position: "relative",
          width: mapSize.width,
          height: mapSize.height,
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "auto",
          borderRadius: "15px",
          minWidth: "100px",
          minHeight: "100px",
        }}
      />
    </div>
  </div>
  );
};

export default MapWithAspectRatios;

// import { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import ReactDOM from "react-dom/client";
// import * as turf from "@turf/turf";

// mapboxgl.accessToken = "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

// interface MapProps {
//   fromLocation: string;
//   toLocation: string;
//   selectedColor: string;
//   selectedModel: string;
//   aspectRatio?: "1:1" | "9:16" | "16:9";
//   selectedMapStyle: string;
//   route: GeoJSON.Geometry | null;
//   duration: number;
//   modelSize: number;
//   waypoints: { lat: number; lng: number }[];
// }

// const MapWithAspectRatios: React.FC<MapProps> = ({
//   fromLocation,
//   toLocation,
//   selectedColor,
//   selectedModel,
//   aspectRatio = "1:1",
//   selectedMapStyle,
//   route,
//   duration,
//   modelSize,
//   waypoints,
// }) => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const animationRef = useRef<mapboxgl.Marker | null>(null);
//   const stepRef = useRef(0);
//   const [currentCountry, setCurrentCountry] = useState<string | null>(null);

//   const fetchCountryForPoint = async (point: turf.Position) => {
//     const [lng, lat] = point;
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//     );
//     const data = await response.json();
//     return data.address?.country || "Unknown";
//   };

//   const animateModelAlongRoute = async () => {
//     if (!route || !mapRef.current) return;
//     if (route.type !== "LineString") return;

//     const routeCoordinates = route.coordinates;
//     if (stepRef.current >= routeCoordinates.length) {
//       stepRef.current = 0;
//       return;
//     }

//     const currentPoint = routeCoordinates[stepRef.current];
//     setCurrentCountry(await fetchCountryForPoint(currentPoint));

//     if (!animationRef.current) {
//       const modelElement = document.createElement("div");
//       ReactDOM.createRoot(modelElement).render(
//         <img
//           src={`/models/${selectedModel}.png`}
//           alt={selectedModel}
//           style={{
//             width: `${48 * modelSize}px`,
//             height: `${48 * modelSize}px`,
//             objectFit: "contain",
//           }}
//         />
//       );

//       animationRef.current = new mapboxgl.Marker({ element: modelElement })
//         .setLngLat(currentPoint)
//         .addTo(mapRef.current);
//     } else {
//       animationRef.current.setLngLat(currentPoint);
//     }

//     mapRef.current.easeTo({
//       center: currentPoint,
//       zoom: 14,
//       bearing: turf.bearing(
//         turf.point(currentPoint),
//         turf.point(
//           routeCoordinates[Math.min(stepRef.current + 1, routeCoordinates.length - 1)]
//         )
//       ),
//     });

//     stepRef.current++;
//     setTimeout(animateModelAlongRoute, duration * 1000 / routeCoordinates.length);
//   };

//   useEffect(() => {
//     if (mapContainerRef.current && !mapRef.current) {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: selectedMapStyle,
//         zoom: 5,
//       });

//       if (route) animateModelAlongRoute();
//     }
//   }, [route]);

//   return (
//     <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}>
//       {currentCountry && (
//         <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded">
//           <img
//             src={`https://flagcdn.com/w320/${currentCountry
//               .toLowerCase()
//               .replace(" ", "-")}.png`}
//             alt={currentCountry}
//             style={{ width: "32px", height: "24px" }}
//           />
//           {currentCountry}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapWithAspectRatios;
