"use client"

import React, { useState, useEffect } from 'react';
import {collection, getDocs, query} from "firebase/firestore";
import Nav from "@/components/nav";
import Business from "@/components/business";
import db from '../firebase';
import Head from 'next/head';

export default function Home() {

    // react hooks for the different variables throughout the program
    const [fetched, setFetched] = useState(false);
    const [allData, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
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

        // update search term with the setSearchTerm react hook method
        setSearchTerm(event.target.value);

        let filtered = [];

        if (allData != null) {
            // use the .filter() method & an inline function to search through and find the filtered data
            filtered = allData.filter((item) => {
                return item.Name.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        // updates the filtered data field
        setFilteredData(filtered);
    };

    // let text = "hello \n goodbye";
    // console.log(text);
    // let newText = text.replaceAll(/\n/g, "");
    // console.log(newText);

    return (
        <div>
            <Head>
                <title>My Custom Page Title</title>
            </Head>
            <Nav/>
            <div className="flex justify-center py-10">
                <input 
                    className="bg-black font-mono text-5xl placeholder-gray-300 text-white w-3/4 text-center" 
                    placeholder="Enter key words to find your business."
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSubmit(event);
                        }
                    }}>
                </input>
            </div>
            <div className="justify-center container mx-auto flex flex-wrap py-20">
                {filteredData.map((item) => (
                    <Business
                    name={item.Name} website={item.Website} email={item.Email} 
                    address={item.Address} service={item.serviceOffered} legal={item.legalStructure}/>
                ))}
            </div>
        </div>
    );

}