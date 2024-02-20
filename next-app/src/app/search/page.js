"use client"

import Nav from "@/components/nav";

export default function Home() {

    return (
        <div>
            <Nav/>
            <div className="flex justify-center py-10">
                <input 
                    className="bg-black font-mono text-5xl placeholder-gray-300 text-white w-1/2 text-center" 
                    placeholder="Enter key words to find your business.">
                </input>
            </div>
        </div>
    );

}