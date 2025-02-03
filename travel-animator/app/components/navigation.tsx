"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MdAltRoute } from "react-icons/md";
import SignInModal from "./signin";
import ProfileDrawer from "./profiledrawer";
import ProModal from "./promodal"; 
import { useUIContext } from "../context/UIContext";

export const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const [isProModalOpen, setIsProModalOpen] = useState(false); 
  const { setShowExportCard } = useUIContext();
  

  // Handles user authentication
  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setIsModalOpen(false); 
  };

  return (
    <nav className="flex items-center justify-between p-2 bg-black text-white">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
        </Link>
        <Link href="/" className="ml-2 text-2xl font-bold">
          Travel Animator
        </Link>
        <div
          className="ml-4 flex items-center px-4 py-1 text-white rounded-full cursor-pointer"
          style={{ backgroundColor: "#2A2A2A" }}
          onClick={() => setIsProModalOpen(true)} // Open PRO Modal
        >
          <img src="/premiumicon.png" alt="Icon" className="-ml-2 w-8 h-8" />
          PRO
        </div>
      </div>

      {/* Right Section: User Actions */}
      <div className="flex items-center">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full mr-2 hover:bg-gray-700"
          style={{ backgroundColor: "#212121" }}
        >
          <MdAltRoute className="w-5 h-5 text-white" />
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full mr-2 hover:bg-gray-700"
          style={{ backgroundColor: "#212121" }}
        >
          <img src="/bin.png" alt="Icon" className="w-5 h-5" />
        </button>
        <button className="px-4 py-2 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 mr-2"
        style={{backgroundColor:"#0A84FF"}}
        onClick={()=>{setShowExportCard(true)
          console.log("export card")
        }
        }
        >
          Export video
        </button>

        {/* Show profile image if authenticated, else show Sign in button */}
        {isAuthenticated ? (
          <img
            src="signin/profileimg.png"
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => setIsDrawerOpen(true)} 
          />
        ) : (
          <button
            className="px-4 py-2 border border-gray-500 text-sm text-white font-normal rounded-2xl hover:bg-gray-800"
            onClick={() => setIsModalOpen(true)} // Open modal for sign-in
          >
            Sign in
          </button>
        )}

        {/* SignIn Modal */}
        <SignInModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAuthenticate={handleAuthentication} 
        />
      </div>

      {/* Profile section */}
      {isDrawerOpen && (
        <ProfileDrawer
          onClose={() => setIsDrawerOpen(false)}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}

      {/* PRO Modal */}
      <ProModal isOpen={isProModalOpen} onClose={() => setIsProModalOpen(false)} />
    </nav>
  );
};
