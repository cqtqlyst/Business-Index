"use client"

import React, { useState, useEffect } from 'react';
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
    const [searchTerm, setSearchTerm] = useState("");

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

    // useEffect(() => {getData()}); this was the code pre ai
    useEffect(() => {
        getData();
    }, []);

    // function for handling when the user enters a keyword to search for businesses
    useEffect(() => {
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
    }, [searchTerm, allData]);

    return (
        <div>
            <Nav/>
            <div className="flex justify-center py-10">
                <div className="block max-w-2xl p-6 bg-black border border-gray-200 rounded-lg shadow">
                    <input 
                        className="bg-black font-mono text-5xl placeholder-gray-300 text-white w-3/4 text-center outline-none" 
                        placeholder="Enter key words to find your business."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    >
                    </input>
                </div>
            </div>
            <div className="justify-center container mx-auto flex flex-wrap py-20">
                {filteredData.map((item) => (
                    <Business
                        // key={item.Name} // Assuming Name is unique, otherwise use a unique identifier(ai told me to add this line of code and idk if we need it/>
                        name={item.Name} website={item.Website} email={item.Email} 
                        address={item.Address} service={item.serviceOffered} legal={item.legalStructure}/>
                ))}
            </div>
            <Footer/>
        </div>
    );

}