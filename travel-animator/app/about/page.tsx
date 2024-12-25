// export default function about() {
//     return (
//         <h1>ABOUT PAGE</h1>
//     )
// }

"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

const DynamicMapWithStyles = () => {
  const mapContainerRef = useRef(null);
    // const mapRef = useRef(null);
    const mapRef = useRef<mapboxgl.Map | null>(null); // Explicitly type mapRef

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [debouncedFromLocation, setDebouncedFromLocation] = useState("");
  const [debouncedToLocation, setDebouncedToLocation] = useState("");
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [toCoordinates, setToCoordinates] = useState(null);

  const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/streets-v11");

  const mapStyles = [
    { label: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
    { label: "Satellite", value: "mapbox://styles/mapbox/satellite-v9" },
    { label: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
    { label: "Light", value: "mapbox://styles/mapbox/light-v10" },
    { label: "Outdoors", value: "mapbox://styles/mapbox/outdoors-v11" },
  ];

  const fetchCoordinates = async (place: string) => {
    if (!place) return null;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].center; // Longitude, Latitude
    }
    return null;
  };
  

  const drawMarkersAndRoute = async () => {
    if (!mapRef.current) return;

    // Clear existing markers and route
    const existingMarkers = document.getElementsByClassName("marker");
    while (existingMarkers.length > 0) {
      existingMarkers[0].remove();
    }
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    // Add markers
    if (fromCoordinates) {
      new mapboxgl.Marker({ className: "marker" }).setLngLat(fromCoordinates).addTo(mapRef.current);
    }
    if (toCoordinates) {
      new mapboxgl.Marker({ className: "marker" }).setLngLat(toCoordinates).addTo(mapRef.current);
    }

    // Draw route
    if (fromCoordinates && toCoordinates) {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoordinates.join(",")};${toCoordinates.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry;

        mapRef.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
              geometry: route,
              properties: {},
          },
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
            "line-color": "#1a1a1a",
            "line-width": 4,
          },
        });
      }
    }
  };

  useEffect(() => {
    const initializeMap = () => {
        if (!mapContainerRef.current) {
          console.error("Map container is not available.");
          return;
        }
      
        const map = new mapboxgl.Map({
          container: mapContainerRef.current as HTMLElement, // Use non-null assertion or type cast
          style: selectedStyle,
          center: [12.4924, 41.8902], // Default coordinates
          zoom: 5,
        });
      
        mapRef.current = map;
      
        map.on("load", () => {
          drawMarkersAndRoute(); // Draw markers and route on initial load
        });
      };
      

    if (mapRef.current) {
      mapRef.current.setStyle(selectedStyle);
      mapRef.current.on("style.load", drawMarkersAndRoute); // Redraw markers and route after style change
    } else {
      initializeMap();
    }
  }, [selectedStyle]); // Reinitialize the map when the style changes

  useEffect(() => {
    const updateLocations = async () => {
      const fromCoords = await fetchCoordinates(debouncedFromLocation);
      const toCoords = await fetchCoordinates(debouncedToLocation);

      setFromCoordinates(fromCoords);
      setToCoordinates(toCoords);

      if (fromCoords && mapRef.current) {
        mapRef.current.flyTo({ center: fromCoords, zoom: 12 });
      }

      await drawMarkersAndRoute();
    };

    updateLocations();
  }, [debouncedFromLocation, debouncedToLocation]); // Update map when debounced inputs change

  // Debounce logic
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedFromLocation(fromLocation);
      setDebouncedToLocation(toLocation);
    }, 500); // Adjust debounce delay (in milliseconds) as needed

    return () => clearTimeout(debounceTimer);
  }, [fromLocation, toLocation]); // Trigger debounce whenever inputs change

  return (
    <div>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="From Location"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
        <input
          type="text"
          placeholder="To Location"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
        <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle} style={{ padding: "8px" }}>
          {mapStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>
      <div ref={mapContainerRef} style={{ height: "80vh", width: "100%" }} />
    </div>
  );
};

export default DynamicMapWithStyles;

// "use client";
// import { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken = "pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg";

// const DynamicMapWithStyles = () => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

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
//         https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoordinates.join(",")};${toCoordinates.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}
//       );
//       const data = await response.json();
//       if (data.routes && data.routes.length > 0) {
//         const route = data.routes[0].geometry;

//         mapRef.current.addSource("route", {
//           type: "geojson",
//           data: {
//             type: "Feature",
//             geometry: route,
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
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: selectedStyle,
//         center: [12.4924, 41.8902], // Default coordinates
//         zoom: 5,
//       });
//       mapRef.current = map;

//       map.on("load", () => {
//         drawMarkersAndRoute(); // Draw markers and route on initial load
//       });
//     };

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
//     <div>
//       <div style={{ marginBottom: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
//         <input
//           type="text"
//           placeholder="From Location"
//           value={fromLocation}
//           onChange={(e) => setFromLocation(e.target.value)}
//           style={{ padding: "8px", width: "200px" }}
//         />
//         <input
//           type="text"
//           placeholder="To Location"
//           value={toLocation}
//           onChange={(e) => setToLocation(e.target.value)}
//           style={{ padding: "8px", width: "200px" }}
//         />
//         <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle} style={{ padding: "8px" }}>
//           {mapStyles.map((style) => (
//             <option key={style.value} value={style.value}>
//               {style.label}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div ref={mapContainerRef} style={{ height: "80vh", width: "100%" }} />
//     </div>
//   );
// };

// export default DynamicMapWithStyles;