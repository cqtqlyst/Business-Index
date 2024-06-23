"use client";

import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import logo from "../../public/logo.jpg";
import productImage from "../../public/images/placeholder.png";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Custom Page Title</title>
      </Head>
      <Nav />
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 text-center md:text-left px-10 py-10">
          <p className="text-5xl md:text-7xl font-black text-bright-purple">
            Discover. Collaborate. Develop. All in one package.
          </p>
        </div>
        <div className="md:w-1/2 px-10 py-10">
          <Image
            className="rounded-lg shadow-lg"
            src={productImage}
            alt="Product Image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}