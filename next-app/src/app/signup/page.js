"use client";

import React from "react";
import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase.js";
import { redirect } from "next/dist/server/api-utils";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Image from "next/image";
import logoremovebg from "../../../public/logoremovebg.png";

export default function Home() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const signup = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const confirmPassword = confirmPasswordRef.current.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        alert(`Successfully signup 
                redirecting to Log in page`);
        window.location.href = "./login/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  };
  return (
    <div>
      <Nav />
      <section className="bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image src={logoremovebg} class="w-8 h-8 mr-2" alt="Logoremovebg" />
            BusinessIndex
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={signup}>
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    What should we call you?
                  </label>
                  <input
                    type="text"
                    ref={nameRef}
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                    placeholder="John Smith"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    ref={emailRef}
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    ref={passwordRef}
                    placeholder="••••••••"
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    ref={confirmPasswordRef}
                    placeholder="••••••••"
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                    required=""
                  />
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-purple-600 ring-offset-gray-800 accent-purple-500"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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
