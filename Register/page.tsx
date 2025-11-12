"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../library/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Page() {
  const router = useRouter(); // routing with app folder
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth); // built in add on with firebase

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // constants to assign user details and store in db

  //Button function
  const onSubmit = async () => { 
    const result = await createUserWithEmailAndPassword(email, password);
    if (!result) return; // if no details are received 

    const user = result.user;
    await setDoc(doc(db, "Users", user.uid), {
      name: name,
      email: email,
      createdAt: serverTimestamp(),
    }); // giving details to the db, also a unique id per user

    router.push("/");
  };

  return ( // basic styling, giving a card
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800"> 
          Create Account
        </h1>

        <input
          type="text"
          onChange={(e) => setName(e.target.value)} // setting are constant variables
          value={name}
          placeholder="Full Name"
          className="w-full text-lg px-4 py-2 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
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
          onClick={onSubmit} // function operates upon user click.
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-4 py-2 rounded-md font-semibold transition"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
