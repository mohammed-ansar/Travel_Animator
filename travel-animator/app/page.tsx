"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import DynamicMapWithStyles from "./components/mapsection";
import PreviewSidebar from "./components/previewsidebar";
import MapWithAspectRatios from "./components/mapwithaspectratio";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const [waypoints, setWaypoints] = useState({
    startingPoint: "",
    endingPoint: "",
  });
  const [showRoute, setShowRoute] = useState(false); // Control when to show the route
  const [showPreview, setShowPreview] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("car1");
  const [selectedColor, setSelectedColor] = useState<string>("#FF0A0A");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Main Content Layout */}
        <main className="flex h-screen bg-black text-white overflow-hidden">
          <Sidebar
            waypoints={waypoints}
            setWaypoints={setWaypoints}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          />
          {/* <PreviewSidebar /> */}
          {/* <div className="flex-1 relative"> */}
          {/* <MapWithAspectRatios/> */}
          <DynamicMapWithStyles
            fromLocation={waypoints.startingPoint}
            toLocation={waypoints.endingPoint}
            // {/* // showRoute={showRoute} // Pass showRoute prop to control route visibility */}
            selectedModel={selectedModel}
            selectedColor={selectedColor}
          />

          {/* </div> */}
        </main>
      </body>
    </html>
  );
}
