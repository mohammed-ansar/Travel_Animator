import React, { useState } from "react";
import { FaFlag, FaMapMarkerAlt } from "react-icons/fa";
import { PiMapPinAreaFill } from "react-icons/pi";

import ToggleButtons from "./togglebuttons";
import MapStyle from "./mapstyle";

interface PreviewSidebarProps {
  onSelectStyle: (styleUrl: string) => void; // Callback for selecting a map style
  duration: number;
  setDuration: (duration: number) => void;
  modelSize: number;
  setModelSize: (modelSize: number) => void;
  isFlagEnabled: boolean; // Pass the boolean value
  setIsFlagEnabled: (value: boolean) => void; // Pass the setter function
}

const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
  onSelectStyle,
  duration,
  setDuration,
  modelSize,
  setModelSize,
  isFlagEnabled,
  setIsFlagEnabled,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [isFlagEnabled, setIsFlagEnabled] = useState(true);
  const [activeUnit, setActiveUnit] = useState("Km");
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [waypoints, setWaypoints] = useState({
    startingPoint: "",
    endingPoint: "",
  });
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [currentView, setCurrentView] = useState("Preview"); // State to track the current view

  const handleMapStyleClick = () => {
    setCurrentView("MapStyle"); // Switch to the MapStyle view
  };

  const handleBackClick = () => {
    setCurrentView("Preview"); // Switch back to the Preview view
  };

  const handleFlagToggle = () => {
    setIsFlagEnabled(!isFlagEnabled); // Toggle the flag state
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value));
  }; // handling speed of model

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelSize(parseFloat(e.target.value));
  };

  return (
    <div
      className="w-1/4 h-5/6 ml-3 p-3 pt-8 border border-gray-800 rounded-3xl flex flex-col relative"
      style={{
        backgroundColor: "#121216",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      {currentView === "Preview" ? (
        <div className="mb-auto">
          {/* <ToggleButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            waypoints={waypoints}
            setShowModelSelector={setShowModelSelector}
            setPopupVisible={setPopupVisible}
            setErrorPopup={setErrorPopup}
          /> */}

          {/* Sliders */}
          <div className="my-8 py-4">
            <div className="mb-2">
              <label className="block text-sm mb-1">Model size</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={modelSize} // Controlled input
                onChange={handleSizeChange}
                className="w-full"
              />
              <div className="text-right text-xs mt-1">
                {modelSize.toFixed(1)}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Duration</label>
              <input
                type="range"
                min="9"
                max="53"
                step="1"
                value={duration}
                onChange={handleDurationChange}
                className="w-full"
              />
              <div className="text-right text-xs mt-1">{duration} Sec</div>
            </div>
          </div>

          {/* Flag Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaFlag className="ml-1 mr-2 text-sm" />
              <span className="text-white text-sm">Flag</span>
            </div>
            <div
              className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
                isFlagEnabled ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={handleFlagToggle}
            >
              <div
                className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
                  isFlagEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>

          {/* Unit Selector */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-sm mr-2" />
              <span className="text-white text-sm">Unit</span>
            </div>
            <div className="flex space-x-1 ml-3 border border-gray-800 p-1 rounded-md">
              {["Km", "Mi", "Off"].map((unit) => (
                <button
                  key={unit}
                  className={`px-2 py-1 text-xs rounded-md ${
                    activeUnit === unit
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                  onClick={() => setActiveUnit(unit)}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Map Style */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <PiMapPinAreaFill className="mr-2 text-xl text-white" />
              <span className="text-white text-sm">Map style</span>
            </div>
            <button className="ml-5" onClick={handleMapStyleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="3"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Add Destinations */}
          <button
            className="w-full py-2 text-blue-500 rounded-lg mt-4"
            style={{ backgroundColor: "#0A84FF14" }}
          >
            + Add destinations
          </button>
        </div>
      ) : (
        <MapStyle
          onBack={handleBackClick}
          onSelectStyle={onSelectStyle} // Pass onSelectStyle to MapStyle component
        />
      )}
    </div>
  );
};

export default PreviewSidebar;

// import React, { useState, useEffect } from "react";
// import { FaFlag } from "react-icons/fa";

// interface PreviewSidebarProps {
//   onSelectStyle: (styleUrl: string) => void;
//   duration: number;
//   setDuration: (duration: number) => void;
//   modelSize: number;
//   setModelSize: (modelSize: number) => void;
//   waypoints?: { lat: number; lng: number }[]; // Made optional
// }

// const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
//   onSelectStyle,
//   duration,
//   setDuration,
//   modelSize,
//   setModelSize,
//   waypoints = [], // Default to an empty array
// }) => {
//   const [isFlagEnabled, setIsFlagEnabled] = useState(true);
//   const [currentCountry, setCurrentCountry] = useState<string | null>(null);

//   useEffect(() => {
//     if (isFlagEnabled && waypoints.length > 0) {
//       const fetchCountryData = async () => {
//         const waypointCountryPromises = waypoints.map(async (waypoint) => {
//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${waypoint.lat}&lon=${waypoint.lng}`
//           );
//           const data = await response.json();
//           return data.address?.country || "Unknown";
//         });

//         const countries = await Promise.all(waypointCountryPromises);
//         setCurrentCountry(countries[0]);
//       };

//       fetchCountryData();
//     }
//   }, [isFlagEnabled, waypoints]);

//   const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDuration(Number(event.target.value));
//   };

//   const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setModelSize(parseFloat(e.target.value));
//   };

//   return (
//     <div
//       className="w-1/4 h-5/6 ml-3 p-3 pt-8 border border-gray-800 rounded-3xl flex flex-col relative"
//       style={{
//         backgroundColor: "#121216",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "stretch",
//         justifyContent: "center",
//       }}
//     >
//       {isFlagEnabled && currentCountry && (
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 rounded-b-xl text-center">
//           <img
//             src={`https://flagcdn.com/w320/${currentCountry
//               .toLowerCase()
//               .replace(" ", "-")}.png`}
//             alt={currentCountry}
//             className="w-12 h-8"
//           />
//           <p className="text-white text-sm mt-1">{currentCountry}</p>
//         </div>
//       )}

//       <div className="mb-auto">
//         <div className="my-8 py-4">
//           <div className="mb-2">
//             <label className="block text-sm mb-1">Model size</label>
//             <input
//               type="range"
//               min="0.5"
//               max="2"
//               step="0.1"
//               value={modelSize}
//               onChange={handleSizeChange}
//               className="w-full"
//             />
//             <div className="text-right text-xs mt-1">
//               {modelSize.toFixed(1)}
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm mb-1">Duration</label>
//             <input
//               type="range"
//               min="9"
//               max="53"
//               step="1"
//               value={duration}
//               onChange={handleDurationChange}
//               className="w-full"
//             />
//             <div className="text-right text-xs mt-1">{duration} Sec</div>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center">
//             <FaFlag className="ml-1 mr-2 text-sm" />
//             <span className="text-white text-sm">Flag</span>
//           </div>
//           <div
//             className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
//               isFlagEnabled ? "bg-blue-600" : "bg-gray-700"
//             }`}
//             onClick={() => setIsFlagEnabled(!isFlagEnabled)}
//           >
//             <div
//               className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
//                 isFlagEnabled ? "translate-x-5" : "translate-x-0"
//               }`}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewSidebar;


