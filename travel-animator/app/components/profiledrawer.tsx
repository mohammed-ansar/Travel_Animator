import Image from "next/image";
import { SetStateAction, useState } from "react";

interface ProfileDrawerProps {
  onClose: () => void;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>; //To reset authentication state
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  onClose,
  setIsAuthenticated,
}) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (link: SetStateAction<string>) => {
    setSelected(link);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false); //Reset authentication state
    onClose(); //Close the profile
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
      style={{ zIndex: 102 }}
    >
      {/* Drawer Container */}
      <div
        className="rounded-3xl w-11/12 md:w-3/4 lg:w-2/3 flex overflow-hidden shadow-lg"
        style={{
          backgroundColor: "#000000",
          border: "2px solid #292929",
        }}
      >
        {/* Left Section: Navigation */}
        <div
          className="w-[250px] flex flex-col p-6"
          style={{ backgroundColor: "#121216" }}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onClose}
              className="text-gray-300 text-4xl hover:text-gray-400"
            >
              &times;
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-8 flex-1">
            <li
              className={`text-sm font-medium cursor-pointer ${
                selected === "profile"
                  ? "bg-blue-500 text-white rounded-3xl px-4 py-2"
                  : "text-gray-300"
              }`}
              onClick={() => handleSelect("profile")}
            >
              Profile
            </li>
            <li
              className={`text-sm font-medium cursor-pointer ${
                selected === "subscription"
                  ? "bg-blue-500 text-white rounded-3xl px-4 py-2"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handleSelect("subscription")}
            >
              Subscription
            </li>
            <li
              className={`text-sm font-medium cursor-pointer ${
                selected === "community"
                  ? "bg-blue-500 text-white rounded-3xl px-4 py-2"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handleSelect("community")}
            >
              Community
            </li>
            <li
              className={`text-sm font-medium cursor-pointer ${
                selected === "account"
                  ? "bg-blue-500 text-white rounded-3xl px-4 py-2"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handleSelect("account")}
            >
              Account
            </li>
            <li
              className={`text-sm font-medium cursor-pointer ${
                selected === "request"
                  ? "bg-blue-500 text-white rounded-3xl px-4 py-2"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handleSelect("request")}
            >
              Request a feature
            </li>
          </ul>

          {/* Social Icons */}
          <div className="p-4 flex justify-around border-t border-gray-700">
            <img src="settings/insta.png" alt="Instagram" className="w-6 h-6" />
            <img src="settings/tiktok.png" alt="TikTok" className="w-6 h-6" />
            <img src="settings/fb.png" alt="Facebook" className="w-6 h-6" />
            <img
              src="settings/whatsapp.png"
              alt="WhatsApp"
              className="w-6 h-6"
            />
            <img src="settings/yt.png" alt="YouTube" className="w-6 h-6" />
          </div>
        </div>

        {/* Right Section: Profile Content */}
        <div className="flex-1 bg-black p-8 overflow-y-auto">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <Image
                src="/signin/profileimg.png"
                alt="Profile Picture"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h2 className="text-white text-2xl font-bold">Andrews</h2>
                <p className="text-gray-400">andrews345@gmail.com</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-5 py-3 border-2 border-white text-white rounded-full hover:bg-gray-800"
            >
              Sign out
            </button>
          </div>

          {/* Other Profile Content */}
          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h3 className="text-white text-xl font-semibold">
                Videos created
              </h3>
              <p className="text-blue-400 text-5xl font-bold">24</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h3 className="text-white text-xl font-semibold">
                Countries explored
              </h3>
              <p className="text-blue-400 text-5xl font-bold">08</p>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white text-xl font-semibold mb-6">
              Subscription
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-gray-400">Upgrade to PRO</p>
              <button className="px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Get PRO
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              Premium animated 3D models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
