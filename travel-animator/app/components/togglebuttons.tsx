import React from "react";

interface ToggleButtonsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  waypoints: { startingPoint: string; endingPoint: string };
  setShowModelSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  activeTab,
  setActiveTab,
  waypoints,
  setShowModelSelector,
  setPopupVisible,
  setErrorPopup,
}) => {
  return (
    <div className="flex mb-4 border border-gray-800 rounded-3xl p-1">
      {/* Routes Button */}
      <button
        onClick={() => setActiveTab("routes")}
        className={`flex-1 py-2 font-bold text-white rounded-3xl ${
          activeTab === "routes" ? "" : "text-gray-300"
        }`}
        style={{
          backgroundColor: activeTab === "routes" ? "#0A84FF" : "#121216",
        }}
      >
        Routes
      </button>

      {/* Preview Button */}
      <button
        onClick={() => {
          if (waypoints.startingPoint && waypoints.endingPoint) {
            setActiveTab("preview");
            setShowModelSelector(true);
            setPopupVisible(false);
            setErrorPopup(false); // Hide error popup when valid points
          } else {
            setErrorPopup(true); // Show error popup if invalid points
          }
        }}
        className={`flex-1 py-2 font-bold text-white rounded-3xl ${
          activeTab === "preview" ? "" : "text-gray-300"
        }`}
        style={{
          backgroundColor: activeTab === "preview" ? "#0A84FF" : "#121216",
        }}
      >
        Preview
      </button>
    </div>
  );
};

export default ToggleButtons;
