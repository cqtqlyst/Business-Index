import genAI from "../app/gemini.js";
import jsPDF from 'jspdf';
import { useState } from "react";

export default function Business(props) {

    const [loading, setLoading] = useState(false);

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


    return (
        <div className="mb-8 ml-10 mr-10">
            <div className="block max-w-sm p-6 bg-black border border-gray-200 rounded-lg shadow">
                <a href={"https://" + props.website} target="_blank">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{props.name}</h5>
                    <p className="font-normal text-white dark:text-gray-400 py-2">The address is {props.address}.</p>
                    <p className="font-normal text-white dark:text-gray-400 py-2">The email for an individual at {props.name} is {props.email}.</p>
                    <p className="font-normal text-white dark:text-gray-400 py-2">The service is {props.service}.</p>
                    <p className="font-normal text-white dark:text-gray-400 py-2">To learn more about the website go to the business' website at {props.website}.</p>
                </a>
                <button
                        onClick={handleClick}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl rounded-full border text-ivory border-white hover:bg-white hover:text-black px-4 py-2 mt-5"> 
                        Generate Report
                </button>
                {loading ? (
                    <div role="status" className="mt-4">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                ) : null}
                <div className="flex py-5 text-ivory"> 
                    <input
                        type="checkbox"
                        className="lg"
                    />
                    <p className="ml-4 text-xl">Include Reviews Data?</p>
                </div>
                <div className="flex py-5 text-ivory"> 
                    <input
                        type="checkbox"
                        className="lg"
                    />
                    <p className="ml-4 text-xl">Include Sales Data?</p>
                </div>
                <div className="flex py-5 text-ivory"> 
                    <input
                        type="checkbox"
                        className="lg"
                    />
                    <p className="ml-4 text-xl">Include Revenue Data?</p>
                </div>
                
            </div>
        </div>


        // <a href="../../generated.pdf" 
        // target="_blank"
        // rel="noopener noreferrer" 
        // download
        // className="text-xl rounded-full border border-white hover:bg-white hover:text-black px-4 py-2">
        // Generate Report
        // </a>
    );
}