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
            class="text-white mt-8 mb-20 ml-20 bg-bright-purple hover:bg-meloncholy font-normal rounded-lg text-2xl px-5 py-2.5 me-2 dark:bg-bright-purple dark:hover:bg-meloncholy">
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
      <div className="flex bg-meloncholy px-10 py-20">
        <div>
          <p className="text-ivory font-bold text-4xl py-5">
            Search for businesses
          </p>
          <p className="text-6xl text-regular-purple font-extrabold py-5">
            Personalized businesses right at your fingertips
          </p>
        </div>
        <div className="pl-20">
          <Image
            width={400}
            src={searchImage}
          />
        </div>

      </div>
      <Footer />
    </div>
  );
}