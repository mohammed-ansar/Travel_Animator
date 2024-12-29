// import React, { useState } from "react";

// const ModelSelector: React.FC = () => {
//   const [selectedModel, setSelectedModel] = useState<string | null>(null);
//   const [isVisible, setIsVisible] = useState(true); // State to control visibility

//   if (!isVisible) return null; // Don't render the component if not visible

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end">
//       {/* Sidebar */}
//       <div className="w-1/3 bg-zinc-900 h-full p-6 overflow-y-auto flex flex-col">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-white font-bold text-lg">Models</h2>
//           <button
//             onClick={() => setIsVisible(false)} // Close the component
//             className="text-white hover:text-gray-400 text-xl"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Add Image */}
//         <div className="flex items-center mb-4">
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="form-checkbox h-5 w-5 text-blue-500 rounded mr-2"
//             />
//             <span className="text-white text-sm">Add image</span>
//           </label>
//         </div>

//         {/* Color Picker */}
//         <div className="flex items-center mb-6">
//           <span className="text-white text-sm mr-2">Color:</span>
//           <div className="flex space-x-2">
//             {["red", "orange", "yellow", "green", "blue", "purple", "white"].map(
//               (color) => (
//                 <button
//                   key={color}
//                   className={`h-8 w-8 rounded-full bg-${color}-500 border-2 ${
//                     selectedModel === color ? "border-blue-500" : "border-gray-700"
//                   }`}
//                   onClick={() => setSelectedModel(color)}
//                 ></button>
//               )
//             )}
//           </div>
//         </div>

//         {/* Free Models */}
//         <div className="mb-6">
//           <h3 className="text-white font-bold text-sm mb-4">Free Models</h3>
//           <div className="grid grid-cols-3 gap-4">
//             {["car1", "car2", "bus", "truck"].map((model) => (
//               <div
//                 key={model}
//                 className={`p-2 rounded-lg border-2 cursor-pointer ${
//                   selectedModel === model
//                     ? "border-blue-500"
//                     : "border-gray-700"
//                 }`}
//                 onClick={() => setSelectedModel(model)}
//               >
//                 <img
//                   src={`/models/${model}.png`} // Replace with correct paths
//                   alt={model}
//                   className="w-20 h-20 object-contain"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Premium Pro Section */}
//         <div className="mb-6 bg-blue-500 p-4 rounded-lg text-white">
//           <h4 className="font-bold text-lg mb-2">Upgrade for Super Powers</h4>
//           <p className="text-sm mb-2">Premium animated 3D models</p>
//           <button className="bg-white text-blue-500 px-4 py-2 rounded-md font-bold">
//             GET PRO
//           </button>
//         </div>

//         {/* Pro Models */}
//         <div className="mb-6">
//           <h3 className="text-white font-bold text-sm mb-4">Pro Models</h3>
//           <div className="grid grid-cols-4 gap-4">
//             {Array.from({ length: 8 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="p-2 rounded-lg border-2 cursor-pointer border-gray-700 opacity-50"
//               >
//                 <img
//                   src={`/models/pro-model-${index + 1}.png`} // Replace with correct paths
//                   alt={`Pro Model ${index + 1}`}
//                   className="w-16 h-16 object-contain"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-between">
//           <button
//             className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
//             onClick={() => setIsVisible(false)} // Discard and close
//           >
//             Discard
//           </button>
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//             onClick={() => {
//               console.log("Model saved:", selectedModel);
//               setIsVisible(false); // Save and close
//             }}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelSelector;

// import React, { useState } from "react";

// const ModelSelector: React.FC = () => {
//   const [selectedModel, setSelectedModel] = useState<string>("car1");
//   const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
//   const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);

