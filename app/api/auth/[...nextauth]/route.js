// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'; // Ensure this is correctly installed
import client from '@/lib/db';
 // Adjust the path based on your project structure

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(client),
    // other NextAuth configuration options
};

const handler = NextAuth(authOptions);

// Named exports for HTTP methods
export const GET = handler; // Exports GET request handling
export const POST = handler; // Exports POST request handling
