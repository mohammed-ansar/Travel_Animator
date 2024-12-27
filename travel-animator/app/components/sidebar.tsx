// "use client";
// import Plane from "../icons/Plane";
// import Destination from "../icons/Destination";

// // import React from "react";

// interface SidebarProps {
//   waypoints: {
//     startingPoint: string;
//     endingPoint: string;
//   };
//   setWaypoints: React.Dispatch<
//     React.SetStateAction<{ startingPoint: string; endingPoint: string }>
//   >;
//   handlePreviewClick: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   waypoints,
//   setWaypoints,
//   handlePreviewClick,
// }) => {
//   return (
//     <aside className="w-1/4 h-5/6 bg-zinc-900 ml-3 p-3 rounded-3xl flex flex-col">
//       {/* Toggle Buttons */}
//       <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
//         <button className="flex-1 py-2 bg-blue-500 text-white font-bold rounded-l-3xl">
//           Routes
//         </button>
//         <button
//           className="flex-1 py-2 bg-zinc-900 text-gray-300 font-bold rounded-r-2xl"
//           onClick={handlePreviewClick}
//         >
//           Preview
//         </button>
//       </div>

//       {/* Waypoints */}
//       <div>
//         <p className="mb-4">0 Waypoints</p>
//         {/* Starting Point */}
//         <div className="flex items-center">
//           <div className="mr-2 text-blue-400">➖</div>

//           <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl">
//             {/* Icon */}
//             <div className="mr-3">
//               <Plane />
//             </div>

//             {/* Input Field */}
//             <input
//               type="text"
//               placeholder= "Starting Point"
//               value={waypoints.startingPoint}
//               onChange={(e) =>
//                 setWaypoints({ ...waypoints, startingPoint: e.target.value })
//               }
//               className="flex-1 bg-zinc-800 text-white outline-none pl-2 mr-2 w-50" // Adjusted width and added padding
//             />
//           </div>
//         </div>

//         {/* Ending Point */}
//         <div className="flex items-center">
//           <div className="mr-2 text-orange-400">➖</div>

//           <div className="flex items-center bg-zinc-800 p-2 rounded-3xl">
//             <div className="mr-3">
//               <Destination />
//             </div>
//             <input
//               type="text"
//               placeholder="Ending Point"
//               value={waypoints.endingPoint}
//               onChange={(e) =>
//                 setWaypoints({ ...waypoints, endingPoint: e.target.value })
//               }
//               className="flex-1 bg-zinc-800 text-white outline-none pl-2 w-50 overflow-hidden text-ellipsis"
//             />
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

// main code
// import React, { useState, useEffect } from "react";
// import ModelSelector from "./modelselector";
// import Plane from "../icons/Plane";
// import Destination from "../icons/Destination";

// interface SidebarProps {
//   waypoints: {
//     startingPoint: string;
//     endingPoint: string;
//   };
//   setWaypoints: React.Dispatch<
//     React.SetStateAction<{ startingPoint: string; endingPoint: string }>
//   >;
//   showPreview: boolean;
//   setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   waypoints,
//   setWaypoints,
//   showPreview,
//   setShowPreview,
// }) => {
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [errorPopup, setErrorPopup] = useState(false);
//   const [showModelSelector, setShowModelSelector] = useState(false);
//   const [activeTab, setActiveTab] = useState("routes");

//   // Hide error popup when waypoints are updated
//   useEffect(() => {
//     if (waypoints.startingPoint && waypoints.endingPoint) {
//       setErrorPopup(false); // Hide error popup when both waypoints are filled
//       setPopupVisible(true);
//     }
//   }, [waypoints]); // Dependency on waypoints

