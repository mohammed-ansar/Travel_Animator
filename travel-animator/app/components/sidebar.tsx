import React, { useState, useEffect } from "react";
import ModelSelector from "./modelselector";
import Plane from "../icons/Plane";
import Destination from "../icons/Destination";
import ToggleButtons from "./togglebuttons";

interface SidebarProps {
  waypoints: {
    startingPoint: string;
    endingPoint: string;
  };
  setWaypoints: React.Dispatch<
    React.SetStateAction<{ startingPoint: string; endingPoint: string }>
  >;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  errorPopup: boolean;
  setErrorPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  waypoints,
  setWaypoints,
  showPreview,
  setShowPreview,
  selectedModel,
  selectedColor,
  setSelectedModel,
  setSelectedColor,
  errorPopup,
  setErrorPopup,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  // const [errorPopup, setErrorPopup] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [activeTab, setActiveTab] = useState("routes");
  const [waypointCount, setWaypointCount] = useState(0);

  // Update waypoint count dynamically based on user input
  useEffect(() => {
    let count = 0;
    if (waypoints.startingPoint) count += 1;
    if (waypoints.endingPoint) count += 1;
    setWaypointCount(count);
  }, [waypoints]);

  // Hide error popup when waypoints are updated
  useEffect(() => {
    if (waypoints.startingPoint && waypoints.endingPoint) {
      setErrorPopup(false); // Hide error popup when both waypoints are filled
      setPopupVisible(true);
    }
  }, [waypoints]); // Dependency on waypoints

  return (
    <aside
      className="w-1/4 h-5/6 ml-3 p-3 pt-8 pr-5 rounded-3xl flex flex-col relative"
      style={{ backgroundColor: "#121216" }}
    >
      {/* Toggle Buttons */}
      {/* <ToggleButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        waypoints={waypoints}
        setShowModelSelector={setShowModelSelector}
        setPopupVisible={setPopupVisible}
        setErrorPopup={setErrorPopup}
      /> */}

      {/* Divider Line */}
      <div className="border-t border-zinc-800 my-14 mb-3"></div>

      <div>
        <p className="mb-4 text-sm font-medium" style={{ color: "#D2E1F0" }}>
          Waypoint {waypointCount}
        </p>
        {/* Starting Point */}
        <div className="flex items-center">
          <div className="mr-4 mb-8 ml-2 text-3xl text-white"> ͇ </div>
          <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl w-full">
            <div className="mr-1">
              <Plane />
            </div>
            <input
              type="text"
              placeholder="Starting Point"
              value={waypoints.startingPoint}
              onChange={(e) =>
                setWaypoints({
                  ...waypoints,
                  startingPoint: e.target.value,
                })
              }
              className="flex-1 bg-zinc-800 text-white outline-none pl-2 mr-2 w-full overflow-hidden text-ellipsis"
            />
          </div>
        </div>

        {/* Ending Point */}
        <div className="flex items-center">
          <div className="mr-4 mb-8 ml-2 text-3xl text-white">͇</div>
          <div className="flex items-center bg-zinc-800 p-2 rounded-3xl w-full">
            <div className="mr-1">
              <Destination />
            </div>
            <input
              type="text"
              placeholder="Ending Point"
              value={waypoints.endingPoint}
              onChange={(e) =>
                setWaypoints({
                  ...waypoints,
                  endingPoint: e.target.value,
                })
              }
              className="flex-1 bg-zinc-800 text-white outline-none pl-2 mr-2 w-full overflow-hidden text-ellipsis"
            />
          </div>
        </div>
      </div>

      {/* Popup Box */}
      {popupVisible && (
        <div className="fixed bottom-7 right-7 bg-black text-white px-6 py-3 my-3 rounded-3xl  shadow-lg flex items-center space-x-4 z-50">
          <p className="text-sm">Preview mode is now available!</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
            onClick={() => {
              // setShowModelSelector(true);
              setShowPreview(true);
              setActiveTab("preview"); // Update the active tab to "preview"
              setPopupVisible(false); // Close the popup
            }}
          >
            Go to Preview
          </button>
          <button
            className="text-white hover:text-gray-400 text-lg font-bold"
            onClick={() => setPopupVisible(false)}
          >
            &times;
          </button>
        </div>
      )}

      {/* Error popup */}
      {errorPopup && (
        <div
          className="fixed bottom-7 right-7 text-white px-6 py-4 my-3 rounded-2xl shadow-lg flex items-center space-x-4 z-50"
          style={{ backgroundColor: "#FF2E2E" }}
        >
          <div className="text-white text-lg">
            <i className="fas fa-exclamation-circle"></i>{" "}
            {/* Example with FontAwesome */}
          </div>
          <p className="text-sm font-light">
            Oops! Preview mode needs at least 2 Waypoints to work.
          </p>
        </div>
      )}

      {/* Conditionally Render ModelSelector */}
      {showModelSelector && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* <div className="bg-white p-6 rounded-lg shadow-lg"> */}
          <ModelSelector
            selectedModel={selectedModel}
            selectedColor={selectedColor}
            setSelectedModel={setSelectedModel}
            setSelectedColor={setSelectedColor}
            onClose={() => setShowModelSelector(false)}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
          />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
