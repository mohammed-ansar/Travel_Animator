// "use client";
// import { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// // import { relative } from "path";

// mapboxgl.accessToken = "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

// interface MapProps {
//     fromLocation: string;
//     toLocation: string;
//   }

// const DynamicMapWithStyles = () => {
//   const mapContainerRef = useRef(null);
//     // const mapRef = useRef(null);
//     const mapRef = useRef<mapboxgl.Map | null>(null); // Explicitly type mapRef

//   const [fromLocation, setFromLocation] = useState("");
//   const [toLocation, setToLocation] = useState("");
//   const [debouncedFromLocation, setDebouncedFromLocation] = useState("");
//   const [debouncedToLocation, setDebouncedToLocation] = useState("");
//   const [fromCoordinates, setFromCoordinates] = useState(null);
//   const [toCoordinates, setToCoordinates] = useState(null);

//   const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/streets-v11");

//   const mapStyles = [
//     { label: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//     { label: "Satellite", value: "mapbox://styles/mapbox/satellite-v9" },
//     { label: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//     { label: "Light", value: "mapbox://styles/mapbox/light-v10" },
//     { label: "Outdoors", value: "mapbox://styles/mapbox/outdoors-v11" },
//   ];

//   const fetchCoordinates = async (place: string) => {
//     if (!place) return null;
//     const response = await fetch(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxgl.accessToken}`
//     );
//     const data = await response.json();
//     if (data.features && data.features.length > 0) {
//       return data.features[0].center; // Longitude, Latitude
//     }
//     return null;
//   };

//   const drawMarkersAndRoute = async () => {
//     if (!mapRef.current) return;

//     // Clear existing markers and route
//     const existingMarkers = document.getElementsByClassName("marker");
//     while (existingMarkers.length > 0) {
//       existingMarkers[0].remove();
//     }
//     if (mapRef.current.getSource("route")) {
//       mapRef.current.removeLayer("route");
//       mapRef.current.removeSource("route");
//     }

//     // Add markers
//     if (fromCoordinates) {
//       new mapboxgl.Marker({ className: "marker" }).setLngLat(fromCoordinates).addTo(mapRef.current);
//     }
//     if (toCoordinates) {
//       new mapboxgl.Marker({ className: "marker" }).setLngLat(toCoordinates).addTo(mapRef.current);
//     }

//     // Draw route
//     if (fromCoordinates && toCoordinates) {
//       const response = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoordinates.join(",")};${toCoordinates.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`
//       );
//       const data = await response.json();
//       if (data.routes && data.routes.length > 0) {
//         const route = data.routes[0].geometry;

