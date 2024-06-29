"use client";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import stroage from "../firebase"
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

    let email = inputs[7].value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("You have entered an invalid email address!");
      return;
    }

    let business = {
      Address: inputs[1].value,
      Email: inputs[7].value,
      legalStructure: inputs[3].value,
      NAICS: inputs[4].value,
      Name: inputs[0].value,
      numEmployees: inputs[5].value,
      serviceOffered: inputs[2].value,
      Website: inputs[6].value,
    };

    const nDoc = await addDoc(collection(db, "businesses"), business);
    console.log("Document written with ID: ", nDoc.id);

    if (file != null) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploading(true);

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
    window.location.href = "/enter";
  };

  return (
    <div>
      <Nav />
      <section className="bg-black py-24">
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
                <div class="mb-5">
                  <label
                    for="Service"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Service
                  </label>
                  <input
                    type="text"
                    // placeholder="What Services Does Your Business Offer" required
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
                    // placeholder="Enter what legal structure the business has" required
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
                    // placeholder="Enter what NAICS code the business falls under" required
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
                    // placeholder="Enter the number of employees the business has"
                    className="remove-arrow shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 placeholder-gray-400"
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
        <div className="py-10"></div>
      </section>
      <Footer />
    </div>
  );
}
