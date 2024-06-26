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
          <ul class="space-y-8 text-left text-gray-500 dark:text-gray-400 text-2xl py-5 ml-10">
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
              <span class="font-semibold text-gray-900 dark:text-white">Keywords. <span class="font-medium text-gray-500 dark:text-gray-400">Use keywords to search for businesses that serve your needs.</span></span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <span class="font-semibold text-gray-900 dark:text-white">Learn. <span class="font-medium text-gray-500 dark:text-gray-400">Read the intuitive card to learn more about the said business.</span></span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"/>
              </svg>
              <span class="font-semibold text-gray-900 dark:text-white">Contact. <span class="font-medium text-gray-500 dark:text-gray-400">Email the business through the contact option on the business card.</span></span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
              </svg>
              <span class="font-semibold text-gray-900 dark:text-white">Reports. <span class="font-medium text-gray-500 dark:text-gray-400">Generate full-length report descriptions with statistics and data.</span></span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
              </svg>
              <span class="font-semibold text-gray-900 dark:text-white">Website. <span class="font-medium text-gray-500 dark:text-gray-400">Visit the company's website.</span></span>
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