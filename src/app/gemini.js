import { GoogleGenerativeAI } from "@google/generative-ai";

// replace with your own api keys or message the authors of the BusinessIndex repository for the .env file
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export default genAI;