"use client"

import Image from "next/image";
import Nav from "@/components/nav";
import logo from "../../public/logo.jpg";
import productImage from "../../public/images/placeholder.png";
import Head from "next/head";

export default function Home() {



  return (
    <div>
      <Head>
        <title>My Custom Page Title</title>
      </Head>
      <Nav/>
      <div className="flex">
        <div>
          <p className="justify-center text-7xl font-black text-bright-purple px-20 py-20">Discover. Collaborate. Develop. All in one package.</p>
        </div>
        <div className="px-20 py-20">
          <Image className="" src={productImage}/>
        </div>
      </div>
    </div>
  );
}