//         mapRef.current.addSource("route", {
//           type: "geojson",
//           data: {
//             type: "Feature",
//               geometry: route,
//               properties: {},
//           },
//         });
//         mapRef.current.addLayer({
//           id: "route",
//           type: "line",
//           source: "route",
//           layout: {
//             "line-join": "round",
//             "line-cap": "round",
//           },
//           paint: {
//             "line-color": "#1a1a1a",
//             "line-width": 4,
//           },
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     const initializeMap = () => {
//         if (!mapContainerRef.current) {
//           console.error("Map container is not available.");
//           return;
//         }

//         const map = new mapboxgl.Map({
//           container: mapContainerRef.current as HTMLElement, // Use non-null assertion or type cast
//           style: selectedStyle,
//           center: [12.4924, 41.8902], // Default coordinates
//           zoom: 5,
//         });

//         mapRef.current = map;

//         map.on("load", () => {
//           drawMarkersAndRoute(); // Draw markers and route on initial load
//         });
//       };

//     if (mapRef.current) {
//       mapRef.current.setStyle(selectedStyle);
//       mapRef.current.on("style.load", drawMarkersAndRoute); // Redraw markers and route after style change
//     } else {
//       initializeMap();
//     }
//   }, [selectedStyle]); // Reinitialize the map when the style changes

//   useEffect(() => {
//     const updateLocations = async () => {
//       const fromCoords = await fetchCoordinates(debouncedFromLocation);
//       const toCoords = await fetchCoordinates(debouncedToLocation);

//       setFromCoordinates(fromCoords);
//       setToCoordinates(toCoords);

//       if (fromCoords && mapRef.current) {
//         mapRef.current.flyTo({ center: fromCoords, zoom: 12 });
//       }

//       await drawMarkersAndRoute();
//     };

//     updateLocations();
//   }, [debouncedFromLocation, debouncedToLocation]); // Update map when debounced inputs change

//   // Debounce logic
//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       setDebouncedFromLocation(fromLocation);
//       setDebouncedToLocation(toLocation);
//     }, 500); // Adjust debounce delay (in milliseconds) as needed

//     return () => clearTimeout(debounceTimer);
//   }, [fromLocation, toLocation]); // Trigger debounce whenever inputs change

//   return (
//     <div className="flex-1 relative pr-3 pl-3 rounded-3xl">
//       <div style={{ marginBottom: "10px", display:"flex", gap: "10px", alignItems: "center", }}>
//         <input
//           type="text"
//           placeholder="From Location"
//           value={fromLocation}
//           onChange={(e) => setFromLocation(e.target.value)}
//           style={{ padding: "8px", width: "200px", color: "black" }}
//         />
//         <input
//           type="text"
//           placeholder="To Location"
//           value={toLocation}
//           onChange={(e) => setToLocation(e.target.value)}
//           style={{ padding: "8px", width: "200px", color: "black" }}
//         />
//         <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle} style={{ padding: "8px", color: "black" }}>
//           {mapStyles.map((style) => (
//             <option key={style.value} value={style.value}>
//               {style.label}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div ref={mapContainerRef} style={{ height: "75vh", width: "100%" }} />
//     </div>
//   );
// };

// export default DynamicMapWithStyles;

// import { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken = "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

// interface MapProps {
//   fromLocation: string;
//   toLocation: string;
// }

// const DynamicMapWithStyles: React.FC<MapProps> = ({
//   fromLocation,
//   toLocation,
// }) => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const markersRef = useRef<mapboxgl.Marker[]>([]);  // Track markers here

//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     // Initialize map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [12.4924, 41.8902], // Default coordinates
//       zoom: 5,
//     });
//   }, []);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Function to fetch coordinates based on place name
//     const fetchCoordinates = async (place: string) => {
//       const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//           place
//         )}.json?access_token=${mapboxgl.accessToken}`
//       );
//       const data = await response.json();
//       return data.features?.[0]?.center || null;
//     };

//     // Update the map with the new locations
//     const updateMap = async () => {
//       const fromCoords = await fetchCoordinates(fromLocation);
//       const toCoords = await fetchCoordinates(toLocation);

//       // Remove old markers if any
//       markersRef.current.forEach(marker => marker.remove());
//       markersRef.current = [];  // Clear the markers array

//       if (fromCoords) {
//         const fromMarker = new mapboxgl.Marker().setLngLat(fromCoords).addTo(mapRef.current!);
//         markersRef.current.push(fromMarker);  // Store the marker for later removal
//         mapRef.current!.flyTo({ center: fromCoords, zoom: 12 });
//       }

//       if (toCoords) {
//         const toMarker = new mapboxgl.Marker().setLngLat(toCoords).addTo(mapRef.current!);
//         markersRef.current.push(toMarker);  // Store the marker for later removal
//       }
//     };

//     updateMap();
//   }, [fromLocation, toLocation]); // Re-run the effect when the locations change

//   return (
//     <div
//       className="mr-3 ml-3 rounded-3xl"
//       ref={mapContainerRef}
//       style={{ flex: 1, height: "83vh", width: "100%" }}
//     />
//   );
// };

// export default DynamicMapWithStyles;

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

// "use client";

// import { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

// const MapWithAspectRatios = () => {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const [aspectRatio, setAspectRatio] = useState("16:9");
//   const [dimension, setDimension] = useState("2D");

//   // Map initialization
//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [133.7751, -25.2744], // Default coordinates (Australia)
//       zoom: 4,
//     });
//   }, []);

//   // Update map dimension
//   useEffect(() => {
//     if (!mapRef.current) return;

//     if (dimension === "2D") {
//       mapRef.current.setStyle("mapbox://styles/mapbox/streets-v11");
//       mapRef.current.setPitch(0); // Flat view
//     } else if (dimension === "3D") {
//       mapRef.current.setStyle("mapbox://styles/mapbox/satellite-v9");
//       mapRef.current.setPitch(45); // Perspective
//       mapRef.current.setZoom(5);
//     }
//   }, [dimension]);

//   // Handle aspect ratio changes
//   const calculateHeight = (width: number): string => {
//     switch (aspectRatio) {
//       case "1:1":
//         return `${width}px`; // Square
//       case "9:16":
//         return `${(width / 9) * 16}px`; // Portrait
//       case "16:9":
//         return `${(width / 16) * 9}px`; // Landscape
//       default:
//         return "500px";
//     }
//   };

//   const mapStyles = {
//     width: "100%",
//     height: calculateHeight(700), // Adjust based on container width
//   };

//   return (
//     <div
//       className="relative w-full h-[83vh] rounded-2xl border border-gray-800 bg-gray-900 p-4 flex items-center justify-center"
//       style={{ backgroundColor: "#121216" }}
//     >
//       {/* Dropdowns Container */}
//       <div className="absolute top-5 right-5 flex flex-row gap-5 z-10">
//         {/* Dropdown for Aspect Ratios */}
//         <div
//           className="relative w-24 text-white rounded-full p-2 shadow-md border border-gray-700 flex items-center cursor-pointer"
//           style={{ backgroundColor: "#212121" }}
//         >
//           {/* Left Icon */}
//           <div className="flex items-center justify-center w-4 h-6 border-2 border-white rounded-sm mr-2 pointer-events-none">
//             {/* Placeholder for the icon (can replace with an SVG or actual icon) */}
//           </div>
//           {/* Dropdown Select */}
//           <select
//             value={aspectRatio}
//             onChange={(e) => setAspectRatio(e.target.value)}
//             className="bg-transparent text-white flex-1 outline-none appearance-none cursor-pointer"
//           >
//             <option value="1:1">1:1</option>
//             <option value="9:16">9:16</option>
//             <option value="16:9">16:9</option>
//           </select>
//           {/* Dropdown Arrow */}
//           <span className="text-gray-500 ml-2 pointer-events-none">
//             &#x25BC;
//           </span>
//         </div>

//         {/* Toggle button */}
//         <div
//           className="flex items-center w-24 h-10 rounded-full p-1 shadow-md border border-gray-700"
//           style={{ backgroundColor: "#212121" }}
//         >
//           <button
//             onClick={() => setDimension("2D")}
//             className={`flex-1 h-full rounded-full ${
//               dimension === "2D"
//                 ? "bg-white text-black font-medium"
//                 : "text-gray-400"
//             } flex items-center justify-center transition-all duration-200`}
//           >
//             2D
//           </button>
//           <button
//             onClick={() => setDimension("3D")}
//             className={`flex-1 h-full rounded-full ${
//               dimension === "3D"
//                 ? "bg-white text-black font-medium"
//                 : "text-gray-400"
//             } flex items-center justify-center transition-all duration-200`}
//           >
//             3D
//           </button>
//         </div>
//       </div>

//       {/* Map Container */}
//       <div
//         ref={mapContainerRef}
//         className="map-container rounded-xl shadow-lg"
//         style={{
//           ...mapStyles,
//           maxWidth: "90%", // Ensure it doesn’t stretch too wide
//           maxHeight: "90%", // Ensure it doesn’t stretch too tall
//         }}
//       />
//     </div>
//   );
// };

// export default MapWithAspectRatios;

