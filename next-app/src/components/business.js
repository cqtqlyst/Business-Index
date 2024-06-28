import genAI from "../app/gemini.js";
import jsPDF from 'jspdf';
import Image from "next/image";

import { useState, useEffect } from "react";
import { storage } from "@/app/firebase.js";
import { ref, getDownloadURL } from "firebase/storage";

import placeholder from "../../public/images/business.png";

export default function Business(props) {

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("about");
    const [image, setImage] = useState([]);
    const [errorWithImage, setErrorWithImage] = useState(false);

    useEffect(() => {
        const downloadName = props.name;
        const link = (downloadName.replaceAll(" ", "")).toLowerCase();
        const linkWithoutDashes = (link.replaceAll("-", "")).toLowerCase();
        const linkWithoutPeriods = linkWithoutDashes.replaceAll(".", "") + ".webp";
        console.log(linkWithoutPeriods);

        try {
            getDownloadURL(ref(storage, linkWithoutPeriods))
                .then((url) => {
                setImage(url);
                })
                .catch((error) => {
                    console.error("Error fetching download URL:", error);
                    // Handle the error here (e.g., display an error message, set a default image)
                    
                    setErrorWithImage(true);

                });
        } catch (error) {
            console.error("Error constructing download link:", error);
            // Handle errors during link creation (e.g., log the error)

            setErrorWithImage(true);
        }

    }, []);

    const handleClick =  async () => {
        setLoading(true);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Write a short report about a business with the following information: "
                        + "Name: " + props.name 
                        + " Services offered: " + props.service
                        + " Legal Structure: " + props.legal 
                        + "\n include statistics";
                        // + "\n The report must be in be written in html and able to be compiled as an html document which includes tags arond everything";
        // console.log(prompt);

        const { totalTokens } = await model.countTokens(prompt);
      
        const result = await model.generateContent(prompt);
        const response = result.response;
        var text = response.text();
        console.log(text);

        var res = text.replaceAll("*", "");
        // console.log(res);

        const doc = new jsPDF();
        const width = 80; // Adjust the width as needed for your content
        const lines = splitLines(res, width);
        let y = 10; // Initial y-coordinate for text placement
        let x = 5;
        let pageHeight = doc.internal.pageSize.getHeight(); // Get page height
        // console.log("page height " + pageHeight);

        console.log(lines);

        for (const line of lines) {
            // Check if line would go off the current page
            if (y > pageHeight) {
                doc.addPage(); // Add a new page if needed
                y = 10; // Reset y-coordinate for new page
            }
            doc.text(line, x, y); // Add a horizontal margin of 5
            y += 10; // Increase y-coordinate for each line
        }
        doc.save("report.pdf");

        setLoading(false);
        // html2pdf
        // const text = "<h1> hello </h1>";
        // html2pdf(text);
        // doc.save("report.pdf");

        // jsPDF stuff
        // const doc = new jsPDF();
        // doc.text(text, 5, 10);
        // doc.save("report.pdf");

    }

    function splitLines(text, maxWidth) {

        const lines = text.split(/\n/g);
        // console.log(lines);

        const updatedLines = [];

        for (let line of lines) {
            
            if (line != "") {

                // console.log(line);
                const words = line.split(" ");
                // console.log(words);
                let startLine = "";
                
                for (let word of words) {
                    const newLine = startLine + word + " ";

                    if (newLine.length > maxWidth) {
                        updatedLines.push(startLine);
                        startLine = word + " ";
                    } else {
                        startLine = newLine;
                    }
                }

                updatedLines.push(startLine);
            }
            updatedLines.push("");
        }

        return updatedLines;

        // const lines = [];
        // let line = "";
        // const words = text.split(" ");
      
        // for (let word of words) {

        //     const newLine = line + word + " ";
        //     if (newLine.length > maxWidth || word.indexOf("\n") != -1) {
        //         let finalizedLine = line.replaceAll(/\n/g, "");
        //         lines.push(finalizedLine);
        //         line = word + " ";
        //     } else {
        //         line = newLine;
        //     }
        // }
        // lines.push(line);
        // return lines;
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    return (        
        <div className="flex bg-gray-800 border border-gray-500 rounded-lg">
            { errorWithImage ? 
            <Image className="w-400 h-300" src={placeholder} width={400} height={300} alt="an image"/> :
            <img className="w-400 h-300" src={image} width={400} height={300} alt="an image"/>
            }
            <div class="w-full rounded-lg shadow border-r border-t border-b border-gray-500">
                <ul class="flex flex-wrap text-lg font-normal text-center text-gray-400 border-b border-gray-500 rounded-t-lg" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                    <li class="me-2"> 
                        <button onClick={() => handleTabChange("about")} id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected={activeTab === 'about'} 
                        className={activeTab === "about" ? "inline-block p-4 text-purple-500 rounded-ss-lg hover:bg-gray-700" : "inline-block p-4 rounded-ss-lg hover:bg-gray-700"}>About</button>
                    </li>
                    <li class="me-2">
                        <button onClick={() => handleTabChange("services")} id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected={activeTab === 'services'} 
                        className={activeTab === "services" ? "inline-block p-4 text-purple-500 rounded-ss-lg hover:bg-gray-700" : "inline-block p-4 rounded-ss-lg hover:bg-gray-700"}>Services</button>
                    </li>
                    <li class="me-2">
                        <button onClick={() => handleTabChange("facts")} id="statistics-tab" data-tabs-target="#statistics" type="button" role="tab" aria-controls="statistics" aria-selected={activeTab === 'facts'} 
                        className={activeTab === "facts" ? "inline-block p-4 text-purple-500 rounded-ss-lg hover:bg-gray-700" : "inline-block p-4 rounded-ss-lg hover:bg-gray-700"}>Facts</button>
                    </li>
                    <li class="me-2">
                        <button onClick={() => handleTabChange("reports")} id="reports-tab" data-tabs-target="#about" type="button" role="tab" 
                        className={activeTab === "reports" ? "inline-block p-4 text-purple-500 rounded-ss-lg hover:bg-gray-700" : "inline-block p-4 rounded-ss-lg hover:bg-gray-700"}>Generate Reports</button>
                    </li>
                    <li class="me-2">
                        <button onClick={() => handleTabChange("contact")} id="reports-tab" data-tabs-target="#about" type="button" role="tab" 
                        className={activeTab === "contact" ? "inline-block p-4 text-purple-500 rounded-ss-lg hover:bg-gray-700" : "inline-block p-4 rounded-ss-lg hover:bg-gray-700"}>Contact</button>
                    </li>
                </ul>
                <div id="defaultTabContent">
                    <div class={activeTab === "about" ? "p-4 rounded-lg md:p-8" : "hidden"} id="about" role="tabpanel" aria-labelledby="about-tab">
                        <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{props.name}</h2>
                        {/* reviews stuff */}
                        <div class="flex items-center mb-2">
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            {props.review > 3.5 ? 
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            : 
                                <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            }
                            {props.review > 4.5 ? 
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            : 
                                <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            }
                            <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{props.review} out of 5.</p>
                        </div>
                        <p class="mb-3 text-gray-500 dark:text-gray-400 text-lg">{props.description}</p>
                        <a href={"https://" + props.website} class="inline-flex items-center font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700">
                            Visit their website
                            <svg class=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </a>
                    </div>
                    <div class={activeTab === "services" ? "p-4 rounded-lg md:p-8" : "hidden"} id="services" role="tabpanel" aria-labelledby="services-tab">
                        <h2 class="text-lg py-3 font-medium tracking-tight text-gray-400">The services offered are {props.service}.</h2>
                        <h2 class="text-lg py-3 font-medium tracking-tight text-gray-400">The NAICS (North American Industry Classification System) code is {props.NAICS}. An NAICS code identifies a business's primary economic activity. Visit https://www.naics.com/ for the exact sector.</h2>
                    </div>
                    <div class={activeTab === "facts" ? "p-4 rounded-lg md:p-8" : "hidden"} id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
                        {/* reviews stuff */}
                        <div class="flex items-center">
                            <p class="text-lg font-medium text-gray-500 dark:text-gray-400">This company has been rated {props.review} out of 5.</p>
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        <h2 class="text-lg py-3 font-medium tracking-tight text-gray-400">The type of company/organization is {props.legal}.</h2>
                        {/* numbers stuff */}
                        <dl class="grid max-w-screen-xl grid-cols-2 gap-12 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8 text-center">
                            <div class="flex flex-col">
                                <dt class="mb-2 text-3xl font-extrabold">{props.numEmployees}</dt>
                                <dd class="text-gray-500 dark:text-gray-400">Employees</dd>
                            </div>
                            <div class="flex flex-col">
                                <dt class="mb-2 text-3xl font-extrabold">${props.revenue}</dt>
                                <dd class="text-gray-500 dark:text-gray-400">in Revenue Generated</dd>
                            </div>
                            <div class="flex flex-col">
                                <dt class="mb-2 text-3xl font-extrabold justify-center">{props.years}</dt>
                                <dd class="text-gray-500 dark:text-gray-400">Years in Business</dd>
                            </div>
                        </dl>
                    </div>
                    <div class={activeTab === "reports" ? "p-4 rounded-lg md:p-8" : "hidden"} id="services" role="tabpanel" aria-labelledby="services-tab">
                        <div class="flex items-start my-2.5 bg-gray-600 rounded-xl p-2 w-72">
                            <div class="me-2">
                                <span class="flex items-center gap-2 text-normal font-medium text-gray-900 dark:text-white pb-2">
                                    <svg fill="none" aria-hidden="true" class="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                                        <g clip-path="url(#clip0_3173_1381)">
                                            <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                                            <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                                            <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                                            <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"/>
                                            <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"/>
                                            <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3173_1381">
                                            <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    {props.name} Report
                                </span>
                                <span class="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                                    12 Pages 
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                        <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                                    </svg>
                                    18 MB 
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                        <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                                    </svg>
                                    PDF
                                </span>
                            </div>
                            <div class="inline-flex self-center items-center">
                                <button class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" 
                                    onClick={handleClick}
                                    type="button">
                                    <svg class="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {loading ? (
                            <div role="status" className="mt-4">
                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        ) : null}      
                    </div>
                    <div class={activeTab === "contact" ? "p-4 rounded-lg md:p-8" : "hidden"} id="services" role="tabpanel" aria-labelledby="services-tab">
                        <section class="">
                            <div class="py-2 px-2 mx-auto">
                                <form action="#" class="space-y-2">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                        <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
                                    </div>
                                    <div>
                                        <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                        <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your message</label>
                                        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                                    </div>
                                    <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-purple-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">Send message</button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

        // <div className="mb-8 ml-10 mr-10">
        //     <div className="block max-w-sm p-6 bg-black border border-gray-200 rounded-lg shadow">
        //         <a href={"https://" + props.website} target="_blank">
        //             <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{props.name}</h5>
        //             <p className="font-normal text-white dark:text-gray-400 py-2">The address is {props.address}.</p>
        //             <p className="font-normal text-white dark:text-gray-400 py-2">The email for an individual at {props.name} is {props.email}.</p>
        //             <p className="font-normal text-white dark:text-gray-400 py-2">The service is {props.service}.</p>
        //             <p className="font-normal text-white dark:text-gray-400 py-2">To learn more about the website go to the business' website at {props.website}.</p>
        //         </a>
        //         <button
        //                 onClick={handleClick}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 className="text-xl rounded-full border text-ivory border-white hover:bg-white hover:text-black px-4 py-2 mt-5"> 
        //                 Generate Report
        //         </button>
        //         {loading ? (
        //             <div role="status" className="mt-4">
        //                 <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        //                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        //                 </svg>
        //                 <span class="sr-only">Loading...</span>
        //             </div>
        //         ) : null}
        //         <div className="flex py-5 text-ivory"> 
        //             <input
        //                 type="checkbox"
        //                 className="lg"
        //             />
        //             <p className="ml-4 text-xl">Include Reviews Data?</p>
        //         </div>
        //         <div className="flex py-5 text-ivory"> 
        //             <input
        //                 type="checkbox"
        //                 className="lg"
        //             />
        //             <p className="ml-4 text-xl">Include Sales Data?</p>
        //         </div>
        //         <div className="flex py-5 text-ivory"> 
        //             <input
        //                 type="checkbox"
        //                 className="lg"
        //             />
        //             <p className="ml-4 text-xl">Include Revenue Data?</p>
        //         </div>
                
        //     </div>
        // </div>
    );

        // <a href="../../generated.pdf" 
        // target="_blank"
        // rel="noopener noreferrer" 
        // download
        // className="text-xl rounded-full border border-white hover:bg-white hover:text-black px-4 py-2">
        // Generate Report
        // </a>
}