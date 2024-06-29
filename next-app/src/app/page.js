"use client";

import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import logo from "../../public/logo.jpg";
import productImage from "../../public/images/primary.png";
import searchImage from "../../public/images/search.png";
import stanfordlogo from "../../public/images/stanfordlogo.png";
import harvardlogo from "../../public/images/harvardlogo.png";
import usclogo from "../../public/images/usclogo.png";
import uclalogo from "../../public/images/uclalogo.png";

export default function Home() {
  function handleGetStarted(event) {
    event.preventDefault();

    window.location.href = "/login";
  }

  return (
    <div>
      <Nav />
      <div className="flex">
        <div>
          <p className="justify-center text-6xl font-black text-bright-purple px-20 pt-20">
            Discover. Collaborate. Develop. All in one package.
          </p>
          <p className="justify-center text-3xl font-bold text-ivory px-20 pt-10">
            Every minute counts. Stop wasting time trying to connect your high
            school with local businesses. Effortlessly catalog and discover the
            businesses that you need. Streamline your search with our
            user-friendly app.
          </p>
          <button
            onClick={handleGetStarted}
            type="button"
            class="text-white mt-8 mb-20 ml-20 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xl px-5 py-2.5 me-2"
          >
            Get Started
          </button>
        </div>
        <div className="pr-20 py-20">
          <Image className="" width={2250} src={productImage} />
        </div>
      </div>

      <h3 class="mb-4 font-semibold text-gray-900 dark:text-white text-xl">
        Join some of the world's leading acedemics using BusinessIndex
      </h3>
      <ul className="items-center w-96 text-sm font-medium text-gray-900 rounded-lg sm:flex">
        <li className="w-full">
          <div className="flex items-center ps-3">
            <Image
              src={stanfordlogo}
              class="w-32 h-32 mr-2"
              alt="stanfordlogo"
            />
          </div>
        </li>
        <li className="w-full">
          <div className="flex items-center ps-3">
            <Image src={harvardlogo} class="w-24 h-24 mr-2" alt="harvardlogo" />
          </div>
        </li>
        <li className="w-full">
          <div className="flex items-center ps-3">
            <Image src={usclogo} class="w-48 h-24 mr-2" alt="usclogo" />
          </div>
        </li>
        <li className="w-full">
          <div className="flex items-center ps-3">
            <Image src={uclalogo} class="w-24 h-24 mr-2" alt="uclalogo" />
          </div>
        </li>
      </ul>

      <div className="flex px-16 py-40 flex-wrap">
        <div>
          <p className="text-ivory font-bold text-4xl py-5">
            Search for businesses
          </p>
          <p className="text-6xl text-regular-purple font-extrabold py-5">
            The right businesses at your fingertips
          </p>
          <ul className="space-y-8 text-left text-gray-500 dark:text-gray-400 text-2xl py-5 ml-10">
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Keywords.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Use keywords to search for businesses that serve your needs.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Learn.{" "}
                <span class="font-medium text-gray-500 dark:text-gray-400">
                  Read the intuitive card to learn more about the said business.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Contact.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Email the business through the contact option on the business
                  card.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Reports.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Generate full-length report descriptions with statistics and
                  data.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Website.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Visit the company's website.
                </span>
              </span>
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

      <div className="flex px-16 py-40 flex-wrap justify-end">
        <div>
          <p className="text-ivory font-bold text-4xl py-5">Enter businesses</p>
          <div className="flex justify-end pt-10">
            <p className="text-6xl text-regular-purple font-extrabold py-5">
              Unlock limitless possibilities with every new business you enter.
            </p>
          </div>
          <div className="flex-grow pl-5">
            <Image
              className="justify-start float-left"
              width={400}
              src={searchImage}
            />
          </div>
          <ul className="space-y-8 text-left text-gray-500 dark:text-gray-400 text-2xl py-5 ml-10">
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Keywords.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Use keywords to search for businesses that serve your needs.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Learn.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Read the intuitive card to learn more about the said business.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Contact.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Email the business through the contact option on the business
                  card.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Reports.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Generate full-length report descriptions with statistics and
                  data.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Website.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Visit the company's website.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
