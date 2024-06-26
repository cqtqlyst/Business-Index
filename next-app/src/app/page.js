"use client";

import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import logo from "../../public/logo.jpg";
import productImage from "../../public/images/primary.png";
import searchImage from "../../public/images/search.png";

export default function Home() {

  function handleGetStarted(event) {
    event.preventDefault();

    window.location.href = "/login";
  }

  return (
    <div>
      {/* <Head>
        <title>My Custom Page Title</title>
      </Head> */}
      <Nav />
      <div className="flex">
        <div>
          <p className="justify-center text-6xl font-black text-bright-purple px-20 pt-20">Discover. Collaborate. Develop. All in one package.</p>
          <p className="justify-center text-3xl font-normal text-ivory px-20 pt-10">
            Every minute counts. Stop wasting time trying to connect your high school with local businesses. Effortlessly catalog and discover the businesses that you need. Streamline your search with our user-friendly app.
          </p>
          <button 
            onClick={handleGetStarted}
            type="button" 
            class="text-white mt-8 mb-20 ml-20 bg-bright-purple hover:bg-purple-500 font-normal rounded-lg text-2xl px-5 py-2.5 me-2">
            Get Started
          </button>
        </div>
        <div className="pr-20 py-20">
          <Image 
            className="" 
            width={2250}
            src={productImage}
          />
        </div>
      </div>
      <div className="flex px-16 py-40 flex-wrap">
        <div>
          <p className="text-ivory font-bold text-4xl py-5">
            Search for businesses
          </p>
          <p className="text-6xl text-regular-purple font-extrabold py-5">
            The right businesses at your fingertips
          </p>
          <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
                <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                <span>Individual configuration</span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
                <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                <span>No setup, or hidden fees</span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
                <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                <span>Team size: <span class="font-semibold text-gray-900 dark:text-white">1 developer</span></span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
                <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                <span>Premium support: <span class="font-semibold text-gray-900 dark:text-white">6 months</span></span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
                <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                <span>Free updates: <span class="font-semibold text-gray-900 dark:text-white">6 months</span></span>
            </li>
          </ul>
        </div>
        <div className="flex-grow pr-5">
          <Image
            className="justify-end float-right"
            width={400}
            src={searchImage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}