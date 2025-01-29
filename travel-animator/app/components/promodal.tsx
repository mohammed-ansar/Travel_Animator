import React from "react";
import Image from "next/image";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "style={{zIndex:102}}>
      <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full relative">
        {/* Modal Header */}
        <div className="relative bg-blue-500">
          <Image
            src="/pro/proheader.png" 
            alt="Travel Animator Branding"
            layout="responsive"
            width={800}
            height={180} 
          />
          <button
            onClick={onClose}
            className="absolute -top-0.5 left-5 text-gray-300 text-4xl hover:text-white"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="text-white px-4 py-4 min-h-[300px]" 
          style={{ backgroundColor: "#121216" }}
        >
          <h2 className="text-lg font-semibold text-start mb-3">
            Create Amazing Map Videos
          </h2>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 text-xs">
            <li className="flex items-center">
              <span className="text-blue-400 mr-2">✔</span> Premium Animated 3D
              Models
            </li>
            <li className="flex items-center">
              <span className="text-blue-400 mr-2">✔</span> Multiple Map Styles
            </li>
            <li className="flex items-center">
              <span className="text-blue-400 mr-2">✔</span> No Ads + No
              Watermark
            </li>
            <li className="flex items-center">
              <span className="text-blue-400 mr-2">✔</span> Unlimited Video
            </li>
          </ul>
          {/* Subscription Options */}
          <div className="grid grid-cols-3 gap-4">
            <div
              className="p-6 h-[200px] rounded-2xl text-center text-sm"
              style={{ backgroundColor: "#19191D" }}
            >
              <p className="text-xs font-light mb-4 mt-4">1 Week</p>{" "}
              <p className="text-xl font-semibold mb-4">₹99.00</p>{" "}
              <p className="text-xs mb-4">₹99.00/week</p>{" "}
              <button
                className="mt-3 w-full border border-gray-500 text-white py-1 rounded-lg"
                style={{ backgroundColor: "#19191D" }}
              >
                Get Started
              </button>
            </div>
            <div
              className="p-6 h-[200px] rounded-2xl text-center text-sm"
              style={{ backgroundColor: "#19191D" }}
            >
              <p className="text-xs font-light mb-4 mt-4">1 Month</p>{" "}
              <p className="text-xl font-bold mb-4">₹199.00</p>{" "}
              <p className="text-xs mb-4">₹46.44/week</p>{" "}
              <button
                className="mt-3 w-full border border-gray-500 text-white py-1 rounded-lg"
                style={{ backgroundColor: "#19191D" }}
              >
                Get Started
              </button>
            </div>
                      <div className="p-6 h-[200px] border border-blue-700 text-white rounded-2xl text-center relative text-sm"
                      style={{backgroundColor:"#111B2A"}}>
              <p className="text-xs font-light mb-4 mt-4">1 Year</p>{" "}
              <p className="text-xl font-bold mb-4">₹699.00</p>{" "}
              <p className="text-xs mb-4">₹13.41/week</p>{" "}
              <button className="mt-3 w-full bg-white text-black py-1 rounded-lg">
                Get Started
              </button>
              <p className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                Most Popular
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProModal;
