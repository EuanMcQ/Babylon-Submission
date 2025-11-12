"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../library/firebase";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // variables used to compare input details with db details

  const onSubmit = async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim() // removing any potential unforeseen white spaces
    );

    const user = userCredential.user;
    console.log("Logged in user:", user.email); // checker to ensure it work accordingly

    router.push("/homepage"); //onClick will allow to move to dashboard
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="w-full text-lg px-4 py-2 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="w-full text-lg px-4 py-2 rounded-md border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-4 py-2 rounded-md font-semibold transition"
          onClick={onSubmit}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
}
