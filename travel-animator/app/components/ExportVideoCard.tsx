import React from "react";
import { useUIContext } from "../context/UIContext";
// interface ExportVideoCardProps {
//   onClose: () => void;
//   onExport: () => void;
// }

export const ExportVideoCard = ({
  // onClose,
  // onExport,
}) => {
  const {setShowProgressCard,setShowExportCard} = useUIContext();
  return (
    <div className="absolute top-0 right-0 bg-[#121216] p-6 rounded-3xl shadow-lg w-80">
      <h3 className="text-white mb-4">File Name</h3>
      <input
        type="text"
        placeholder="Eg. Trip to Vegas"
        className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white"
      />
      <h4 className="text-white mb-4">Export Quality</h4>
      <div className="w-full p-3 mb-4 rounded-lg bg-gray-800 flex justify-between items-center"> 
        <label className="text-white">HD</label>
        <input type="radio" name="quality" value="HD" className="ml-2" />
      </div>
        <div className="w-full p-3 mb-4 rounded-lg bg-gray-800 flex justify-between items-center">
        <label className="text-white">4K</label>
        <input type="radio" name="quality" value="4K" className="ml-2" />
      </div>
      <p className="text-white text-sm mb-4">
        Get a collection of vehicle models, Map, and more with our premium.{" "}
        <a href="/plans" className="text-blue-400 underline">
          See plans
        </a>
      </p>
      <button
        className="w-full bg-[#0A84FF] p-3 text-white rounded-lg"
        // onClick={onExport}
        onClick={()=>{
          setShowProgressCard(true);
          setShowExportCard(false);
        }
        }
      >
        Export Video
      </button>
    </div>
  );
};
