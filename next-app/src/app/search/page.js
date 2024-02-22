"use client"

import React, { useState, useEffect } from 'react';
import {collection, getDocs, query} from "firebase/firestore";
import Nav from "@/components/nav";
import Business from "@/components/business";
import db from '../firebase';

export default function Home() {

    const [fetched, setFetched] = useState(false);
    const [allData, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
    function getData() {
        const data = query(collection(db, "businesses"));
        let results = [];

        if (allData == null && fetched == false) {
            setFetched(true);
            getDocs(data).then((dataSnapshot) => {
                dataSnapshot.forEach((doc) => {
                    results.push(doc.data());
                })
                setData(results);
            });
        }
        console.log(allData);
    }

    useEffect(() => {getData()});

    const handleSubmit = (event) => {

        // console.log(event);
        setSearchTerm(event.target.value);

        let filtered = allData.filter((item) => {

            // console.log("item.name " + item.Name);
            // console.log("search term " + searchTerm);

            return item.Name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredData(filtered);

        // console.log("filtered");
        // console.log(filteredData);
    };

    return (
        <div>
            <Nav/>
            <div className="flex justify-center py-10">
                <input 
                    className="bg-black font-mono text-5xl placeholder-gray-300 text-white w-1/2 text-center" 
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
                    name={item.Name} website={item.Website} email={item.Email} address={item.Address}/>
                ))}
            </div>
        </div>
    );

}