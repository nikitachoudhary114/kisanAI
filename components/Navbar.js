"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image"; 
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <div className="flex items-center">
                <Link href='/'>
                <Image
                    src="/logo.png" 
                    alt="Kisan AI Logo"
                    width={40} 
                    height={40} 
                    className="mr-2" 
                    />
                </Link>
                <div className="text-xl font-bold text-green-600">
                    Kisan AI
                </div>
                    
                

            </div>
            <div className="flex gap-4">
                <Link href='/recommendation'>
                <p>Recommendations</p>
                </Link>
                <Link href='/yield'>
                <p>Yield</p>
                </Link>
                <Link href='/price'>
                <p>Price</p>
                </Link>
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
