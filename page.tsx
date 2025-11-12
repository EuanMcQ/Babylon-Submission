"use client";

import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../library/firebase";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lime-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to the demo
      </h1>

      <div className="flex space-x-6">
        <Link
          href="/login"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Sign In
        </Link>

        <Link
          href="/Register"
          className="bg-white hover:bg-gray-100 text-indigo-600 px-6 py-3 rounded-md font-semibold border border-indigo-500 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
