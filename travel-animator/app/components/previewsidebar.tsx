import React, { useState } from "react";
import { FaFlag, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import ToggleButtons from "./togglebuttons"; 

const PreviewSidebar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [waypoints, setWaypoints] = useState({
    startingPoint: "",
    endingPoint: "",
  }); // State for waypoints
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const handleSave = () => {
    setIsEditing(true);
  };

  const handleDiscard = () => {
    setIsEditing(true);
  };

  return (
    <div className="w-1/4 h-5/6 bg-zinc-900 ml-3 p-3 pr-8 rounded-3xl flex flex-col relative">
      {isEditing ? (
        <div>
          {/* Add the ToggleButtons component here */}
          <ToggleButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            waypoints={waypoints}
            setShowModelSelector={setShowModelSelector}
            setPopupVisible={setPopupVisible}
            setErrorPopup={setErrorPopup}
          />

          {/* Sliders */}
          <div className="py-4">
            <div className="mb-6">
              <label className="block text-sm mb-1">Model size</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="0.8"
                className="w-full"
              />
              <div className="text-right text-xs mt-1">0.80</div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Duration</label>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                defaultValue="20"
                className="w-full"
              />
              <div className="text-right text-xs mt-1">20 Sec</div>
            </div>
          </div>

          {/* Flag Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaFlag className="mr-2" />
              <span>Flag</span>
            </div>
            <input type="checkbox" defaultChecked className="toggle-checkbox" />
          </div>

          {/* Unit Selector */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>Unit</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 rounded">Km</button>
              <button className="px-3 py-1 bg-gray-700 rounded">Mi</button>
              <button className="px-3 py-1 bg-gray-700 rounded">Off</button>
            </div>
          </div>

          {/* Map Style */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <IoMdArrowRoundForward className="mr-2" />
              <span>Map style</span>
            </div>
            <button className="px-2 py-1 bg-gray-700 rounded">
              <IoMdArrowRoundForward />
            </button>
          </div>

          {/* Add Destinations */}
                  <button className="w-full py-2 text-blue-500 rounded-lg mt-4"
                      style={{backgroundColor: "#0A84FF14"}}>
            + Add destinations
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-bold mb-4">Sidebar</h1>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 py-2 rounded mb-4 hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={handleDiscard}
            className="w-full bg-gray-500 py-2 rounded hover:bg-gray-600"
          >
            Discard
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewSidebar;

