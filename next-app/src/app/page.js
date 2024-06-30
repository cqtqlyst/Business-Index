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
import bloom from "../../public/images/BloomInstitute.png";
import seromed from "../../public/images/SeroMed.png";
import tac from "../../public/images/TAC.png";
import enter from "../../public/images/enter.png";

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
      <div className="mt-4 py-14">
        <h5 class="text-4xl font-bold text-ivory text-center">Join the following organizations who use BusinessIndex</h5>
        <div className="mt-10 flex items-center justify-center gap-10">
          <Image className="rounded-lg" src={bloom} height={100}/>
          <Image className="rounded-lg" src={seromed} height={100}/>
          <Image className="rounded-lg" src={tac} height={100}/>
        </div>
      </div>
      {/* search section */}
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
            width={650}
            src={searchImage}
          />
        </div>
      </div>
      {/* enter section */}
      <div className="flex px-16 py-40">
        <div className="justify-start pl-5">
            <Image
              className=""
              width={400}
              src={enter}
            />
        </div>
        <div className="justify-end ml-72">
          <p className="text-ivory font-bold text-4xl py-5">Enter businesses</p>
          <div className="flex justify-end pt-5">
            <p className="text-6xl text-regular-purple font-extrabold py-5">
              Update the database with new businesses
            </p>
          </div>
          <ul className="space-y-8 text-left text-gray-500 dark:text-gray-400 text-2xl py-5 ml-10">
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Required.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Answer the required fields to add a business to the database.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Optional.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Fill out optional fields to add more data to the database.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd"/>
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Images.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Add images to the database by uploading .webp's.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"/>
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Submit.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Submit the form and use search to see the business in the database.
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Backup.{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  The database will automatically be backed up with the new business.
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
