"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

function LoginPage() {
  // get callbackUrl from query params
  const router = useSearchParams();
  const callbackUrl = router.get("callbackUrl") || "/dashboard";

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 align-items-center rounded-lg shadow-lg w-auto ">
        <div className={"text-5xl mb-10"}> Sign in to your account</div>

        <button
          onClick={() => signIn("google", { callbackUrl: callbackUrl })}
          className="flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-xl font-medium rounded-md text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <FcGoogle className="mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
