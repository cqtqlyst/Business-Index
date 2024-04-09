import {apiKey} from "../app/gemini.js"

export default function Business(props) {

    return (
        <div className="mb-8 ml-10 mr-10">
            <a href={"https://" + props.website} target="_blank" class="block max-w-sm p-6 bg-black border border-gray-200 rounded-lg shadow ">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{props.name}</h5>
                <p class="font-normal text-white dark:text-gray-400 py-2">The address is {props.address}.</p>
                <p class="font-normal text-white dark:text-gray-400 py-2">The email for contact is {props.email}.</p>
                <button> 
                    <a href="../../generated.pdf" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        download
                        className="text-xl rounded-full border border-white hover:bg-white hover:text-black px-4 py-2">
                        Generate Report
                    </a>
                </button>
            </a>
        </div>
    );
}