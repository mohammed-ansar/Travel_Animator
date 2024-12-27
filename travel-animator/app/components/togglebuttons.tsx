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
    <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
      <button
        onClick={() => setActiveTab("routes")}
        className={`flex-1 py-2 font-bold ${
          activeTab === "routes"
            ? "bg-blue-500 text-white rounded-3xl"
            : "bg-zinc-900 text-gray-300 rounded-l-3xl"
        }`}
      >
        Routes
      </button>
      <button
        onClick={() => {
          if (waypoints.startingPoint && waypoints.endingPoint) {
            setActiveTab("preview");
            setShowModelSelector(true);
            setPopupVisible(true);
            setErrorPopup(false); // Hide error popup when valid points
          } else {
            setErrorPopup(true); // Show error popup if invalid points
          }
        }}
        className={`flex-1 py-2 font-bold ${
          activeTab === "preview"
            ? "bg-blue-500 text-white rounded-3xl"
            : "bg-zinc-900 text-gray-300 rounded-r-3xl"
        }`}
      >
        Preview
      </button>
    </div>
  );
};

export default ToggleButtons;
