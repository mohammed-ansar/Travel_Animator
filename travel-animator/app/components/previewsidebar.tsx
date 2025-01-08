
// import React, { useState } from "react";
// import { FaFlag, FaMapMarkerAlt } from "react-icons/fa";
// import { PiMapPinAreaFill } from "react-icons/pi";

// import ToggleButtons from "./togglebuttons";
// import MapStyle from "./mapstyle";

// interface PreviewSidebarProps{
//   // selectedMapStyle: string;  
//   // setSelectedMapStyle: React.Dispatch<React.SetStateAction<string>>; 
//   onSelectStyle: (styleUrl: string) => void;
// }

// const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
//   // selectedMapStyle,
//   // setSelectedMapStyle,
//   onSelectStyle,

  
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isFlagEnabled, setIsFlagEnabled] = useState(true);
//   const [activeUnit, setActiveUnit] = useState("Km");
//   const [activeTab, setActiveTab] = useState<string>("preview");
//   const [waypoints, setWaypoints] = useState({
//     startingPoint: "",
//     endingPoint: "",
//   });
//   const [showModelSelector, setShowModelSelector] = useState(false);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [errorPopup, setErrorPopup] = useState(false);
//   const [currentView, setCurrentView] = useState("Preview"); // State to track the current view

//   const handleMapStyleClick = () => {
//     setCurrentView("MapStyle"); // Switch to the MapStyle view
//   };

//   const handleBackClick = () => {
//     setCurrentView("Preview"); // Switch back to the Preview view
//   };

//   return (
//     <div
//       className="w-1/4 h-5/6 ml-3 p-3 border border-gray-800 rounded-3xl flex flex-col relative"
//       style={{
//         backgroundColor: "#121216",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "stretch",
//         justifyContent: "center",
//       }}
//     >
//       {currentView === "Preview" ? (
//         <div className="mb-auto">
//           <ToggleButtons
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             waypoints={waypoints}
//             setShowModelSelector={setShowModelSelector}
//             setPopupVisible={setPopupVisible}
//             setErrorPopup={setErrorPopup}
//           />

//           {/* Sliders */}
//           <div className="py-4">
//             <div className="mb-6">
//               <label className="block text-sm mb-1">Model size</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 defaultValue="0.8"
//                 className="w-full"
//               />
//               <div className="text-right text-xs mt-1">0.80</div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm mb-1">Duration</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="60"
//                 step="1"
//                 defaultValue="20"
//                 className="w-full"
//               />
//               <div className="text-right text-xs mt-1">20 Sec</div>
//             </div>
//           </div>

//           {/* Flag Toggle */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center">
//               <FaFlag className="ml-1 mr-2 text-sm" />
//               <span className="text-white text-sm">Flag</span>
//             </div>
//             <div
//               className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
//                 isFlagEnabled ? "bg-blue-600" : "bg-gray-700"
//               }`}
//               onClick={() => setIsFlagEnabled(!isFlagEnabled)}
//             >
//               <div
//                 className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
//                   isFlagEnabled ? "translate-x-5" : "translate-x-0"
//                 }`}
//               ></div>
//             </div>
//           </div>

//           {/* Unit Selector */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center">
//               <FaMapMarkerAlt className="text-sm mr-2" />
//               <span className="text-white text-sm">Unit</span>
//             </div>
//             <div className="flex space-x-1 ml-3 border border-gray-800 p-1 rounded-md">
//               {["Km", "Mi", "Off"].map((unit) => (
//                 <button
//                   key={unit}
//                   className={`px-2 py-1 text-xs rounded-md ${
//                     activeUnit === unit
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-700 text-white"
//                   }`}
//                   onClick={() => setActiveUnit(unit)}
//                 >
//                   {unit}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Map Style */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center">
//               <PiMapPinAreaFill className="mr-2 text-xl text-white" />
//               <span className="text-white text-sm">Map style</span>
//             </div>
//             <button className="ml-5" onClick={handleMapStyleClick}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="white"
//                 strokeWidth="3"
//                 className="w-4 h-4"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Add Destinations */}
//           <button
//             className="w-full py-2 text-blue-500 rounded-lg mt-4"
//             style={{ backgroundColor: "#0A84FF14" }}
//           >
//             + Add destinations
//           </button>
//         </div>
//       ) : (
//           <MapStyle onBack={handleBackClick}
//           onSelectStyle={(styleUrl: string) => setSelectedMapStyle(styleUrl)}/> // Render MapStyle component
//       )}
//     </div>
//   );
// };

// export default PreviewSidebar;


import React, { useState } from "react";
import { FaFlag, FaMapMarkerAlt } from "react-icons/fa";
import { PiMapPinAreaFill } from "react-icons/pi";

import ToggleButtons from "./togglebuttons";
import MapStyle from "./mapstyle";

interface PreviewSidebarProps {
  onSelectStyle: (styleUrl: string) => void; // Callback for selecting a map style
}

const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
  onSelectStyle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFlagEnabled, setIsFlagEnabled] = useState(true);
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
  const [duration, setDuration] = useState(20);

  const handleMapStyleClick = () => {
    setCurrentView("MapStyle"); // Switch to the MapStyle view
  };

  const handleBackClick = () => {
    setCurrentView("Preview"); // Switch back to the Preview view
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value));
  };  // handling speed of model

  return (
    <div
      className="w-1/4 h-5/6 ml-3 p-3 border border-gray-800 rounded-3xl flex flex-col relative"
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
          <ToggleButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            waypoints={waypoints}
            setShowModelSelector={setShowModelSelector}
            setPopupVisible={setPopupVisible}
            setErrorPopup={setErrorPopup}
          />

          {/* Sliders */}
          <div className="py-4">
            <div className="mb-6">
              <label className="block text-sm mb-1">Model size</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="0.8"
                className="w-full"
              />
              <div className="text-right text-xs mt-1">0.80</div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Duration</label>
              <input
                type="range"
                min="0"
                max="60"
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
              onClick={() => setIsFlagEnabled(!isFlagEnabled)}
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

