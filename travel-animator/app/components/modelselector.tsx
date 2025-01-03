


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
  onClose: () => void;
  showPreview: boolean;  // Add this line
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;  // Add this line
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  setSelectedModel,
  selectedColor,
  setSelectedColor,
  onClose,
  showPreview,
  setShowPreview,  // Receive the state and updater function
  
}) => {

  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);

  const handleSave = () => {
    setShowPreview(true);  // Set showPreview to true when save is clicked
    onClose();  // Optionally close the model selector
  };

  const handleDiscard = () => {
    setShowPreview(true);  // Set showPreview to true when save is clicked
    onClose();  // Optionally close the model selector
  };
  

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
  // const handleSave = () => {
  //   console.log("Selected Model:", selectedModel);
    
  //   setSelectedModel(selectedModel);
  
  //   onClose();
  // };
  

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
          onClick={handleDiscard}>
            Discard
          </button>
         
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-40 px-8 py-3 rounded-full text-sm font-normal"
          onClick={handleSave}>

          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface ModelSelectorProps {
//   selectedModel: string;
//   setSelectedModel: (model: string) => void;
//   selectedColor: string;
//   setSelectedColor: (color: string) => void;
//   onClose: () => void;
// }

// const ModelSelector: React.FC<ModelSelectorProps> = ({
//   selectedModel,
//   setSelectedModel,
//   selectedColor,
//   setSelectedColor,
//   onClose,
// }) => {
//   const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
//   const [models, setModels] = useState<{ id: string; name: string; imageUrl: string }[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch models from the API
//   useEffect(() => {
//     const fetchModels = async () => {
//       try {
//         const response = await axios.get("https://dashboard.lascade.com/travel_animator/v0/models/"); // Replace <API_ENDPOINT> with your actual endpoint
//         setModels(response.data);
//         console.log("my model",response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching models:", error);
//         setLoading(false);
//       }
//     };

//     fetchModels();
//   }, []);

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

//         {/* Highlighted Model with Intersection Effect */}
//         <div className="relative flex justify-center items-center px-4 mb-4 mt-[-20px]">
//           <div className="relative flex items-center justify-center">
//             <div className="bg-inherit p-4 rounded-lg flex items-center justify-center z-10">
//               <img
//                 src={
//                   models.find((model) => model.id === selectedModel)?.imageUrl || "/models/default.png"
//                 }
//                 alt={`Model: ${selectedModel}`}
//                 className="w-40 h-40 object-contain"
//               />
//             </div>

//             <div className="absolute bottom-[-2px] w-60 h-8 bg-gradient-to-t from-gray-700 to-transparent rounded-full blur-sm opacity-70"></div>
//           </div>

//           {isPaletteOpen && (
//             <div
//               className="absolute right-5 top-[8px] p-2 bg-zinc-800 rounded-2xl shadow-lg flex flex-col space-y-1"
//               style={{ width: "35px" }}
//             >
//               {["#FF4D4D", "#FFA500", "#FFEB3B", "#4CAF50", "#2196F3", "#9C27B0", "#FFFFFF"].map((color) => (
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
//         <div
//           className="flex-1 overflow-y-auto px-4 scrollbar-hide"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {/* Free Models */}
//           <div className="mb-4">
//             <h3 className="text-gray-400 text-sm mb-3">Free Models</h3>
//             {loading ? (
//               <p className="text-gray-500">Loading models...</p>
//             ) : (
//               <div className="flex flex-wrap gap-2">
//                 {models.map((model) => (
//                   <div
//                     key={model.id}
//                     className={`p-1 rounded-xl border-2 cursor-pointer ${
//                       selectedModel === model.id ? "border-blue-500" : "border-gray-800"
//                     }`}
//                     onClick={() => setSelectedModel(model.id)}
//                   >
//                     <img
//                       src={model.imageUrl}
//                       alt={model.name}
//                       className="w-12 h-12 object-contain"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Premium Section */}
//           <div className="mb-6 bg-gradient-to-r from-[#00A2FF] to-[#0739B0] p-4 rounded-2xl text-white text-center relative overflow-hidden flex items-center justify-between">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: "url('/probgimage.png')",
//                 backgroundPosition: "center",
//                 backgroundSize: "cover",
//                 backgroundRepeat: "no-repeat",
//               }}
//             ></div>

//             <div className="relative z-10 text-left pt-5 pb-5">
//               <h6 className="text-sm font-semibold mb-1">Upgrade for Super Powers</h6>
//               <p className="text-xs text-gray-300">Premium animated 3D models</p>
//             </div>
//             <button className="bg-white text-[#082454] px-2 py-1 rounded-2xl font-bold relative z-10 text-xs">
//               <span className="font-normal">GET</span> <span className="font-bold">PRO</span>
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
//                      </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="flex justify-center p-4 space-x-6"
//           style={{ backgroundColor: "#181818" }}>
//           <button className="bg-zinc-800 hover:bg-gray-800 text-white w-40 px-8 py-3 rounded-full text-sm font-normal"
//           onClick={onClose}>
//             Discard
//           </button>
         
//           <button className="bg-blue-500 hover:bg-blue-600 text-white w-40 px-8 py-3 rounded-full text-sm font-normal"
//                     // onClick={handleSave}

//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelSelector;
