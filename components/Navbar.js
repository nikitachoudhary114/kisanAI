"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image"; // Import Image component for the logo

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <div className="flex items-center">
                
                <Image
                    src="/logo.png" 
                    alt="Kisan AI Logo"
                    width={40} 
                    height={40} 
                    className="mr-2" 
                />
                <div className="text-xl font-bold text-green-600">
                    Kisan AI
                </div>
            </div>
            {session && (
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Sign out
                </button>
            )}
        </nav>
    );
}
