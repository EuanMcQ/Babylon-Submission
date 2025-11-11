"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../library/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Page() {
  const router = useRouter();
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); //to take in user input

  const onSubmit = async () => {
    //  user gets created
    const result = await createUserWithEmailAndPassword(email, password);
    
    // if user input is empty then retunr (or if invalid)
    if (!result) return;

    const user = result.user;

    // save user into the firebase (firebase authentication)
    await setDoc(doc(db, "Users", user.uid), {
      name: name,
      email: email,
      createdAt: serverTimestamp(),
    });

    router.push("/");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Create Account</h1>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Full Name"
        className="text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
      />

      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        className="text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        className="text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
      />

      <button
        className="bg-white-500 text-black px-4 py-2 rounded-md font-bold"
        onClick={onSubmit}
      >
        SIGN UP
      </button>
    </div>
  );
}
