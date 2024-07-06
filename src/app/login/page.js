"use client";

import React from "react";
import { useRef } from "react";
import { auth } from "@/app/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Image from "next/image";
import logoremovebg from "../../../public/logoremovebg.png";

export default function Home() {
  //Create a reference to the email and password
  const logemailRef = useRef();
  const logpasswordRef = useRef();

  const login = (e) => {
    e.preventDefault();
    //Get the email and password
    const email = logemailRef.current.value;
    const password = logpasswordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Runs when the user is logged in
        const user = userCredential.user;
        
        //Allows for name display at the top of the page
        sessionStorage.setItem("useremail", user.displayName);
        console.log(sessionStorage.getItem("useremail"));

        //Router to next page
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div>
      <Nav />
      <section className="bg-black">
        <div className="flex flex-col items-center justify-center px-6 mx-auto mt-16 mb-32 lg:py-2">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image src={logoremovebg} class="w-8 h-8 mr-2" alt="Logoremovebg" />
            BusinessIndex
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Login to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={login}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Your email
                  </label>
                  <div class="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="email-address-icon"
                      ref={logemailRef}
                      className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400 ps-10"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Password
                  </label>
                  <input
                    ref={logpasswordRef}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400ß"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-purple-600 ring-offset-gray-800 accent-purple-500"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label For="remember" class="text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-light text-gray-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <p className="text-sm font-light text-gray-400">
                  Don’t have an account yet?
                  <a
                    href="/signup"
                    class="font-medium text-primary-400 hover:underline ps-1"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
