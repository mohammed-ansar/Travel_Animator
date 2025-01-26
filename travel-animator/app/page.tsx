"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import DynamicMapWithStyles from "./components/mapsection";
import PreviewSidebar from "./components/previewsidebar";
import MapWithAspectRatios from "./components/mapwithaspectratio";
import ToggleButtons from "./components/togglebuttons";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const [waypoints, setWaypoints] = useState({
    startingPoint: "",
    endingPoint: "",
  });
  const [route, setRoute] = useState<GeoJSON.Geometry | null>(null);
  const [activeTab, setActiveTab] = useState("routes"); // Manages active tab
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("car1");
  const [selectedColor, setSelectedColor] = useState<string>("#FF0A0A");
  const [selectedMapStyle, setSelectedMapStyle] = useState<string>(
    "mapbox://styles/mapbox/streets-v11"
  );
  const [duration, setDuration] = useState(20);
  const [modelSize, setModelSize] = useState(0.8);
  const [isFlagEnabled, setIsFlagEnabled] = useState(true);


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="flex h-screen bg-black text-white overflow-hidden">
          {/* Toggle Buttons */}
          <div
            className="w-1/5 absolute top-24 left-11 p-1 rounded-3xl shadow-md z-10"
            style={{ backgroundColor: "#121216" }}
          >
            <ToggleButtons
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              waypoints={waypoints}
              setShowModelSelector={setShowModelSelector}
              setPopupVisible={setPopupVisible}
              setErrorPopup={setErrorPopup}
            />
          </div>

          {/* Conditional Sidebar Rendering */}
          {activeTab === "preview" ? (
            <>
              <PreviewSidebar
                onSelectStyle={(styleUrl: string) =>
                  setSelectedMapStyle(styleUrl)
                }
                duration={duration}
                setDuration={setDuration}
                modelSize={modelSize}
                setModelSize={setModelSize}
                isFlagEnabled={isFlagEnabled}
                setIsFlagEnabled={setIsFlagEnabled}
              />
              <MapWithAspectRatios
                fromLocation={waypoints.startingPoint}
                toLocation={waypoints.endingPoint}
                selectedModel={selectedModel}
                selectedColor={selectedColor}
                selectedMapStyle={selectedMapStyle}
                route={route}
                duration={duration}
                modelSize={modelSize}
                isFlagEnabled={isFlagEnabled}
              />
            </>
          ) : (
            <>
              <Sidebar
                waypoints={waypoints}
                setWaypoints={setWaypoints}
                showPreview={activeTab === "preview"}
                setShowPreview={() => setActiveTab("preview")}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                errorPopup={errorPopup}
                setErrorPopup={setErrorPopup} // Pass down the errorPopup handler
              />
              <DynamicMapWithStyles
                setWaypoints={setWaypoints}
                fromLocation={waypoints.startingPoint}
                toLocation={waypoints.endingPoint}
                selectedColor={selectedColor}
                setRoute={setRoute}
              />
            </>
          )}
        </main>
      </body>
    </html>
  );
}