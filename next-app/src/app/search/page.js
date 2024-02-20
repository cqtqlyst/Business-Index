"use client"

import React, { useState, useEffect } from 'react';
import {collection, getDocs} from "firebase/firestore";
import Nav from "@/components/nav";
import Business from "@/components/business";
import db from '../firebase';

export default function Home() {

    const data = getData();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSubmit = (event) => {
        setSearchTerm(event.target.value);
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <Nav/>
            <div className="flex justify-center py-10">
                <input 
                    className="bg-black font-mono text-5xl placeholder-gray-300 text-white w-1/2 text-center" 
                    placeholder="Enter key words to find your business."
                    onSubmit={handleSubmit}>
                </input>
                {/* {filteredData.map((item) => (
                    <Business key={item.id} {...item} />
                ))} */}
            </div>
        </div>
    );

}
   
async function getData() {

    const data = await collection(db, 'businesses');
    const docs = getDocs(data);
    
    console.log(docs);

    // const dataDocs = docs.map((doc) => doc.data);

    // console.log(dataDocs[0].name);

    return [];

}