"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import DynamicMapWithStyles from "./components/mapsection";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const [waypoints, setWaypoints] = useState({
    startingPoint: "",
    endingPoint: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handlePreviewClick = () => {
    if (!waypoints.startingPoint || !waypoints.endingPoint) {
      setErrorMessage("Oops! Preview mode needs at least 2 waypoints to work.");
    } else {
      setErrorMessage(""); // Clear the error if inputs are valid
      // Add logic to handle preview functionality here
      console.log("Previewing route with waypoints:", waypoints);
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Main Content Layout */}
        <main className="flex h-screen bg-black text-white p-3">
          {/* Sidebar */}
          {/* <aside className="w-1/4 bg-zinc-900 p-4 rounded-l-2xl flex flex-col">
            {/* Toggle Buttons */}
            {/* <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
              <button className="flex-1 py-2 bg-blue-500 text-white font-bold rounded-l-3xl">
                Routes
              </button>
              <button
                className="flex-1 py-2 bg-zinc-900 text-gray-300 font-bold rounded-r-2xl"
                onClick={handlePreviewClick}
              >
                Preview
              </button>
            </div> */}

            {/* Waypoints */}
            {/* <div>
              <p className="mb-4">0 Waypoints</p>
              Starting Point
              <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl">
                <div className="mr-2 text-blue-400">➖</div>
                <input
                  type="text"
                  placeholder="Enter Starting Point"
                  value={waypoints.startingPoint}
                  onChange={(e) =>
                    setWaypoints({
                      ...waypoints,
                      startingPoint: e.target.value,
                    })
                  }
                  className="flex-1 bg-zinc-800 text-white outline-none"
                />
              </div> */}
              {/* Ending Point */}
              {/* <div className="flex items-center bg-zinc-800 p-2 rounded-3xl">
                <div className="mr-2 text-orange-400">➖</div>
                <input
                  type="text"
                  placeholder="Enter Ending Point"
                  value={waypoints.endingPoint}
                  onChange={(e) =>
                    setWaypoints({ ...waypoints, endingPoint: e.target.value })
                  }
                  className="flex-1 bg-zinc-800 text-white outline-none"
                />
              </div>
            </div>
          </aside>  */}
          <Sidebar
            waypoints={waypoints}
            setWaypoints={setWaypoints}
            handlePreviewClick={handlePreviewClick}
          />
          <DynamicMapWithStyles/>
          {/* Main Content Area */}
          {/* <section className="flex-1 bg-black rounded-r-xl"> */}
            {/* Embedded Map or Other Content */}
            {/* <div className="h-full w-full">
              <iframe
                width="100%"
                height="400px"
                src="https://api.mapbox.com/styles/v1/ansarplk/cm50nlczt009801sacyakekh7.html?title=false&access_token=pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg&zoomwheel=false#2/38/-34"
                title="Untitled"
                className="w-full h-full rounded-2xl"
              ></iframe>
            </div>
          </section> */}
        </main>

        {/* Error Message Popup */}
        {errorMessage && (
          <div className="absolute bottom-1 right-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg">
            <p>{errorMessage}</p>
          </div>
        )}
      </body>
    </html>
  );
}
// mapbox://styles/ansarplk/cm50nlczt009801sacyakekh7
// pk.eyJ1IjoiYW5zYXJwbGsiLCJhIjoiY201MGl5YXVxMDJrazJxczdmOWxpYnlkdyJ9.WTtiaIwKI-NlrXjjYXDzSg

// "use client";

// import "./globals.css";
// import { Inter } from "next/font/google";
// import React, { useState } from "react";
// import Sidebar from "./components/sidebar";
// import MapSection from "./components/mapsection";
// import ErrorMessage from "./components/errormessage";

// const inter = Inter({ subsets: ["latin"] });

// export default function Page() {
//   const [waypoints, setWaypoints] = useState({
//     startingPoint: "",
//     endingPoint: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");

//   const handlePreviewClick = () => {
//     if (!waypoints.startingPoint || !waypoints.endingPoint) {
//       setErrorMessage("Oops! Preview mode needs at least 2 waypoints to work.");
//     } else {
//       setErrorMessage("");
//       console.log("Previewing route with waypoints:", waypoints);
//     }
//   };

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <main className="flex h-screen bg-black text-white p-3">
//           <Sidebar
//             waypoints={waypoints}
//             setWaypoints={setWaypoints}
//             handlePreviewClick={handlePreviewClick}
//           />
//           <MapSection/>
//         </main>
//         {/* {errorMessage && <ErrorMessage message={errorMessage} />} */}
//       </body>
//     </html>
//   );
// }

// "use client";
// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "./globals.css";
// import { Inter } from "next/font/google";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibXViZWVuYS1tdW56aXIiLCJhIjoiY200dHJraHRmMGdsejJqcXlseGx2OGlraiJ9.s-efXUqSnUt6DxLGi0SoEw";