//   // Map colors to model image paths for each model
//   const modelImages: Record<string, Record<string, string>> = {
//     car1: {
//       "#FF4D4D": "/models/car-red.png",
//       "#FFA500": "/models/car1.png",
//       "#FFEB3B": "/models/car-yellow.png",
//       "#4CAF50": "/models/car1.png",
//       "#2196F3": "/models/car-blue.png",
//       "#9C27B0": "/models/car1.png",
//       "#FFFFFF": "/models/car1.png",
//     },
//     car2: {
//       "#FF4D4D": "/models/car2.png",
//       "#FFA500": "/models/car2.png",
//       "#FFEB3B": "/models/car2.png",
//       "#4CAF50": "/models/car2.png",
//       "#2196F3": "/models/car2.png",
//       "#9C27B0": "/models/car2.png",
//       "#FFFFFF": "/models/car2.png",
//     },
//     bus: {
//       "#FF4D4D": "/models/car3.png",
//       "#FFA500": "/models/car3.png",
//       "#FFEB3B": "/models/car3.png",
//       "#4CAF50": "/models/car3.png",
//       "#2196F3": "/models/car3.png",
//       "#9C27B0": "/models/car3.png",
//       "#FFFFFF": "/models/car3.png",
//     },
//     truck: {
//       "#FF4D4D": "/models/truck.png",
//       "#FFA500": "/models/truck.png",
//       "#FFEB3B": "/models/truck.png",
//       "#4CAF50": "/models/truck.png",
//       "#2196F3": "/models/truck.png",
//       "#9C27B0": "/models/truck.png",
//       "#FFFFFF": "/models/truck.png",
//     },
//     // Add mappings for other models if needed
//   };

//   const handleOutsideClick = () => setIsPaletteOpen(false);

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end"
//       onClick={handleOutsideClick}
//     >
//       {/* Sidebar */}
//       <div
//         className="w-[350px] bg-zinc-900 h-full flex flex-col"
//         onClick={(e) => e.stopPropagation()} // Prevent click from closing palette
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-4">
//           <h2 className="text-white text-l">Models</h2>

