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
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF"); // Default white
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false); // Toggle for palette visibility

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end">
      {/* Sidebar */}
      <div className="w-1/3 bg-zinc-900 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          {/* Title */}
          <h2 className="text-white text-xl">Models</h2>

          {/* Right Section: Add Image Button and Round Color Button */}
          <div className="flex items-center space-x-4">
            {/* Add Image Button */}
            <label className="relative flex items-center">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    console.log("File selected:", e.target.files[0]);
                    // Add your file upload logic here
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

            {/* Round Color Button */}
            <button
              onClick={() => setIsPaletteOpen(!isPaletteOpen)} // Toggle palette
              className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-blue-500 flex items-center justify-center transition-all relative"
            >
              {/* SVG Shape Inside Button */}
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

        {/* Highlighted Model with Color Palette */}
        <div className="relative flex justify-center items-center px-4 mb-4 mt-3">
          {/* Highlighted Model */}
          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
            <img
              src="/models/car1.png"
              alt="Highlighted Model"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Color Palette */}
          {isPaletteOpen && ( // Only show if palette is open
            <div className="absolute right-6 bottom-[-65px] flex flex-col space-y-2">
              {[
                "#FF4D4D",
                "#FFA500",
                "#FFEB3B",
                "#4CAF50",
                "#2196F3",
                "#9C27B0",
                "#FFFFFF",
              ].map((color, index) => (
                <div
                  key={index}
                  className={`h-6 w-6 rounded-full border cursor-pointer ${
                    selectedColor === color ? "border-blue-500" : "border-gray-700"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)} // Update selected color
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
            <h3 className="text-white font-bold text-sm mb-3">Free Models</h3>
            <div className="flex flex-wrap gap-2">
              {["car1", "car2", "bus", "truck"].map((model, index) => (
                <div
                  key={index}
                  className={`p-1 rounded-lg border-2 cursor-pointer ${
                    selectedModel === model
                      ? "border-blue-500"
                      : "border-gray-700"
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <img
                    src={`/models/${model}.png`}
                    alt={model}
                    className="w-14 h-14 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Premium Section */}
<div
  className="mb-6 bg-blue-500 p-4 rounded-2xl text-white text-center relative overflow-hidden flex items-center justify-between"
  style={{
    backgroundImage: "url('/probgimage.png')",
    backgroundPosition: "center",
    backgroundSize: "cover", // Ensures the image covers the entire box
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="text-left pt-5 pb-5">
    <h4 className=" text-lg mb-1 relative z-10">Upgrade for Super Powers</h4>
    <p className="text-sm relative z-10">Premium animated 3D models</p>
  </div>
  <button className="bg-white text-black px-3 py-1 rounded-3xl font-bold relative z-10 text-sm">
  <span className="font-normal">GET</span> <span className="font-bold">PRO</span>
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
        <div className="flex justify-center p-4 space-x-6">
          <button className="bg-zinc-800 hover:bg-gray-800 text-white w-40 px-8 py-2 rounded-full text-lg font-medium">
            Discard
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-40 px-8 py-2 rounded-full text-lg font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;



