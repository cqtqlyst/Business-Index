"use-client"

import Nav from "../../components/nav";
import Head from "next/head";

export default function Home() {

    return (
        <div>
            <Nav/>
            <p className="flex justify-center text-xl font-bold text-white py-20">For Search, type in the box and click enter to search for businesses.</p>
            <p className="flex justify-center text-xl font-bold text-white py-20">For Enter, make sure you fill out every field and hit submit. There will be an error thrown if you hit submit and all the fields are not filled out.</p>
            <p className="flex justify-center text-xl font-bold text-white py-20">For Login, make sure you have a verified email address; otherwise, you will not be able to login.</p>
            <p className="flex justify-center text-xl font-bold text-white py-20">For any other questions/errors, contact BusinessIndex@gmail.com for all questions.</p>
        </div>
    );
}