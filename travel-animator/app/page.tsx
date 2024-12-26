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
  const [showRoute, setShowRoute] = useState(false); // Control when to show the route
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClick = () => {
    if (!waypoints.startingPoint || !waypoints.endingPoint) {
      setErrorMessage("Oops! Preview mode needs at least 2 waypoints to work.");
      setShowRoute(false); // Hide the route if locations are invalid
      setShowPreview(false);
    } else {
      setErrorMessage(""); // Clear the error if inputs are valid
      setShowRoute(true); // Show the route when preview button is clicked
      setShowPreview(true);
      console.log("Previewing route with waypoints:", waypoints);
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Main Content Layout */}
        <main className="flex h-screen bg-black text-white overflow-hidden">
          <Sidebar
            waypoints={waypoints}
            setWaypoints={setWaypoints}
            handlePreviewClick={handlePreviewClick}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
          />
          {/* <div className="flex-1 relative"> */}
          <DynamicMapWithStyles
            fromLocation={waypoints.startingPoint}
            toLocation={waypoints.endingPoint}
            // showRoute={showRoute} // Pass showRoute prop to control route visibility
          />
          {/* </div> */}
        </main>

        {/* Error Message Popup */}
        {errorMessage && (
          <div className="absolute bottom-7 right-5 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg">
            <p>{errorMessage}</p>
          </div>
        )}
      </body>
    </html>
  );
}