// const inter = Inter({ subsets: ["latin"] });

// const DynamicMapWithStyles = ({ waypoints }) => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const [selectedStyle, setSelectedStyle] = useState(
//     "mapbox://styles/mapbox/streets-v11"
//   );
//   const [fromCoordinates, setFromCoordinates] = useState(null);
//   const [toCoordinates, setToCoordinates] = useState(null);

//   const mapStyles = [
//     { label: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//     { label: "Satellite", value: "mapbox://styles/mapbox/satellite-v9" },
//     { label: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//     { label: "Light", value: "mapbox://styles/mapbox/light-v10" },
//     { label: "Outdoors", value: "mapbox://styles/mapbox/outdoors-v11" },
//   ];

//   const fetchCoordinates = async (place) => {
//     if (!place) return null;
//     const response = await fetch(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         place
//       )}.json?access_token=${mapboxgl.accessToken}`
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
//       new mapboxgl.Marker({ className: "marker" })
//         .setLngLat(fromCoordinates)
//         .addTo(mapRef.current);
//     }
//     if (toCoordinates) {
//       new mapboxgl.Marker({ className: "marker" })
//         .setLngLat(toCoordinates)
//         .addTo(mapRef.current);
//     }

//     // Draw route
//     if (fromCoordinates && toCoordinates) {
//       const response = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoordinates.join(
//           ","
//         )};${toCoordinates.join(",")}?geometries=geojson&access_token=${
//           mapboxgl.accessToken
//         }`
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
//     const updateCoordinates = async () => {
//       const fromCoords = await fetchCoordinates(waypoints.startingPoint);
//       const toCoords = await fetchCoordinates(waypoints.endingPoint);

//       setFromCoordinates(fromCoords);
//       setToCoordinates(toCoords);

//       if (fromCoords && mapRef.current) {
//         mapRef.current.flyTo({ center: fromCoords, zoom: 12 });
//       }

//       await drawMarkersAndRoute();
//     };

//     updateCoordinates();
//   }, [waypoints]); // Update map when waypoints change

//   return (
//     <div>
//       <div style={{ marginBottom: "10px" }}>
//         <select
//           onChange={(e) => setSelectedStyle(e.target.value)}
//           value={selectedStyle}
//           style={{ padding: "8px" }}
//         >
//           {mapStyles.map((style) => (
//             <option key={style.value} value={style.value}>
//               {style.label}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
//     </div>
//   );
// };

// export default function Page() {
//   const [waypoints, setWaypoints] = useState({
//     startingPoint: "",
//     endingPoint: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");

//   const handlePreviewClick = () => {
//     if (!waypoints.startingPoint || !waypoints.endingPoint) {
//       setErrorMessage("Oops! Preview mode needs at least 2 waypoints to work.");
//     } else {
//       setErrorMessage(""); // Clear the error if inputs are valid
//     }
//   };

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <main className="flex h-screen bg-black text-white p-3">
//           <aside className="w-1/4 bg-zinc-900 p-4 rounded-l-2xl flex flex-col">
//             <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
//               <button className="flex-1 py-2 bg-blue-500 text-white font-bold rounded-l-3xl">
//                 Routes
//               </button>
//               <button
//                 className="flex-1 py-2 bg-zinc-900 text-gray-300 font-bold rounded-r-2xl"
//                 onClick={handlePreviewClick}
//               >
//                 Preview
//               </button>
//             </div>
//             <div>
//               <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl">
//                 <input
//                   type="text"
//                   placeholder="Enter Starting Point"
//                   value={waypoints.startingPoint}
//                   onChange={(e) =>
//                     setWaypoints({
//                       ...waypoints,
//                       startingPoint: e.target.value,
//                     })
//                   }
//                   className="flex-1 bg-zinc-800 text-white outline-none"
//                 />
//               </div>
//               <div className="flex items-center bg-zinc-800 p-2 rounded-3xl">
//                 <input
//                   type="text"
//                   placeholder="Enter Ending Point"
//                   value={waypoints.endingPoint}
//                   onChange={(e) =>
//                     setWaypoints({
//                       ...waypoints,
//                       endingPoint: e.target.value,
//                     })
//                   }
//                   className="flex-1 bg-zinc-800 text-white outline-none"
//                 />
//               </div>
//             </div>
//           </aside>
//           <section className="flex-1 bg-black rounded-r-xl">
//             <DynamicMapWithStyles waypoints={waypoints} />
//           </section>
//         </main>
//         {errorMessage && (
//           <div className="absolute bottom-1 right-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg">
//             <p>{errorMessage}</p>
//           </div>
//         )}
//       </body>
//     </html>
//   );
// }