//   return (
//     <aside className="w-1/4 h-5/6 bg-zinc-900 ml-3 p-3 rounded-3xl flex flex-col relative">
//       {/* Toggle Buttons */}
//       <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
//         <button
//           onClick={() => setActiveTab("routes")}
//           className={`flex-1 py-2 font-bold ${
//             activeTab === "routes"
//               ? "bg-blue-500 text-white rounded-3xl"
//               : "bg-zinc-900 text-gray-300 rounded-l-3xl"
//           }`}
//         >
//           Routes
//         </button>
//         <button
//           onClick={() => {
//             if (waypoints.startingPoint && waypoints.endingPoint) {
//               setActiveTab("preview");
//               setShowModelSelector(true);
//               setPopupVisible(true);
//               setErrorPopup(false); // Hide error popup when valid points
//             } else {
//               setErrorPopup(true); // Show error popup if invalid points
//             }
//           }}
//           className={`flex-1 py-2 font-bold ${
//             activeTab === "preview"
//               ? "bg-blue-500 text-white rounded-3xl"
//               : "bg-zinc-900 text-gray-300 rounded-r-3xl"
//           }`}
//         >
//           Preview
//         </button>
//       </div>

//       {/* Waypoints */}
//       <div>
//         <p className="mb-4">0 Waypoints</p>
//         {/* Starting Point */}
//         <div className="flex items-center">
//           <div className="mr-2 text-blue-400">➖</div>
//           <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl">
//             <div className="mr-3">
//               <Plane />
//             </div>
//             <input
//               type="text"
//               placeholder="Starting Point"
//               value={waypoints.startingPoint}
//               onChange={(e) =>
//                 setWaypoints({
//                   ...waypoints,
//                   startingPoint: e.target.value,
//                 })
//               }
//               className="flex-1 bg-zinc-800 text-white outline-none pl-2 mr-2 w-60 overflow-hidden text-ellipsis"
//             />
//           </div>
//         </div>

//         {/* Ending Point */}
//         <div className="flex items-center">
//           <div className="mr-2 text-orange-400">➖</div>
//           <div className="flex items-center bg-zinc-800 p-2 rounded-3xl">
//             <div className="mr-3">
//               <Destination />
//             </div>
//             <input
//               type="text"
//               placeholder="Ending Point"
//               value={waypoints.endingPoint}
//               onChange={(e) =>
//                 setWaypoints({
//                   ...waypoints,
//                   endingPoint: e.target.value,
//                 })
//               }
//               className="flex-1 bg-zinc-800 text-white outline-none pl-2 mr-2 w-60 overflow-hidden text-ellipsis"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Popup Box */}
//       {popupVisible && (
//         <div className="fixed bottom-7 right-7 bg-black text-white px-6 py-3 my-3 rounded-3xl  shadow-lg flex items-center space-x-4 z-50">
//           <p className="text-sm">Preview mode is now available!</p>
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
//             onClick={() => {
//               setShowModelSelector(true);
//               setPopupVisible(false);
//             }}
//           >
//             Go to Preview
//           </button>
//           <button
//             className="text-white hover:text-gray-400 text-lg font-bold"
//             onClick={() => setPopupVisible(false)}
//           >
//             &times;
//           </button>
//         </div>
//       )}

//       {/* Error popup */}
//       {errorPopup && (
//         <div
//           className="fixed bottom-7 right-7 text-white px-6 py-4 my-3 rounded-2xl shadow-lg flex items-center space-x-4 z-50"
//           style={{ backgroundColor: "#FF2E2E" }}
//         >
//           <div className="text-white text-lg">
//             <i className="fas fa-exclamation-circle"></i> {/* Example with FontAwesome */}
//           </div>
//           <p className="text-sm font-light">Oops! Preview mode needs at least 2 Waypoints to work.</p>
//         </div>
//       )}

