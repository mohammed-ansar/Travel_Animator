
// import React, { useState } from "react";
// import ToggleButtons from "./togglebuttons";

// const MapStyle = ({ onBack }: { onBack: () => void }) => {
//   const [activeTab, setActiveTab] = useState<string>("preview");

//   const layoutHeight = "80px"; // Height for all layout divs

//   // Array of background images for each layout
//   const backgroundImages = [
//     "/maplayout/darkbg.png",
//     "/maplayout/ancientbg.png",
//     "/maplayout/ancientbg2.png",
//     "/maplayout/ancientbg3.png",
//     "/maplayout/ancientbg4.png",
//   ];

//   return (
//     <div className="mb-auto h-full">
//       {/* ToggleButtons Component */}
//       <ToggleButtons
//         activeTab={activeTab} // Pass current activeTab state
//         setActiveTab={setActiveTab} // Pass the React setState function directly
//         waypoints={{ startingPoint: "", endingPoint: "" }} // Dummy props
//         setShowModelSelector={() => {}}
//         setPopupVisible={() => {}}
//         setErrorPopup={() => {}}
//       />

//       {/* Header */}
//       <div className="flex items-center mb-6">
//         <button className="ml-2 mr-3" onClick={onBack}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="white"
//             strokeWidth="3"
//             className="w-4 h-4 rotate-180"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//         <h1 className="text-white text-sm">Map style</h1>
//       </div>

//       {/* Scrollable Content */}
//       <div
//         className="overflow-y-scroll h-[calc(85vh-150px)]"
//         style={{
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//           overflowX: "hidden",
//         }}
//       >
//         <div className="space-y-4">
//           {/* Dark and Ancient Layouts */}
//           <div
//             className="bg-gray-800 p-4 rounded-2xl text-white flex flex-col justify-end"
//             style={{
//               height: layoutHeight,
//               backgroundImage: `url(${backgroundImages[0]})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             <h2 className="text-sm">Dark</h2>
//           </div>
//           <div
//             className="bg-gray-800 p-4 rounded-2xl text-white flex flex-col justify-end"
//             style={{
//               height: layoutHeight,
//               backgroundImage: `url(${backgroundImages[1]})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             <h2 className="text-sm">Ancient</h2>
//           </div>

//           {/* Green Layout with layered images */}
//           <div
//             className="bg-green-700 p-4 rounded-2xl text-white relative overflow-hidden flex flex-col justify-end"
//             style={{ height: layoutHeight }}
//           >
//             {/* Background images layered diagonally */}
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="absolute w-1/3 h-1/3 bg-cover bg-center"
//                 style={{
//                   backgroundImage: `url(/maplayoutgetpro/${index + 1}.png)`,
//                   transform: `rotate(-10deg)`,
//                   top: `${index * 10}%`, // Stagger images diagonally
//                   left: `${index * 15}%`,
//                 }}
//               />
//             ))}

//             {/* Content */}
//             <div className="relative z-10 flex items-center justify-between">
//               <h2 className="font-semibold text-sm">A wide collection of map styles</h2>
//               <button className="bg-white text-green-700 px-2 py-1 text-xs rounded-3xl hover:bg-gray-200 flex items-center">
//                 <span className="font-normal">GET</span>&nbsp;
//                 <span className="font-bold">PRO</span>
//               </button>
//             </div>
//           </div>

//           {/* Add more layout options with dynamic background images */}
//           {Array.from({ length: 20 }, (_, index) => (
//             <div
//               key={index}
//               className="bg-gray-800 p-4 rounded-lg text-white flex flex-col justify-end"
//               style={{
//                 height: layoutHeight,
//                 backgroundImage: `url(${backgroundImages[(index % backgroundImages.length)]})`, // Dynamically set image
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <h2 className="text-sm">Ancient</h2>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapStyle;

import React, { useState } from "react";
import ToggleButtons from "./togglebuttons";

