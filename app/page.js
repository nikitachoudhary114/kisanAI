"use client";

import Navbar from "@/components/Navbar";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image"; 

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Navbar />
      ) : (
        <div
          className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-6 md:p-8 lg:p-10"
          style={{
            backgroundImage: 'url("/bg.avif")',
            backgroundColor: "rgba(255, 255, 255, 0.6)", 
          }}
        >
         
          <Image
            src="/logo.png" 
            alt="Kisan AI Logo"
            width={120} 
            height={120} 
            className="mb-6" 
          />
          <h1 className="text-5xl font-extrabold mb-4 text-center text-yellow-200 md:text-6xl lg:text-7xl">
            Welcome to Kisan AI
          </h1>
          <p className="text-lg mb-4 text-center text-yellow-400 md:text-xl lg:text-2xl">
            Empowering Farmers with Data-Driven Insights
          </p>
          <p className="mb-6 text-center text-white text-md md:text-lg lg:text-xl">
            Kisan AI is a revolutionary platform designed to help farmers make informed decisions about crop planting and selling.
            <br />
            Using advanced AI algorithms, we analyze market trends and environmental factors to predict crop prices.
          </p>
          <div className="mb-4 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Why Choose Kisan AI?</h2>
            <ul className="list-disc list-inside text-left text-lg md:text-xl">
              <li>Market Predictions: Access accurate forecasts to maximize your profits.</li>
              <li>Informed Decisions: Get personalized recommendations on what to plant and when to sell.</li>
              <li>Sustainable Farming: Optimize your resources and contribute to sustainable agriculture.</li>
            </ul>
          </div>
          <button
            onClick={() => signIn("google")}
            className="flex items-center bg-yellow-600 text-white px-8 py-4 rounded-lg hover:bg-yellow-700 transition duration-300 mt-4"
          >
            <Image
              src="/google.png" 
              alt="Google Logo"
              width={28}
              height={28}
              className="mr-2"
            />
            Sign in with Google
          </button>
        </div>
      )}
      {session && (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-semibold">Welcome to Kisan AI, {session.user.name}!</p>
        </div>
      )}
    </>
  );
}
