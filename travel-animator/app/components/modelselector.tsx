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

import React, { useState } from "react";

const ModelSelector: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end">
      {/* Sidebar */}
      <div className="w-1/3 bg-zinc-900 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-white font-bold text-xl">Models</h2>
          <button
            className="text-white hover:text-gray-400 text-2xl"
            onClick={() => console.log("Close sidebar")}
          >
            &times;
          </button>
        </div>

        {/* Add Image Toggle */}
        <div className="flex items-center px-4 mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded mr-2"
            />
            <span className="text-white text-sm">Add image</span>
          </label>
        </div>

        {/* Highlighted Model */}
        <div className="px-4 mb-4">
          <div className="flex justify-center items-center bg-gray-800 p-4 rounded-lg">
            <img
              src="/models/car1.png"
              alt="Highlighted Model"
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* Color Palette */}
          <div className="mb-6">
            <h3 className="text-white text-sm font-bold mb-2">Choose Color</h3>
            <div className="flex space-x-2 items-center">
              {["#FF4D4D", "#FFA500", "#FFEB3B", "#4CAF50", "#2196F3", "#9C27B0", "#FFFFFF"].map(
                (color, index) => (
                  <div
                    key={index}
                    className={`h-8 w-8 rounded-full border-2 cursor-pointer ${
                      selectedColor === color ? "border-blue-500" : "border-gray-700"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                )
              )}
            </div>
          </div>

          {/* Free Models */}
          <div className="mb-4">
            <h3 className="text-white font-bold text-sm mb-3">Free Models</h3>
            <div className="flex justify-around">
              {["car1", "car2", "plane", "truck"].map((model, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg border-2 cursor-pointer ${
                    selectedModel === model
                      ? "border-blue-500"
                      : "border-gray-700"
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <img
                    src={`/models/${model}.png`}
                    alt={model}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Premium Section */}
          <div className="mb-6 bg-blue-500 p-4 rounded-lg text-white text-center">
            <h4 className="font-bold text-lg mb-2">Upgrade for Super Powers</h4>
            <p className="text-sm mb-2">Premium animated 3D models</p>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-md font-bold">
              GET PRO
            </button>
          </div>

          {/* Pro Models */}
          <div className="mb-6">
            <h3 className="text-white font-bold text-sm mb-3">PRO Models</h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg border-2 cursor-pointer border-gray-700 opacity-50"
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
        <div className="flex justify-between p-4">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg">
            Discard
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;





