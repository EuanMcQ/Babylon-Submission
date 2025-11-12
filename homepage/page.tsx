"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../library/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string>(""); // variables designed for users name and so it can be displayed

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      } // if no user is logged in and they access the dashboard, it sends them back

      setUser(currentUser); // setting current user
      const docRef = doc(db, "Users", currentUser.uid); // accessing firebase
      const docSnap = await getDoc(docRef); // a snapshot of users details to be displayed

      if (docSnap.exists()) {
        setFullName(docSnap.data().name);
      } else {
        setFullName(currentUser.displayName || "User"); // setting the variable to be users name
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/"); // goes back to homepage upon sign out click
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-lime-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
        Welcome, {fullName || "User"}! Glad you went through this demo!
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
