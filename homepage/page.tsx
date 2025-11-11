"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../library/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push ("/login");
        return;
      }

      setUser(currentUser);
      const docRef = doc(db, "Users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFullName(docSnap.data().name);
      } else {
        setFullName(currentUser.displayName || "User");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-4">
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
