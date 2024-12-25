// "use client"
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export const Navigation = () => { 
//     const pathname = usePathname();
//     return (
//         <nav>
//             <Link href='/' className={pathname === '/' ? "font-bold mr-4":"mr-4 text-white"}>
//                 Home
//             </Link>
//             <Link href='/about' className={pathname === '/about' ? "font-bold mr-4":"mr-4 text-white"}>
//                 About
//             </Link>
//         </nav>
//     );
// };


"use client";
import Link from "next/link";
import Image from "next/image";

export const Navigation = () => {
    return (
        <nav className="flex items-center justify-between p-2 bg-black text-white">
            {/* Left Section: Logo and Title */}
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src="/logo.png" 
                        alt="Logo"
                        width={40} 
                        height={40} 
                        priority
                    />
                </Link>
                <Link href="/" className="ml-2 text-lg font-bold">
                    Travel Animator
                </Link>
                <div className="ml-4 flex items-center px-3 py-1 bg-gray-800 text-yellow-400 rounded-full">
                    <span className="mr-2">💎</span> PRO
                </div>
            </div>

            
            <div className="flex items-center">
                <button className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full mr-2 hover:bg-gray-700">
                    <span>⚡</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full mr-2 hover:bg-gray-700">
                    <span>🗑️</span>
                </button>

                <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 mr-2">
                    Export video
                </button>

                <button className="px-4 py-2 border border-white text-white font-bold rounded-lg hover:bg-gray-800">
                    Sign in
                </button>
            </div>
        </nav>
    );
};
