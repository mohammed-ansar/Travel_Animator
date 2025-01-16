import React from "react";
import { useUIContext } from "../context/UIContext";


export const ExportProgressCard= ({
}) => {
  const {setShowProgressCard} = useUIContext();
  return (
    <>
    <div 
      className="absolute top-1/3 right-1/2 transform -translate-x-1/6 -translate-y-1/2" 
    > 
      <div 
        className="bg-[#121216] rounded-lg shadow-lg p-6  mb-6" 
        style={{ height: '18rem' }} 

      > 
        <h3 className="text-[#ACD5FF99] text-lg font-semibold mb-4">
          Exporting, please do not close the screen.
        </h3>
        <div className="flex justify-between items-center">
        <div className="w-96 bg-gray-300 rounded-lg h-4 mb-4 overflow-hidden "> 
        <div className="bg-[#0A84FF] h-4 rounded-lg w-1/2"></div>
      </div>
      <button className="text-white text-sm font-bold mb-4 "
      onClick={()=>setShowProgressCard(false)}
      >X</button> 
      </div>
        <button className="bg-[#0A84FF] text-white p-2 rounded-md w-32">
          Hint
        </button>
      </div>
  
      <div 
        className="bg-gradient-to-r from-[#00A2FF] to-[#0739B0] p-4 rounded-lg text-center text-white" 
      >
        <h4 className="mb-2">Share your travel stories</h4>
        <p className="text-[#B4D5F5]">
          Use <span className="bg-red-500 px-2 rounded">#travelanimator</span>{" "}
          hashtag while sharing on social media.
        </p>
        <div className="flex justify-end mt-4 space-x-2">
          <img src="/fb-icon.png" alt="Facebook" className="w-6 h-6" />
          <img src="/youtube-icon.png" alt="YouTube" className="w-6 h-6" />
          <img src="/insta-icon.png" alt="Instagram" className="w-6 h-6" />
        </div>
      </div>
    </div>
  </>

  );
};