const MapStyle = ({
  onBack,
  onSelectStyle,
}: {
  onBack: () => void;
  onSelectStyle: (styleUrl: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);

  const layoutHeight = "80px"; // Height for all layout divs

  const mapStyleUrls = [
    "mapbox://styles/mapbox/dark-v10", // Dark
    "mapbox://styles/mapbox/satellite-v9", // Ancient
    // Add more Mapbox style URLs
  ];

  const handleLayoutSelect = (index: number) => {
    setSelectedLayout(index);
    onSelectStyle(mapStyleUrls[index]);
  };

  // Array of background images for each layout
  const backgroundImages = [
    "/maplayout/darkbg.png",
    "/maplayout/ancientbg.png",
    "/maplayout/ancientbg2.png",
    "/maplayout/ancientbg3.png",
    "/maplayout/ancientbg4.png",
  ];

  return (
    <div className="mb-auto h-full">
      {/* ToggleButtons Component */}
      <ToggleButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        waypoints={{ startingPoint: "", endingPoint: "" }}
        setShowModelSelector={() => {}}
        setPopupVisible={() => {}}
        setErrorPopup={() => {}}
      />

      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="ml-2 mr-3" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="3"
            className="w-4 h-4 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <h1 className="text-white text-sm">Map style</h1>
      </div>

      {/* Scrollable Content */}
      <div
        className="overflow-y-scroll h-[calc(85vh-150px)]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflowX: "hidden",
        }}
      >
        <div className="space-y-4">
          {/* Dark and Ancient Layouts */}
          <div
            className={`bg-gray-800 p-4 rounded-2xl text-white flex flex-col justify-end cursor-pointer ${
              selectedLayout === 0 ? "border-2 border-blue-500" : "border-none"
            }`}
            style={{
              height: layoutHeight,
              backgroundImage: `url(${backgroundImages[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            // onClick={() => setSelectedLayout(0)}
            onClick={() => handleLayoutSelect(0)}
          >
            <h2 className="text-sm">Dark</h2>
          </div>
          <div
            className={`bg-gray-800 p-4 rounded-2xl text-white flex flex-col justify-end cursor-pointer ${
              selectedLayout === 1 ? "border-2 border-blue-500" : "border-none"
            }`}
            style={{
              height: layoutHeight,
              backgroundImage: `url(${backgroundImages[1]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            // onClick={() => setSelectedLayout(1)}
            onClick={() => handleLayoutSelect(1)}
          >
            <h2 className="text-sm">Ancient</h2>
          </div>

          {/* Green Layout with layered images */}
          <div
            className="bg-green-700 p-4 rounded-2xl text-white relative overflow-hidden flex flex-col justify-end cursor-default"
            style={{ height: layoutHeight }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="absolute w-1/3 h-1/3 bg-cover bg-center"
                style={{
                  backgroundImage: `url(/maplayoutgetpro/${index + 1}.png)`,
                  transform: `rotate(-10deg)`,
                  top: `${index * 10}%`,
                  left: `${index * 15}%`,
                }}
              />
            ))}

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <h2 className="font-semibold text-sm">A wide collection of map styles</h2>
              <button className="bg-white text-green-700 px-2 py-1 text-xs rounded-3xl hover:bg-gray-200 flex items-center">
                <span className="font-normal">GET</span>&nbsp;
                <span className="font-bold">PRO</span>
              </button>
            </div>
          </div>

          {/* Add more layout options with dynamic background images */}
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-4 rounded-2xl text-white flex flex-col justify-end cursor-pointer ${
                selectedLayout === index + 2 ? "border-2 border-blue-500" : "border-none"
              }`}
              style={{
                height: layoutHeight,
                backgroundImage: `url(${backgroundImages[index % backgroundImages.length]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              // onClick={() => setSelectedLayout(index + 2)}
              onClick={() => handleLayoutSelect(index+2)}
            >
              <h2 className="text-sm">Ancient</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapStyle;
