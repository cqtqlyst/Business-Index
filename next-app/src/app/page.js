"use client";

import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import logo from "../../public/logo.jpg";
import productImage from "../../public/images/placeholder.png";
import Head from "next/head";

export default function Home() {

  function handleGetStarted(event) {

  }

  return (
    <div>
      {/* <Head>
        <title>My Custom Page Title</title>
      </Head> */}
      <Nav />
      <div className="flex">
        <div>
          <p className="justify-center text-7xl font-black text-bright-purple px-20 pt-20">Discover. Collaborate. Develop. All in one package.</p>
          <p className="justify-center text-3xl font-bold text-ivory px-20 pt-10">
            Every minute counts. Stop wasting time trying to connect your high school with local businesses. Effortlessly catalog and discover the businesses that you need. Streamline your search with our user-friendly app.
          </p>
          <button 
            type="button" 
            class="text-white mt-8 ml-20 bg-bright-purple hover:bg-meloncholy font-normal rounded-lg text-2xl px-5 py-2.5 me-2 mb-2 dark:bg-bright-purple dark:hover:bg-meloncholy">
            Get Started
          </button>

        </div>
        <div className="px-20 py-20">
          <Image 
            className="" 
            width={3000}
            src={productImage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}