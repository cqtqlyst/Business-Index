"use client"

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Head from "next/head";
import {collection, addDoc} from "firebase/firestore";
import db from '../firebase';
import backupData from '../backup';

export default function Home() {
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        let form = document.getElementById('myForm');
        let inputs = form.getElementsByTagName('input');
        let empty = false;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == '') {
                empty = true;
            };
        }
        if (empty == true) {
            alert('You are missing multiple fields to enter a business into the database!');
            return
        }

        let email = inputs[7].value;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('You have entered an invalid email address!');
            return
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
        alert('You have successfully entered a business into the database!');
        form.reset();       

        backupData();
    };
    
    return (
        <div>
            <Nav/>
            <div>
                <div className="container mx-auto py-10">
                    <form id="myForm" className="bg-black rounded-lg shadow-lg p-8 text-white font-mono">
                        <div className="flex flex-wrap gap-4 justify-center">
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter the name of the business."
                                className="input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter the address of the business."
                                className="input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter what services the business offers."
                                className="input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter what legal structure the business has."
                                className="input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter what NAICS code the business falls under."
                                className="input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter the number of employees the business has."
                                className="input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter the website link of the business."
                                className="input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                            <input
                                type="text"
                                name="fieldName1"
                                placeholder="Enter the email for the business' individual."
                                className="overflow-wrap: break-words resize-none input input-bordered bg-black w-full max-w-md placeholder-white text-center focus:outline-white min-h-[80px] py-20"
                            />
                        </div>
                        <button type="submit" className="flex justify-center w-64 py-20 text-5xl btn btn-primary mt-4 mx-auto rounded-full bg-black text-white font-mono" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );

}