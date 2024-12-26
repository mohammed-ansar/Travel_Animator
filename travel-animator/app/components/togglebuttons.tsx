// "use client";

// import React from "react";

// interface ToggleButtonsProps {
//   handlePreviewClick: () => void;
// }

// const ToggleButtons: React.FC<ToggleButtonsProps> = ({ handlePreviewClick }) => {
//   return (
//     <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
//       <button className="flex-1 py-2 bg-blue-500 text-white font-bold rounded-l-3xl">
//         Routes
//       </button>
//       <button
//         className="flex-1 py-2 bg-zinc-900 text-gray-300 font-bold rounded-r-2xl"
//         onClick={handlePreviewClick}
//       >
//         Preview
//       </button>
//     </div>
//   );
// };

// export default ToggleButtons;

"use client";
import React from "react";

interface ToggleButtonsProps {
  handlePreviewClick: () => void;
}

export const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  handlePreviewClick,
}) => {
  return (
    <div className="flex mb-4 border border-gray-600 rounded-3xl p-1">
      <button className="flex-1 py-2 bg-blue-500 text-white font-bold rounded-l-3xl">
        Routes
      </button>
      <button
        className="flex-1 py-2 bg-zinc-900 text-gray-300 font-bold rounded-r-3xl"
        onClick={handlePreviewClick}
      >
        Preview
      </button>
    </div>
  );
};

export default ToggleButtons;