//           {/* Add Image Button and Color Button */}
//           <div className="flex items-center space-x-4">
//             <label className="relative flex items-center">
//               <input
//                 type="file"
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 onChange={(e) => {
//                   if (e.target.files && e.target.files[0]) {
//                     console.log("File selected:", e.target.files[0]);
//                     // Add file upload logic here
//                   }
//                 }}
//               />
//               <button
//                 type="button"
//                 className="bg-zinc-800 text-white px-4 py-2 rounded-3xl flex items-center hover:bg-blue-600 transition-all"
//               >
//                 <img
//                   src="/addimageicon.png"
//                   alt="Upload Icon"
//                   className="w-4 h-4 mr-2"
//                 />
//                 Add Image
//               </button>
//             </label>

//             <button
//               aria-label="Toggle Color Palette"
//               onClick={() => setIsPaletteOpen(!isPaletteOpen)}
//               className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-white flex items-center justify-center transition-all relative"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 36 36"
//                 width="20"
//                 height="20"
//                 className="absolute"
//               >
//                 <path
//                   d="M18 2C10.268 2 4 8.268 4 16C4 20.515 6.053 24.515 9.389 27L7 34H29L26.611 27C29.947 24.515 32 20.515 32 16C32 8.268 25.732 2 18 2Z"
//                   fill={selectedColor}
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Model Display */}
//         <div className="relative flex justify-center items-center px-4 mb-4 mt-3">
//           <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
//             <img
//               src={modelImages[selectedModel]?.[selectedColor] || "/models/default.png"}
//               alt={`Model: ${selectedModel}`}
//               className="w-24 h-24 object-contain"
//             />
//           </div>

//           {/* Color Palette */}
//           {isPaletteOpen && (
//             <div
//               className="absolute right-5 bottom-[-30px] p-2 bg-zinc-800 rounded-2xl shadow-lg flex flex-col space-y-1"
//               style={{ width: "35px" }}
//             >
//               {Object.keys(modelImages[selectedModel] || {}).map((color) => (
//                 <div
//                   key={color}
//                   className={`h-5 w-5 rounded-full border cursor-pointer ${
//                     selectedColor === color ? "border-black" : "border-gray-600"
//                   }`}
//                   style={{ backgroundColor: color }}
//                   onClick={() => setSelectedColor(color)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
//           {/* Free Models */}
//           <div className="mb-4">
//             <h3 className="text-gray-400 text-sm mb-3">Free Models</h3>
//             <div className="flex flex-wrap gap-2">
//               {["car1", "car2", "bus", "truck"].map((model) => (
//                 <div
//                   key={model}
//                   className={`p-1 rounded-xl border-2 cursor-pointer ${
//                     selectedModel === model
//                       ? "border-blue-500"
//                       : "border-gray-800"
//                   }`}
//                   onClick={() => setSelectedModel(model)}
//                 >
//                   <img
//                     src={`/models/${model}.png`}
//                     alt={model}
//                     className="w-12 h-12 object-contain"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Premium Models */}
//           <div className="mb-6 bg-gradient-to-r from-[#00A2FF] to-[#0739B0] p-4 rounded-2xl text-white text-center relative overflow-hidden">
//             <div className="absolute inset-0 bg-cover bg-center opacity-20" />
//             <div className="relative z-10 text-left pt-5 pb-5">
//               <h6 className="text-sm font-semibold mb-1">
//                 Upgrade for Super Powers
//               </h6>
//               <p className="text-xs text-gray-300">
//                 Premium animated 3D models
//               </p>
//             </div>
//             <button className="bg-white text-black px-2 py-1 rounded-2xl font-bold text-xs">
//               GET PRO
//             </button>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-gray-400 text-sm mb-3">PRO Models</h3>
//             <div className="grid grid-cols-4 gap-2">
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="p-1 rounded-xl border-2 cursor-pointer border-gray-800 opacity-50"
//                 >
//                   <img
//                     src={`/models/pro-model-${index + 1}.png`}
//                     alt={`Pro Model ${index + 1}`}
//                     className="w-12 h-12 object-contain"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="flex justify-center p-4 space-x-6">
//           <button className="bg-zinc-800 hover:bg-gray-800 text-white w-40 px-8 py-2 rounded-full text-lg font-medium">
//             Discard
//           </button>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white w-40 px-8 py-2 rounded-full text-lg font-medium">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelSelector;

import React, { useState } from "react";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onClose:() => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  setSelectedModel,
  selectedColor,
  setSelectedColor,
  onClose,
  
}) => {

  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  

  // Map colors to model image paths for each model
  const modelImages: Record<string, Record<string, string>> = {
    car1: {
      "#FF4D4D": "/models/car-red.png",
      "#FFA500": "/models/car1.png",
      "#FFEB3B": "/models/car-yellow.png",
      "#4CAF50": "/models/car1.png",
      "#2196F3": "/models/car-blue.png",
      "#9C27B0": "/models/car1.png",
      "#FFFFFF": "/models/car1.png",
    },
    car2: {
      "#FF4D4D": "/models/car2.png",
      "#FFA500": "/models/car2.png",
      "#FFEB3B": "/models/car2.png",
      "#4CAF50": "/models/car2.png",
      "#2196F3": "/models/car2.png",
      "#9C27B0": "/models/car2.png",
      "#FFFFFF": "/models/car2.png",
    },
    bus: {
      "#FF4D4D": "/models/car3.png",
      "#FFA500": "/models/car3.png",
      "#FFEB3B": "/models/car3.png",
      "#4CAF50": "/models/car3.png",
      "#2196F3": "/models/car3.png",
      "#9C27B0": "/models/car3.png",
      "#FFFFFF": "/models/car3.png",
    },
    truck: {
      "#FF4D4D": "/models/truck.png",
      "#FFA500": "/models/truck.png",
      "#FFEB3B": "/models/truck.png",
      "#4CAF50": "/models/truck.png",
      "#2196F3": "/models/truck.png",
      "#9C27B0": "/models/truck.png",
      "#FFFFFF": "/models/truck.png",
    },
  };

  const handleOutsideClick = () => setIsPaletteOpen(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end" onClick={handleOutsideClick}>
      {/* Sidebar */}
      <div
        className="w-[350px] bg-zinc-900 h-full flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing palette
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-white text-l">Models</h2>

          {/* Add Image Button and Color Button */}
          <div className="flex items-center space-x-4">
            <label className="relative flex items-center">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    console.log("File selected:", e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                className="bg-zinc-800 text-white px-4 py-2 rounded-3xl flex items-center hover:bg-blue-600 transition-all"
              >
                <img
                  src="/addimageicon.png"
                  alt="Upload Icon"
                  className="w-4 h-4 mr-2"
                />
                Add Image
              </button>
            </label>

            <button
              aria-label="Toggle Color Palette"
              onClick={() => setIsPaletteOpen(!isPaletteOpen)}
              className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-white flex items-center justify-center transition-all relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
                width="20"
                height="20"
                className="absolute"
              >
                <path
                  d="M18 2C10.268 2 4 8.268 4 16C4 20.515 6.053 24.515 9.389 27L7 34H29L26.611 27C29.947 24.515 32 20.515 32 16C32 8.268 25.732 2 18 2Z"
                  fill={selectedColor}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Highlighted Model with Intersection Effect */}
        <div className="relative flex justify-center items-center px-4 mb-4 mt-[-20px]">
          <div className="relative flex items-center justify-center">
            <div className="bg-inherit p-4 rounded-lg flex items-center justify-center z-10">
              <img
                src={modelImages[selectedModel]?.[selectedColor] || "/models/default.png"}
                alt={`Model: ${selectedModel}`}
                className="w-40 h-40 object-contain"
              />
            </div>

            <div className="absolute bottom-[-2px] w-60 h-8 bg-gradient-to-t from-gray-700 to-transparent rounded-full blur-sm opacity-70"></div>
          </div>

          {isPaletteOpen && (
            <div
              className="absolute right-5 top-[8px] p-2 bg-zinc-800 rounded-2xl shadow-lg flex flex-col space-y-1"
              style={{ width: "35px" }}
            >
              {Object.keys(modelImages[selectedModel] || {}).map((color) => (
                <div
                  key={color}
                  className={`h-5 w-5 rounded-full border cursor-pointer ${
                    selectedColor === color ? "border-black" : "border-gray-600"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Free Models */}
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm mb-3">Free Models</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(modelImages).map((model) => (
                <div
                  key={model}
                  className={`p-1 rounded-xl border-2 cursor-pointer ${
                    selectedModel === model ? "border-blue-500" : "border-gray-800"
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <img
                    src={`/models/${model}.png`}
                    alt={model}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Premium Section */}
          <div className="mb-6 bg-gradient-to-r from-[#00A2FF] to-[#0739B0] p-4 rounded-2xl text-white text-center relative overflow-hidden flex items-center justify-between">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/probgimage.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            <div className="relative z-10 text-left pt-5 pb-5">
              <h6 className="text-sm font-semibold mb-1">Upgrade for Super Powers</h6>
              <p className="text-xs text-gray-300">Premium animated 3D models</p>
            </div>
            <button className="bg-white text-[#082454] px-2 py-1 rounded-2xl font-bold relative z-10 text-xs">
              <span className="font-normal">GET</span> <span className="font-bold">PRO</span>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-400 text-sm mb-3">PRO Models</h3>
             <div className="grid grid-cols-4 gap-2">
               {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="p-1 rounded-xl border-2 cursor-pointer border-gray-800 opacity-50"
                >
                  <img
                    src={`/models/pro-model-${index + 1}.png`}
                    alt={`Pro Model ${index + 1}`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center p-4 space-x-6"
          style={{ backgroundColor: "#181818" }}>
          <button className="bg-zinc-800 hover:bg-gray-800 text-white w-40 px-8 py-3 rounded-full text-sm font-normal"
          onClick={onClose}>
            Discard
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-40 px-8 py-3 rounded-full text-sm font-normal">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;




