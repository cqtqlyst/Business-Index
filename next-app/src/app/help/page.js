"use client"

import Nav from "../../components/nav";
import Footer from "@/components/footer";
import genAI from "../gemini";
import {useState} from 'react';


export default function Home() {

    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [message1, setmessage1] = useState("");

    const handleSubmit = async (event) => {
        setmessage1(inputValue)
        event.preventDefault();
        setLoading(true);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "BusinessIndex is an innovative application designed for high schools and organizations across the nation, offering a simple to use platform to catalog and discover businesses that precisely meet their unique requirements. Some instructions about the app are for search, type in the box and click enter to search for businesses, for Enter, make sure you fill out every field and hit submit. There will be an error thrown if you hit submit and all the fields are not filled out, for Login, make sure you have a verified email address; otherwise, you will not be able to login. Write a reply to a person about the app BusinessIndex with the question " +
                        inputValue;

        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();
        let ans = text.replaceAll("*", "");
        setResponse(ans);

        setLoading(false);
    };

    return (
        <div>
            <Nav/>
            <div className = "flex justify-center py-20">
                <div className="shadow-md rounded-lg max-w-lg w-full border border-whitex   ">
                    <div className="p-4 border-b text-white rounded-t-lg flex justify-between items-center">
                        <p className="text-lg font-semibold">AI Chat Help Bot</p>
                        {loading ? (
                        <div role="status" className="">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                ) : null}
                    </div>
                        { loading == true || response != ""  ? 
                        <div className="flex justify-end pt-10">
                            <div className="px-2 mb-2 pl-200">
                            <p className="bg-purple-700 text-white rounded-lg py-2 px-4 inline-block">{message1}</p>
                        </div>
                    </div> : null}    
                    
                        {response != "" ? (<div id="chatbox" className="p-4 h-80 overflow-y-auto">
                            
                            <div className="flex justify-start">
                                <div className="px-2 mb-2 pl-200 pr-12">
                                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{response}</p>
                                </div>
                            </div>
                        </div>) : 
                        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                        
                    </div>}
                    
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
                            className=" text-white px-4 py-2 rounded-r-md hover:bg-gray-500 transition duration-300 border border-white"
                            onClick = {handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
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