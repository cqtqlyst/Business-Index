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
      <p className="flex justify-center text-7xl font-bold text-white py-20">What is Business Index?</p>
      <div className="flex justify-center items-center px-20">
        <p className="text-2xl font-mono text-white py-20 mr-8 text-center overflow-hidden" v-text="description">BusinessIndex is an innovative application designed for high schools and organizations across the nation, offering a simple to use platform to catalog and discover businesses that precisely meet their unique requirements.</p>
        <Image className="w-80 h-80 object-cover" src={logo}/>
      </div>
    </div>
  );
}
