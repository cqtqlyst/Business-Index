"use client"

import Nav from "../../components/nav";
import genAI from "../gemini";
import {useState} from 'react';


export default function Home() {

    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState("");

    const handleSubmit = async (event) => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Write a reply to a person about the app with the question " +
                        inputValue;

        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();
        let ans = text.replaceAll("*", "");
        setResponse(ans);
    };

    return (
        <div>
            <Nav/>
            <div className = "flex justify-center py-20">
                <div className="shadow-md rounded-lg max-w-lg w-full border border-white">
                    <div className="p-4 border-b text-white rounded-t-lg flex justify-between items-center">
                        <p className="text-lg font-semibold">AI Chat Help Bot</p>
                    </div>
                        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                            <div className="mb-2">
                                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{response}</p>
                            </div>
                        </div>
                    <div className="p-4 border-t flex">
                        <input 
                            type="text" 
                            placeholder="Type a message" 
                            className="w-full px-3 py-2 border rounded-l-md focus:outline-none text-black"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                        <button 
                            id="send-button" 
                            className=" text-white px-4 py-2 rounded-r-md hover:bg-gray-500 transition duration-300"
                            onClick = {handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );

    // return (
    //     <div>
    //         <Nav/>
    //         <p className="flex justify-center text-xl font-bold text-white py-20">For Search, type in the box and click enter to search for businesses.</p>
    //         <p className="flex justify-center text-xl font-bold text-white py-20">For Enter, make sure you fill out every field and hit submit. There will be an error thrown if you hit submit and all the fields are not filled out.</p>
    //         <p className="flex justify-center text-xl font-bold text-white py-20">For Login, make sure you have a verified email address; otherwise, you will not be able to login.</p>
    //         <p className="flex justify-center text-xl font-bold text-white py-20">For any other questions/errors, contact BusinessIndex@gmail.com for all questions.</p>
    //     </div>
    // );
}