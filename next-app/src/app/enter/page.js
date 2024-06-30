"use client";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import backupData from "../backup";
import { checkAuthState } from "../auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import logoremovebg from "../../../public/logoremovebg.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let form = document.getElementById("myForm");
    let inputs = form.getElementsByTagName("input");
    let empty = false;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        empty = true;
      }
    }
    if (empty == true) {
      alert(
        "You are missing multiple fields to enter a business into the database!"
      );
      return;
    }

    let email = inputs[2].value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("You have entered an invalid email address!");
      return;
    }
    let descriptionValue = document.getElementById("description-area").value

    let business = {
      Name: inputs[0].value,
      Description: descriptionValue,
      Website: inputs[1].value,
      Email: inputs[2].value,
      Address: inputs[3].value,
      revenue: inputs[4].value,
      serviceOffered: inputs[5].value,
      legalStructure: inputs[6].value,
      NAICS: inputs[7].value,
      numEmployees: inputs[8].value,
      yearsinbusiness: inputs[9].value,
      contact_name: inputs[10].value,
      contact_email: inputs[11].value,
      review: inputs[12].value,
      review_num: inputs[13].value,
    };

    for (const key in business) {
      if (!business[key]) {
        delete business[key];
      }
    }

    const nDoc = await addDoc(collection(db, "businesses"), business);
    console.log("Document written with ID: ", nDoc.id);

    if (file != null) {
      const fname = inputs[0].value.replace(/\s+/g, "").toLowerCase() + ".webp";
      console.log(fname);
      const storageRef = ref(storage, `${fname}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress, if needed
        },
        (error) => {
          // Handle error
          console.error("Upload error:", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
    }

    alert("You have successfully entered a business into the database!");
    form.reset();

    backupData();
    //window.location.href = "/enter";
  };

  return (
    <div>
      <Nav />
      <section class="">
        <div className="flex flex-col items-center px-6 mb-12 first-letter:mx-auto lg:py-0 py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image src={logoremovebg} class="w-8 h-8 mr-2" alt="Logoremovebg" />
            BusinessIndex
          </a>
          <div className="w-full overflow-scroll overflow-x-visible custom-bar bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Enter a business
              </h1>
              <form id="myForm" className="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="Name"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <div class="mb-6">
                  <label
                    for="large-input"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description-area"
                    rows="6"
                    class="resize-none shadow-sm overflow-hidden bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full placeholder-gray-400"
                  />
                </div>

                <div className="mb-5">
                  <label
                    for="WebsiteLink"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Website Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://websitelink.com"
                    required
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <div className="mb-5">
                  <label
                    for="email"
                    class="block mb-1 text-sm font-medium text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    required
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <div className="mb-5">
                  <label
                    for="address"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Address
                  </label>
                  <input
                    type="address"
                    placeholder="1234 First Ave. New York, NY"
                    required
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <div className="mb-5">
                  <label
                    for="revenue"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Revenue
                  </label>
                  <input
                    type="number"
                    className="remove-arrow shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="Service"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Service
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="Legal Structure"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Legal Structure
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="NAICS Code"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    NAICS Code
                  </label>
                  <input
                    type="number"
                    className="remove-arrow shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="EmployeeCount"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Number Of Employees
                  </label>
                  <input
                    type="number"
                    className="remove-arrow shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <div className="mb-5">
                  <label
                    for="years"
                    class="block mb-1 text-sm font-medium text-white"
                  >
                    Years in business
                  </label>
                  <input
                    type="number"
                    required
                    className="mb-5 remove-arrow shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <label
                  for="CEO"
                  className="text-md font-bold leading-tight tracking-tight md:text-md text-white mt-5"
                >
                  CEO/President/Head of Operations
                </label>

                <div className="mb-5">
                  <label
                    for="contactName"
                    class="block mb-1 text-sm font-medium text-white"
                  >
                    Contact name
                  </label>
                  <input
                    type="text"
                    required
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="contactEmail"
                    class="block mb-1 text-sm font-medium text-white"
                  >
                    Contact email
                  </label>
                  <input
                    type="text"
                    required
                    className="mb-5 shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <label
                  for="Reviews"
                  className=" text-md font-bold leading-tight tracking-tight md:text-md text-white"
                >
                  Reviews
                </label>

                <div className="mb-5">
                  <label
                    for="numberOfStars"
                    class="block mb-1 text-sm font-medium text-white"
                  >
                    Number of stars
                  </label>
                  <input
                    type="text"
                    required
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="numberOfReviews"
                    class="block mb-1 text-sm font-medium text-white"
                  >
                    Number of reviews
                  </label>
                  <input
                    type="text"
                    required
                    className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
                  />
                </div>

                <label
                  for="upload"
                  className="block mb-2 text-sm font-medium text-white"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Upload a WebP image:
                </label>
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  accept="image/webp"
                  required
                  className="file:rounded-md text-gray-400 text-sm rounded-sm focus:outline-none -mt-2"
                  style={{ marginTop: "0rem" }}
                  onChange={handleFileChange}
                ></input>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
