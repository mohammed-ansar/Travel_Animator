// "use client";

// import React from "react";

// interface WaypointsProps {
//   waypoints: {
//     startingPoint: string;
//     endingPoint: string;
//   };
//   setWaypoints: React.Dispatch<
//     React.SetStateAction<{ startingPoint: string; endingPoint: string }>
//   >;
// }

// const Waypoints: React.FC<WaypointsProps> = ({ waypoints, setWaypoints }) => {
//   return (
//     <div>
//       <p className="mb-4">0 Waypoints</p>
//       <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl">
//         <div className="mr-2 text-blue-400">➖</div>
//         <input
//           type="text"
//           placeholder="Enter Starting Point"
//           value={waypoints.startingPoint}
//           onChange={(e) =>
//             setWaypoints({ ...waypoints, startingPoint: e.target.value })
//           }
//           className="flex-1 bg-zinc-800 text-white outline-none"
//         />
//       </div>
//       <div className="flex items-center bg-zinc-800 p-2 rounded-3xl">
//         <div className="mr-2 text-orange-400">➖</div>
//         <input
//           type="text"
//           placeholder="Enter Ending Point"
//           value={waypoints.endingPoint}
//           onChange={(e) =>
//             setWaypoints({ ...waypoints, endingPoint: e.target.value })
//           }
//           className="flex-1 bg-zinc-800 text-white outline-none"
//         />
//       </div>
//     </div>
//   );
// };

// export default Waypoints;

"use client";
import React from "react";

interface WaypointsProps {
  waypoints: {
    startingPoint: string;
    endingPoint: string;
  };
  setWaypoints: React.Dispatch<
    React.SetStateAction<{ startingPoint: string; endingPoint: string }>
  >;
}

export const Waypoints: React.FC<WaypointsProps> = ({
  waypoints,
  setWaypoints,
}) => {
  return (
    <div>
      <p className="mb-4">0 Waypoints</p>
      {/* Starting Point Input */}
      <div className="flex items-center mb-2 bg-zinc-800 p-2 rounded-3xl">
        <div className="mr-2 text-blue-400">➖</div>
        <input
          type="text"
          placeholder="Enter Starting Point"
          value={waypoints.startingPoint}
          onChange={(e) =>
            setWaypoints({ ...waypoints, startingPoint: e.target.value })
          }
          className="flex-1 bg-zinc-800 text-white outline-none"
        />
      </div>
      {/* Ending Point Input */}
      <div className="flex items-center bg-zinc-800 p-2 rounded-3xl">
        <div className="mr-2 text-orange-400">➖</div>
        <input
          type="text"
          placeholder="Enter Ending Point"
          value={waypoints.endingPoint}
          onChange={(e) =>
            setWaypoints({ ...waypoints, endingPoint: e.target.value })
          }
          className="flex-1 bg-zinc-800 text-white outline-none"
        />
      </div>
    </div>
  );
};

export default Waypoints;
