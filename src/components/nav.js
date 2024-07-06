"use client";

import Link from "next/link";
import Image from "next/image";
import logoremovebg from "../../public/logoremovebg.png";
import { useEffect, useState } from "react";

export default function Nav() {
  let email = sessionStorage.getItem("useremail");

  function handleLogin(event) {
    event.preventDefault();
    window.location.href = "/login";
  }

  function handleSignUp(event) {
    event.preventDefault();
    window.location.href = "/signup";
  }

  return (
    <nav className="w-full z-20 top-0 start-0 mt-4 mb-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logoremovebg} className="h-16 w-16" alt="Logoremovebg" />
          <span className="self-center text-4xl font-semibold whitespace-nowrap text-ivory md:hover:text-gray-400">
            BusinessIndex
          </span>
        </a>
        {email == null ? (
          <div className="flex md:order-2 md:space-x-5">
            <button
              type="button"
              className="text-2xl text-ivory font-medium md:hover:text-gray-400"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="text-2xl text-purple-500 border border-purple-500 font-medium rounded-lg px-4 py-2 text-center hover:bg-purple-500 hover:text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="flex md:order-2 md:space-x-5">
            <button
              type="button"
              className="text-2xl text-ivory border border-ivory font-medium rounded-lg px-4 py-2 text-center hover:border-gray-400 hover:text-gray-400"
            >
              {email}
            </button>
          </div>
        )}

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="text-2xl text-ivory flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <a
                href="/"
                className="block py-2 px-3 rounded md:bg-transparent md:hover:text-gray-400"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/search"
                className="block py-2 px-3 rounded md:hover:text-gray-400"
              >
                Search
              </a>
            </li>
            {email && (
              <li>
                <a
                  href="/enter"
                  className="block py-2 px-3 rounded md:hover:text-gray-400"
                >
                  Enter
                </a>
              </li>
            )}
            <li>
              <a
                href="/help"
                className="block py-2 px-3 rounded md:hover:text-gray-400"
              >
                Help
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
