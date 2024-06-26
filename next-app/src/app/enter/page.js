"use client"

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Head from "next/head";
import {collection, addDoc} from "firebase/firestore";
import db from '../firebase';
import backupData from '../backup';
import { checkAuthState } from '../auth';
import { useEffect, useState } from 'react';

export default function Home() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        const user = await checkAuthState();
        setUser(user);
        };
        fetchUser();
    }, []);
    
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
                    <form id="myForm" className="max-w-sm mx-auto border border-gray-300 rounded-lg shadow-lg p-8">
                        <div class="mb-5">
                            <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Name</label>
                            <input 
                                type="text" 
                                // placeholder="Business Name" required 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <div class="mb-5">
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input 
                                type="address" 
                                placeholder="1234 First Ave. New York, NY" required 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <div class="mb-5">
                            <label for="Service" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service</label>
                            <input 
                                type="text" 
                                // placeholder="What Services Does Your Business Offer" required 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <div class="mb-5">
                            <label for="Legal Structure" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Legal Structure</label>
                            <input 
                                type="text" 
                                // placeholder="Enter what legal structure the business has" required 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <div class="mb-5">
                            <label for="NAICS Code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NAICS Code</label>
                            <input 
                                type="text" 
                                // placeholder="Enter what NAICS code the business falls under" required 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <div class="mb-5">
                            <label for="EmployeeCount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number Of Employees</label>
                            <input 
                                type="text" 
                                // placeholder="Enter the number of employees the business has"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <div class="mb-5">
                            <label for="WebsiteLink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website Link</label>
                            <input 
                                type="url" 
                                placeholder="https://WebsiteLink.com" required 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@company.com" required 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit} >Submit</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}