"use client"

import React, { useState, useEffect } from 'react';
import {collection, getDocs} from "firebase/firestore";
import Nav from "@/components/nav";
import Business from "@/components/business";
import db from '../firebase';

export default function Home() {

    let fetched = false;

    const [allData, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    function getData() {
        const data = collection(db, "businesses");
        let results = [];

        if (!fetched) {
            getDocs(data).then((dataSnapshot) => {
                dataSnapshot.forEach((doc) => {
                    results.push(doc.data());
                })
                setData(results);
                console.log(allData);
            });
            fetched = true;
        }
    }

    useEffect(() => {getData()});

    const handleSubmit = (event) => {
        setSearchTerm(event.target.value);

        // console.log("search term" + searchTerm);

        const filtered = allData.filter((item) => {
            console.log(item.name);
            console.log("search term" + searchTerm);
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredData(filtered);
        console.log("filtered");
        console.log(filteredData);
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
                {/* {filteredData.map((item) => (
                    <Business key={item.id} {...item} />
                ))} */}
            </div>
        </div>
    );

}