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
  const [route, setRoute] = useState<GeoJSON.Geometry | null>(null);
  const [showRoute, setShowRoute] = useState(false); // Control when to show the route
  const [showPreview, setShowPreview] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("car1");
  const [selectedColor, setSelectedColor] = useState<string>("#FF0A0A");
  const [selectedMapStyle, setSelectedMapStyle] = useState<string>(
    "mapbox://styles/mapbox/streets-v11" // Default map style
  );
  const [duration, setDuration] = useState(20);
  const [modelSize, setModelSize] = useState(0.8);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Main Content Layout */}
        <main className="flex h-screen bg-black text-white overflow-hidden">
          {/* Sidebar or Preview Sidebar */}
          {showPreview ? (
            <>
              <PreviewSidebar
                onSelectStyle={(styleUrl: string) => setSelectedMapStyle(styleUrl)}
                duration = {duration}
                setDuration = {setDuration}
                modelSize = {modelSize}
                setModelSize = {setModelSize}
                />
              <MapWithAspectRatios
                fromLocation={waypoints.startingPoint}
                toLocation={waypoints.endingPoint}
                selectedModel={selectedModel}
                selectedColor={selectedColor}
                selectedMapStyle={selectedMapStyle}
                route = {route}
                duration = {duration}
                modelSize = {modelSize}

                />
            </>
          ) : (
            <>
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
              <DynamicMapWithStyles
                setWaypoints={setWaypoints}
                fromLocation={waypoints.startingPoint}
                toLocation={waypoints.endingPoint}
                // {/* // showRoute={showRoute} // Pass showRoute prop to control route visibility */}
                selectedColor={selectedColor}
                setRoute = {setRoute}
              />
            </>
          )}
          {/* <div className="flex-1 relative"> */}
          {/* <MapWithAspectRatios/> */}

          {/* </div> */}
        </main>
      </body>
    </html>
  );
}
