import React, { useState,useEffect } from "react";


interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onClose: () => void;
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Model {
  name: string;
  model_glb: string;
  model_usdz: string | null;
  premium: boolean;
  test_only: boolean;
  type: string;
  texture_set: {
    texture: string;
    thumbnail: string;
  }[];
  country: string | null;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  setSelectedModel,
  selectedColor,
  setSelectedColor,
  onClose,
  showPreview,
  setShowPreview, // Receive the state and updater function
  

}) => {
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [models, setModels] = useState<Model[]>([]);
  const [isPremiumUser,setIsPremiumUser] = useState(false);
  const handleSave = () => {
    onClose(); // Optionally close the model selector
  };

  const handleDiscard = () => {
    onClose(); // Optionally close the model selector
  };

  

  const handleOutsideClick = () => setIsPaletteOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dashboard.lascade.com/travel_animator/v0/models/"
        );
        const data = await response.json();
        setModels(data.results);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end"
      onClick={handleOutsideClick}
    >
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
                  src={
                    models.find((m) => m.name === selectedModel)?.model_glb ||
                  
                    (
                      models.filter((model) => !model.premium)
                  
                      .length > 0 &&
                  
                      models.find((model) => !model.premium)?.model_glb
                    ) ||
                  
                    // Default image if no free models or thumbnails available
                    "models/default.png"
                  }
                />
            </div>

            <div className="absolute bottom-[-2px] w-60 h-8 bg-gradient-to-t from-gray-700 to-transparent rounded-full blur-sm opacity-70"></div>
          </div>

          {isPaletteOpen && (
            <div
              className="absolute right-5 top-[8px] p-2 bg-zinc-800 rounded-2xl shadow-lg flex flex-col space-y-1"
              style={{ width: "35px" }}
            >
              {Object.keys({}).map((color) => (
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
          {/* {isPaletteOpen && (
  <div
    className="absolute right-5 top-[8px] p-2 bg-zinc-800 rounded-2xl shadow-lg flex flex-col space-y-1"
    style={{ width: "35px" }}
  >
    {Object.keys( {}).map((color) => (
      <div
        key={color}
        className={`h-5 w-5 rounded-full border cursor-pointer ${
          selectedColor === color ? "border-black" : "border-gray-600"
        }`}
        style={{ backgroundColor: color }}
        onClick={() => {
          // Change the selected color without affecting the model
          setSelectedColor(color);
        }}
      />
    ))}
  </div>
)} */}
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Free Models */}
{/* Free Models */}
<div className="mb-4">
  <h3 className="text-gray-400 text-sm mb-3">Free Models</h3>
  <div className="flex flex-wrap gap-2">
  {models
      .filter((model) => !model.premium) // Filter out premium models
      .map((model) => (
        <div
          key={model.name}
          className={`p-1 rounded-xl border-2 cursor-pointer ${
            selectedModel === model.name ? "border-blue-500" : "border-gray-800"
          }`}
          onClick={() => setSelectedModel(model.name)}
        >
          <img
            src={ model.texture_set[0].thumbnail} 
            alt={`Model: ${model.name}`}
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
              <h6 className="text-sm font-semibold mb-1">
                Upgrade for Super Powers
              </h6>
              <p className="text-xs text-gray-300">
                Premium animated 3D models
              </p>
            </div>
            <button className="bg-white text-[#082454] px-2 py-1 rounded-2xl font-bold relative z-10 text-xs">
              <span className="font-normal">GET</span>{" "}
              <span className="font-bold">PRO</span>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-400 text-sm mb-3">PRO Models</h3>
            <div className="grid grid-cols-4 gap-2">
            {models
            .filter((model) => model.premium) // Filter premium models
            .map((model) => (
              <div
                key={model.name}
                className={`p-1 rounded-xl border-2 cursor-pointer ${
                  isPremiumUser
                    ? selectedModel === model.name
                      ? "border-blue-500"
                      : "border-gray-800"
                    : "border-gray-800 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => (isPremiumUser ? setSelectedModel(model.name) : {})} // Set model only if user is premium
              >
                <img
                  src={ model.texture_set[0].thumbnail} 
                  alt={`Pro Model ${model.name}`}
                  className="w-12 h-12 object-contain"
                />
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="flex justify-center p-4 space-x-6"
          style={{ backgroundColor: "#181818" }}
        >
          <button
            className="bg-zinc-800 hover:bg-gray-800 text-white w-40 px-8 py-3 rounded-full text-sm font-normal"
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white w-40 px-8 py-3 rounded-full text-sm font-normal"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;

// import React, { useState, useMemo } from "react";

// interface ModelSelectorProps {
//   selectedModel: string;
//   setSelectedModel: (model: string) => void;
//   selectedColor: string;
//   setSelectedColor: (color: string) => void;
//   onClose: () => void;
//   showPreview: boolean;
//   setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const ModelSelector: React.FC<ModelSelectorProps> = ({
//   selectedModel,
//   setSelectedModel,
//   selectedColor,
//   setSelectedColor,
//   onClose,
//   showPreview,
//   setShowPreview,
// }) => {
//   const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);

//   // Memoize the model images to prevent unnecessary recalculations
//   const modelImages = useMemo(
//     () => ({
//       car1: {
//         "#FF4D4D": "/models/car-red.png",
//         "#FFA500": "/models/car1.png",
//         "#FFEB3B": "/models/car-yellow.png",
//         "#4CAF50": "/models/car1.png",
//         "#2196F3": "/models/car-blue.png",
//         "#9C27B0": "/models/car1.png",
//         "#FFFFFF": "/models/car1.png",
//       },
//       car2: {
//         "#FF4D4D": "/models/car2.png",
//         "#FFA500": "/models/car2.png",
//         "#FFEB3B": "/models/car2.png",
//         "#4CAF50": "/models/car2.png",
//         "#2196F3": "/models/car2.png",
//         "#9C27B0": "/models/car2.png",
//         "#FFFFFF": "/models/car2.png",
//       },
//       bus: {
//         "#FF4D4D": "/models/car3.png",
//         "#FFA500": "/models/car3.png",
//         "#FFEB3B": "/models/car3.png",
//         "#4CAF50": "/models/car3.png",
//         "#2196F3": "/models/car3.png",
//         "#9C27B0": "/models/car3.png",
//         "#FFFFFF": "/models/car3.png",
//       },
//       truck: {
//         "#FF4D4D": "/models/truck.png",
//         "#FFA500": "/models/truck.png",
//         "#FFEB3B": "/models/truck.png",
//         "#4CAF50": "/models/truck.png",
//         "#2196F3": "/models/truck.png",
//         "#9C27B0": "/models/truck.png",
//         "#FFFFFF": "/models/truck.png",
//       },
//     }),
//     []
//   );

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end" onClick={() => setIsPaletteOpen(false)}>
//       <div
//         className="w-[350px] bg-zinc-900 h-full flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center p-4">
//           <h2 className="text-white text-l">Models</h2>
//           <button
//             aria-label="Toggle Color Palette"
//             onClick={() => setIsPaletteOpen((prev) => !prev)}
//             className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-white flex items-center justify-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 36 36"
//               width="20"
//               height="20"
//             >
//               <path d="M18 2C10.268 2 4 8.268 4 16C4 20.515 6.053 24.515 9.389 27L7 34H29L26.611 27C29.947 24.515 32 20.515 32 16C32 8.268 25.732 2 18 2Z" fill={selectedColor} />
//             </svg>
//           </button>
//         </div>

//         {isPaletteOpen && (
//           <div className="absolute top-16 right-5 bg-zinc-800 p-3 rounded-2xl shadow-lg grid grid-cols-4 gap-2">
//             {Object.keys(modelImages[selectedModel] || {}).map((color) => (
//               <div
//                 key={color}
//                 className={`h-6 w-6 rounded-full border cursor-pointer ${
//                   selectedColor === color ? "border-white" : "border-gray-500"
//                 }`}
//                 style={{ backgroundColor: color }}
//                 onClick={() => setSelectedColor(color)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModelSelector;
