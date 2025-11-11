"use client";

import Link from "next/link";
import { useAuthState, useSignOut} from "react-firebase-hooks/auth";
import { auth } from "../library/firebase";

export default function Home() {

  const [user, loading] = useAuthState(auth);
  const[signOut] = useSignOut(auth);

  return (
    <div className = "bg-black">
      <h1> Welcome to the demo</h1>

      <Link className="mr-4 underline" href="/login">
        Sign in      
      </Link>
      <Link className="mr-4 underline" href="/Register">
        Sign-up
      </Link>
    </div>
  );
}
