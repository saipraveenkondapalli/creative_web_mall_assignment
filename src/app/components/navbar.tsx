"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface NavLinkProps {
  name: string;
  href: string;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const userLoggedIn = status === "authenticated";

  const navLinks: NavLinkProps[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "New Student",
      href: "/dashboard/student",
    },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <div className={"font-medium font-sans "}>Creative Web Mall</div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {userLoggedIn && <RenderNavLinks links={navLinks} />}
              </div>
            </div>
          </div>
          <div className={"hidden md:block"}>
            {userLoggedIn && <SignOutButton />}
            {!userLoggedIn && <LoginInLink />}
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden `}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col ">
          {userLoggedIn && <RenderNavLinks links={navLinks} />}
          <div className={""}>
            {userLoggedIn && <SignOutButton />}
            {!userLoggedIn && <LoginInLink />}
          </div>
        </div>
      </div>
    </nav>
  );
}

const RenderNavLinks = ({ links }: { links: NavLinkProps[] }) => {
  return links.map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {link.name}
    </Link>
  ));
};

const SignOutButton = () => {
  return (
    <>
      <button
        className="bg-red-500 text-white py-1 px-2 mx-2 md:mx-0 md:py-2 md:px-4  rounded-md text-sm font-medium hover:bg-red-700"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </>
  );
};

const LoginInLink = () => {
  return (
    <>
      <Link
        href="/login"
        className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        Sign In
      </Link>
    </>
  );
};

export default Navbar;
