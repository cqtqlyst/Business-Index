"use client"

import React, { useState, useEffect, useRef } from 'react';
import {collection, getDocs, query} from "firebase/firestore";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Business from "@/components/business";
import db from '../firebase';
import Head from 'next/head';


export default function Home() {

    // react hooks for the different variables throughout the program
    const [fetched, setFetched] = useState(false);
    const [allData, setData] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const searchTermRef = useRef();
    
    // loads data into the allData variable
    function getData() {

        const data = query(collection(db, "businesses")); // get the collection of businesses
        let results = []; // is a variable for holding the results stuff

        // checks needed for not over querying the database with firebase
        if (allData == null && fetched == false) {

            // we have now started fetching the data
            setFetched(true);

            // use .then() to avoid issues with Promises
            getDocs(data).then((dataSnapshot) => {
                // push the documents that we have into the array allData
                dataSnapshot.forEach((doc) => {
                    results.push(doc.data());
                })
                setData(results); // sets the allData variable
            });
        }
    }

    useEffect(() => {getData()});

    // function for handling when the user enters a keyword to search for businesses
    const handleSubmit = (event) => {

        event.preventDefault();

        // update search term with the setSearchTerm react hook method
        // setSearchTerm(event.target.value);

        let filtered = [];

        if (allData != null) {
            // use the .filter() method & an inline function to search through and find the filtered data
            filtered = allData.filter((item) => {
                try {
                    return item.Name.toLowerCase().includes(event.target.value.toLowerCase());
                }
                catch {
                    console.log(item)
                    return false;
                }
            });
        }

        // updates the filtered data field
        setFilteredData(filtered);
    };

    function handleSearch(event) {

        event.preventDefault();

        let searchTerm = searchTermRef.current.value;

        let filtered = [];

        if (allData != null) {
            // use the .filter() method & an inline function to search through and find the filtered data
            filtered = allData.filter((item) => {
                try {
                    return item.Name.toLowerCase().includes(searchTerm.toLowerCase());
                }
                catch {
                    console.log(item)
                    return false;
                }
            });
        }

        // updates the filtered data field
        setFilteredData(filtered);

    };

    return (
        <div className="">
            <Nav/>
            <form className="max-w-2xl mx-auto py-10">
                <label class="mb-2 font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        class="block w-full p-4 ps-10 text-xl text-ivory border border-gray-500 rounded-lg bg-gray-700 focus:ring-4 focus:outline-none focus:ring-purple-900" placeholder="Search for businesses" 
                        ref={searchTermRef}
                        onKeyDown={(event) => {
                            if (event.key == "Enter") {
                                handleSubmit(event);
                            }
                        }}
                    />
                    <button class="text-ivory absolute end-2.5 bottom-2.5 bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-900 font-medium rounded-lg text-xl px-4 py-2 hover:bg-purple-700"
                        onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </form>
            <div className="flex flex-col flex-grow gap-y-24 justify-evenly container mx-auto py-20">
                {filteredData.map((item) => (
                    <Business
                        name={item.Name} website={item.Website} email={item.Email} 
                        address={item.Address} service={item.serviceOffered} legal={item.legalStructure}/>
                ))}
            </div>
            <div className="container py-40"></div>
            <Footer/>
        </div>
    );

}