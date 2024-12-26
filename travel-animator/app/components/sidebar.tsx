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

"use client";

import React, { useState } from "react";

interface SidebarProps {
  waypoints: {
    startingPoint: string;
    endingPoint: string;
  };
  setWaypoints: React.Dispatch<
    React.SetStateAction<{ startingPoint: string; endingPoint: string }>
  >;
  handlePreviewClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  waypoints,
  setWaypoints,
  handlePreviewClick,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);

  // Handle key press for Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && waypoints.startingPoint && waypoints.endingPoint) {
      handlePreviewClick(); // Trigger the preview popup
      setPopupVisible(true); // Show the popup
    }
  };

  return (
    <aside className="w-1/4 h-5/6 bg-zinc-900 ml-3 p-3 rounded-3xl flex flex-col relative">
      {/* Toggle Buttons */}
      <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
        <button className="flex-1 py-2 bg-blue-500 text-white font-bold rounded-l-3xl">
          Routes
        </button>
        <button
          className="flex-1 py-2 bg-zinc-900 text-gray-300 font-bold rounded-r-2xl"
          onClick={handlePreviewClick}
        >
          Preview
        </button>
      </div>

      {/* Waypoints */}
      <div>
        <p className="mb-4">0 Waypoints</p>
        {/* Starting Point */}
        <div className="flex items-center">
          <div className="mr-2 text-blue-400">➖</div>

          <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Starting Point"
              value={waypoints.startingPoint}
              onChange={(e) =>
                setWaypoints({ ...waypoints, startingPoint: e.target.value })
              }
              onKeyDown={handleKeyPress} // Handle Enter key press
              className="flex-1 bg-zinc-800 text-white outline-none pl-2 w-50 overflow-hidden text-ellipsis"
            />
          </div>
        </div>

        {/* Ending Point */}
        <div className="flex items-center">
          <div className="mr-2 text-orange-400">➖</div>

          <div className="flex items-center bg-zinc-800 p-2 rounded-3xl">
            <input
              type="text"
              placeholder="Ending Point"
              value={waypoints.endingPoint}
              onChange={(e) =>
                setWaypoints({ ...waypoints, endingPoint: e.target.value })
              }
              onKeyDown={handleKeyPress} // Handle Enter key press
              className="flex-1 bg-zinc-800 text-white outline-none pl-2 w-50 overflow-hidden text-ellipsis"
            />
          </div>
        </div>
      </div>

      {/* Popup Box */}
      {popupVisible && (
        <div className="fixed bottom-7 right-7 bg-black text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-4 z-50">
          {/* Message */}
          <p className="text-sm">Preview mode is now available!</p>

          {/* Go to Preview Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium"
            onClick={() => {
              console.log("Go to Preview clicked"); // Replace with actual navigation logic when needed
            }}
          >
            Go to Preview
          </button>

          {/* Close Button */}
          <button
            className="text-white hover:text-gray-400 text-lg font-bold"
            onClick={() => setPopupVisible(false)} // Hide popup on click
          >
            &times;
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
