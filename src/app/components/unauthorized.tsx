import React from "react";
import Link from "next/link";
import { GrSecure } from "react-icons/gr";

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div
          className={
            "flex text-7xl text-indigo-500 items-center justify-center"
          }
        >
          <GrSecure />
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Unauthorized Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please login to continue
          </p>
        </div>
        <div>
          <Link href="/login">
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
               font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
               focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
