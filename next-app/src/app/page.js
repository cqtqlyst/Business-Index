"use client"

import Image from "next/image";
import Nav from "@/components/nav";
import logo from "../../public/logo.jpg";
import Head from "next/head";

export default function Home() {



  return (
    <div>
      <Head>
        <title>My Custom Page Title</title>
      </Head>
      <Nav/>
      <p className="flex justify-center text-7xl text-white py-20">What is Business Index?</p>
      <div className="flex justify-center items-center px-20">
        <p className="text-2xl text-white py-20 mr-8 text-center overflow-hidden" v-text="description">BusinessIndex is an innovative application designed for high schools and organizations across the nation, offering a simple to use platform to catalog and discover businesses that precisely meet their unique requirements.</p>
        <Image className="w-80 h-80 object-cover" src={logo}/>
      </div>
      <p className="flex justify-center text-7xl font-bold text-white py-20">Instructions</p>
      <p className="flex justify-center text-xl font-bold text-white py-10">For Search, type in the box and click enter to search for businesses.</p>
      <p className="flex justify-center text-xl font-bold text-white py-10">For Enter, make sure you fill out every field and hit submit. There will be an error thrown if you hit submit and all the fields are not filled out.</p>
      <p className="flex justify-center text-xl font-bold text-white py-10">For Login, make sure you have a verified email address; otherwise, you will not be able to login.</p>
    </div>
  );
}
