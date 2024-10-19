// app/components/Layout.js
"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
    const { data: session } = useSession();

    return (
        <div>
            {session && <Navbar />}
            <main className="min-h-screen pt-16">{children}</main> {/* Ensure content is below the Navbar */}
        </div>
    );
};

export default Layout;
