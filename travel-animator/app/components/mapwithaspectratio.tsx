"use-client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom/client";
import Plane from "../icons/Plane";
import { along, length, bearing } from "@turf/turf";
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
  route: GeoJSON.Geometry | null;
  // setSelectedMapStyle: React.Dispatch<React.SetStateAction<string>>; 
}

const MapWithAspectRatios: React.FC<MapProps & { selectedMapStyle: string }> = ({
  fromLocation,
  toLocation,
  selectedColor,
  selectedModel,
  aspectRatio = "1:1", // Default to 16:9
  selectedMapStyle,
  route,
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
  const routeRef = useRef<any>(null);
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

  // const drawRoute = () => {
  //   if (!mapRef.current || !routeRef.current) return;
  
  //   // Initialize the GeoJSON structure for the partial route
  //   const partialRoute = {
  //     type: "Feature",
  //     geometry: {
  //       type: "LineString",
  //       coordinates: [],
  //     },
  //     properties:{},
  //   };
  
  //   // Add the partial route source and layer if not already added
  //   if (!mapRef.current.getSource("partialRoute")) {
  //     mapRef.current.addSource("partialRoute", {
  //       type: "geojson",
  //       data: partialRoute,
  //     });
  
  //     mapRef.current.addLayer({
  //       id: "partialRoute",
  //       type: "line",
  //       source: "partialRoute",
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": selectedColor || "#121216",
  //         "line-width": 3,
  //       },
  //     });
  //   }
  
  
   
  //   routeRef.current = lineGeoJSON;
  //   animateModelAlongRoute();
  // };

  // const animateModelAlongRoute = () => {
  //   if (!routeRef.current || !mapRef.current) return;
  
  //   console.log("Route Data:", routeRef.current);

  //   const routeLength = length(routeRef.current); // Total route length
  //   console.log("Route Length:", routeLength, "Current Step:", stepRef.current);

  //   if (stepRef.current >= routeLength) {
  //     stepRef.current = 0; // Reset animation when it ends
  //     return;
  //   }
  
  //   // Get the current and next points along the route
  //   const currentPoint = along(routeRef.current, stepRef.current).geometry
  //     .coordinates as [number, number];
  //   const nextPoint = along(routeRef.current, stepRef.current + increment)
  //     .geometry.coordinates as [number, number];
  
  //   // Draw the partial route up to the current position
  //   const partialRoute = {
  //     type: "Feature",
  //     geometry: {
  //       type: "LineString",
  //       coordinates: routeRef.current.geometry.coordinates.slice(0, stepRef.current),
  //     },
  //   };
  
  //   // Update the route source to show the partial route
  //   if (mapRef.current.getSource("partialRoute")) {
  //     mapRef.current.getSource("partialRoute").setData(partialRoute);
  //   } else {
  //     mapRef.current.addSource("partialRoute", {
  //       type: "geojson",
  //       data: partialRoute,
  //     });
  
  //     mapRef.current.addLayer({
  //       id: "partialRoute",
  //       type: "line",
  //       source: "partialRoute",
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": selectedColor || "#121216",
  //         "line-width": 3,
  //       },
  //     });
  //   }
  
  //   // Create or update the model marker
  //   if (!animationRef.current) {
  //     console.log("Creating new animation marker");

  //     const modelElement = document.createElement("div");
  //     modelElement.className = "model-marker";
  
  //     ReactDOM.createRoot(modelElement).render(
  //       <img
  //         src={`/models/${selectedModel}.png`}
  //         alt={selectedModel}
  //         style={{ width: "48px", height: "48px", objectFit: "contain" }}
  //       />
  //     );
  
  //     animationRef.current = new mapboxgl.Marker({ element: modelElement })
  //       .setLngLat(currentPoint)
  //       .addTo(mapRef.current);
  //   } else {
  //     animationRef.current.setLngLat(currentPoint);
  //     console.log("Updating animation marker position");

  //   }
  
  //   // Calculate the direction for camera movement
  //   const direction = bearing(currentPoint, nextPoint);
  
  //   // Update the camera to follow the model
  //   mapRef.current.flyTo({
  //     center: currentPoint,
  //     zoom: 15, // Adjust zoom level
  //     bearing: direction,
  //     pitch: 60, // Higher pitch for a more 3D effect
  //     speed: 0.5, // Camera movement speed
  //   });
  
  //   stepRef.current += increment;
  //   setTimeout(animateModelAlongRoute, interval);
  // };
  
  
  // const resetAnimation = () => {
  //   if (!routeRef.current) return;
  
  //   // Reset step reference
  //   stepRef.current = 0;
  
  //   // If the model marker already exists, update its position
  //   if (animationRef.current) {
  //     const currentPoint = along(routeRef.current, stepRef.current).geometry
  //       .coordinates as [number, number];
  //     animationRef.current.setLngLat(currentPoint);
  //   }
  
  //   // Restart the animation
  //   animateModelAlongRoute();
  // };
  
  

  // const addWaypoint = (lngLat: mapboxgl.LngLat) => {
  //   const waypointMarker = new mapboxgl.Marker({ draggable: true })
  //     .setLngLat(lngLat)
  //     .addTo(mapRef.current!);
  
  //   // Update the route when the waypoint is dragged
  //   waypointMarker.on("dragend", () => {
  //     drawRoute();
  //     resetAnimation(); // Reset the animation to follow the new route
  //   });
  
  //   // Add the marker to the waypoints array
  //   markersRef.current.waypoints.push(waypointMarker);
  
  //   // Redraw the route
  //   drawRoute();
  //   resetAnimation(); // Reset the animation initially
  // };
  

  // useEffect(() => {
  //   if (!mapContainerRef.current || mapRef.current) return;

  //   mapRef.current = new mapboxgl.Map({
  //     container: mapContainerRef.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [12.4924, 41.8902],
  //     zoom: 5,
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!mapRef.current) return;

  //   const updateMap = async () => {
  //     const fromCoords = await fetchCoordinates(fromLocation);
  //     const toCoords = await fetchCoordinates(toLocation);

  //     if (markersRef.current.fromMarker) {
  //       markersRef.current.fromMarker.remove();
  //     }

  //     if (fromCoords) {
  //       const planeIconContainer = document.createElement("div");
  //       ReactDOM.createRoot(planeIconContainer).render(<Plane />);

  //       const fromMarker = new mapboxgl.Marker({
  //         element: planeIconContainer,
  //         draggable: true,
  //       })
  //         .setLngLat(fromCoords)
  //         .addTo(mapRef.current);

  //       fromMarker.on("dragend", drawRoute);
  //       markersRef.current.fromMarker = fromMarker;
  //       mapRef.current.flyTo({ center: fromCoords, zoom: 12 });
  //     }

  //     if (markersRef.current.toMarker) {
  //       markersRef.current.toMarker.remove();
  //     }

  //     if (toCoords) {
  //       const flagIconContainer = document.createElement("div");
  //       ReactDOM.createRoot(flagIconContainer).render(<Destination />);

  //       const toMarker = new mapboxgl.Marker({
  //         element: flagIconContainer,
  //         draggable: true,
  //       })
  //         .setLngLat(toCoords)
  //         .addTo(mapRef.current);

  //       toMarker.on("dragend", drawRoute);
  //       markersRef.current.toMarker = toMarker;
  //     }

  //     if (fromCoords && toCoords) {
  //       drawRoute();
  //     }
  //   };

  //   updateMap();
  // }, [fromLocation, toLocation,selectedColor]);



  const animateModelAlongRoute = () => {
    if (!route || !mapRef.current) return;

    const routeCoordinates = route.coordinates;
    const routeLength = routeCoordinates.length;

    if (stepRef.current >= routeLength) {
      stepRef.current = 0;
      requestAnimationFrame(animateModelAlongRoute); 
      return;
    }

    // Get current and next point
    const currentPoint = routeCoordinates[stepRef.current];
    const nextPoint =
      routeCoordinates[Math.min(stepRef.current + 1, routeLength - 1)];


    // Draw the animated segment of the route
  const animatedRoute = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: routeCoordinates.slice(0, stepRef.current + 1), // Slice up to the current step
    },
  };

  // Update the map source dynamically
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
        "line-color": selectedColor || "#121216", // Use the selected color
        "line-width": 5,
      },
    });
  }

    // Update animation marker
    if (!animationRef.current) {
      const modelElement = document.createElement("div");
      ReactDOM.createRoot(modelElement).render(
        <img
          src={`/models/${selectedModel}.png`} // Replace with your selected model
          alt={selectedModel}
          style={{ width: "48px", height: "48px", objectFit: "contain" }}
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

    // Update the map view to follow the model
    const bearingDirection = bearing(currentPoint, nextPoint);
    mapRef.current.flyTo({
      center: currentPoint,
      zoom: 10,
      bearing: 0,  
      // bearing : bearingDirection,
      pitch: 40,
      speed: 0.5,
    });

    stepRef.current++;
    requestAnimationFrame(animateModelAlongRoute);
  };

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

