import React from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void; // Add this prop
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-3xl w-4/5 md:w-2/3 lg:w-1/2 flex overflow-hidden shadow-lg">
        <div
          className="w-1/2 flex flex-col justify-between items-center p-0 relative"
          style={{ backgroundColor: "#0A84FF" }}
        >
          <button
            onClick={onClose}
            className="absolute top-0 left-0 m-4 text-gray-200 text-4xl hover:text-gray-400"
          >
            &times;
          </button>
          <img
            src="signin/title.png"
            alt="Travel Animator Branding"
            className="w-57 object-cover h-auto mt-14"
          />
          <button
            className="absolute top-36 left-18 flex items-center px-4 py-1 font-semibold rounded-full shadow-lg"
            style={{ backgroundColor: "white", color: "#0A84FF" }}
            onClick={() => alert("PRO Button Clicked")}
          >
            <img
              src="/premiumiconbg-white.png"
              alt="Icon"
              className="-ml-2 w-8 h-8"
            />
            PRO
          </button>
          <img
            src="signin/signin-icon.png"
            alt="Travel Vehicles"
            className="w-full object-cover h-auto mt-auto"
          />
        </div>
        <div
          className="w-1/2 flex flex-col p-8"
          style={{ backgroundColor: "#0F1A20" }}
        >
          <h2 className="text-white text-xl font-semibold mb-16 text-center">
            Log In / Sign Up
          </h2>
          <button
            className="flex items-center justify-center bg-white text-black rounded-full py-2 mb-4 hover:bg-gray-200"
            onClick={onAuthenticate} // Call authenticate handler
          >
            <FaApple style={{ fontSize: "1.5rem" }} className="mr-2 -ml-3" />
            <span className="text-sm font-medium text-black">
              Continue with Apple
            </span>
          </button>
          <button
            className="flex items-center justify-center bg-white text-black rounded-full py-2 hover:bg-gray-200"
            onClick={onAuthenticate} // Call authenticate handler
          >
            <FcGoogle style={{ fontSize: "1.5rem" }} className="mr-2" />
            <span className="text-sm font-medium text-black">
              Continue with Google
            </span>
          </button>
          <p className="text-gray-400 text-xs mt-6 text-center">
            By continuing, you accept our Terms of Service and acknowledge
            receipt of our Privacy & Cookie Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;