//       {/* Conditionally Render ModelSelector */}
//       {showModelSelector && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           {/* <div className="bg-white p-6 rounded-lg shadow-lg"> */}
//             <ModelSelector />
//             {/* <button
//               className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium"
//               onClick={() => setShowModelSelector(false)}
//             >
//               Close
//             </button> */}
//           {/* </div> */}
//         </div>
//       )}
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import ModelSelector from "./modelselector";
import Plane from "../icons/Plane";
import Destination from "../icons/Destination";
import ToggleButtons from "./togglebuttons";

interface SidebarProps {
  waypoints: {
    startingPoint: string;
    endingPoint: string;
  };
  setWaypoints: React.Dispatch<
    React.SetStateAction<{ startingPoint: string; endingPoint: string }>
  >;
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  waypoints,
  setWaypoints,
  showPreview,
  setShowPreview,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [activeTab, setActiveTab] = useState("routes");

  // Hide error popup when waypoints are updated
  useEffect(() => {
    if (waypoints.startingPoint && waypoints.endingPoint) {
      setErrorPopup(false); // Hide error popup when both waypoints are filled
      setPopupVisible(true);
    }
  }, [waypoints]); // Dependency on waypoints

  return (
    <aside className="w-1/4 h-5/6 bg-zinc-900 ml-3 p-3 pr-8 rounded-3xl flex flex-col relative">
      {/* Toggle Buttons */}
      <ToggleButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        waypoints={waypoints}
        setShowModelSelector={setShowModelSelector}
        setPopupVisible={setPopupVisible}
        setErrorPopup={setErrorPopup}
      />

      <div>
        <p className="mb-4">0 Waypoints</p>
        {/* Starting Point */}
        <div className="flex items-center">
          <div className="mr-2 text-blue-400">➖</div>
          <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl w-full">
            <div className="mr-1">
              <Plane />
            </div>
            <input
              type="text"
              placeholder="Starting Point"
              value={waypoints.startingPoint}
              onChange={(e) =>
                setWaypoints({
                  ...waypoints,
                  startingPoint: e.target.value,
                })
              }
              className="flex-1 bg-zinc-800 text-white outline-none pl-2 mr-2 min-w-0"
            />
          </div>
        </div>

        {/* Ending Point */}
        <div className="flex items-center">
          <div className="mr-2 text-orange-400">➖</div>
          <div className="flex items-center bg-zinc-800 p-2 rounded-3xl w-full">
            <div className="mr-1">
              <Destination />
            </div>
            <input
              type="text"
              placeholder="Ending Point"
              value={waypoints.endingPoint}
              onChange={(e) =>
                setWaypoints({
                  ...waypoints,
                  endingPoint: e.target.value,
                })
              }
              className="flex-1 bg-zinc-800 text-white outline-none pl-2 mr-2 min-w-0"
            />
          </div>
        </div>
      </div>

      {/* Popup Box */}
      {popupVisible && (
        <div className="fixed bottom-7 right-7 bg-black text-white px-6 py-3 my-3 rounded-3xl  shadow-lg flex items-center space-x-4 z-50">
          <p className="text-sm">Preview mode is now available!</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
            onClick={() => {
              setShowModelSelector(true);
              setPopupVisible(false);
            }}
          >
            Go to Preview
          </button>
          <button
            className="text-white hover:text-gray-400 text-lg font-bold"
            onClick={() => setPopupVisible(false)}
          >
            &times;
          </button>
        </div>
      )}

      {/* Error popup */}
      {errorPopup && (
        <div
          className="fixed bottom-7 right-7 text-white px-6 py-4 my-3 rounded-2xl shadow-lg flex items-center space-x-4 z-50"
          style={{ backgroundColor: "#FF2E2E" }}
        >
          <div className="text-white text-lg">
            <i className="fas fa-exclamation-circle"></i>{" "}
            {/* Example with FontAwesome */}
          </div>
          <p className="text-sm font-light">
            Oops! Preview mode needs at least 2 Waypoints to work.
          </p>
        </div>
      )}

      {/* Conditionally Render ModelSelector */}
      {showModelSelector && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ModelSelector />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
