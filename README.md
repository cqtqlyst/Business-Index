# BusinessIndex: CAP 23-24

This is the repository for the Homestead FBLA Coding and Programming project for the 2023-2024 school year. The team members are Aayush Gaywala (github username: cqtqlyst), Mihir Anantatheerta (github username: mihir-a), and Dan Iacob (github: MrBigBoss123). 

BusinessIndex is an innovative application designed for schools and organizations across the nation. It is a simple to use platform that allows users to catalog and discover businesses that meet their unique requirements. It is complete with a search feature for businesses, an enter feature for new businesses, an AI chatbot, and a fully done login/sign-up system. It aims to aid our Career and Technical Education Department for 

## Features

- **Search**: Search for businesses in the database.
- **Enter**: Enter a new business into BusinessIndex's database.
- **Help**: Ask an AI chatbot to help you with using the app.
- **Login/Sign-up**: Use the login/sign-up buttons to create a verified account.

## Installation Instructions

Clone the Repository: Use `git clone` followed by the repository URL to clone the project files to your local machine.
Open in Visual Studio Code: Launch in Visual Studio Code and open the next.js project folder.
Run the app with the following instructions:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Ensure you are in the next.js project folder (not the repository folder). First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Ensure you are using node.js version 18.17.0 or higher.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Lato, a custom Google Font.

## Certain Code Excerpts Explained

We just chose some code excerpts to explain below. You can read all of the code as it is generally well-commented and readable with standard programming conventions.

### Search Loading all the Data

```javascript
// loads data into the allData variable
function getData() {
  const data = query(collection(db, "businesses")); // get the collection of businesses
  let results = []; // is a variable for holding the results stuff

  // checks needed for not over querying the database with firebase
  if (allData == null && fetched == false) {
    // we have now started fetching the data
    setFetched(true);

    // use .then() to avoid issues with Promises
    getDocs(data).then((dataSnapshot) => {
      // push the documents that we have into the array allData
      dataSnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setData(results); // sets the allData variable
      setFilteredData(results); // sets initial data to all
    });
  }
}

useEffect(() => {
  getData();
});
```
This section loads the data into the allData variable and then subsequently loads it into the filteredData variable. This function runs once because of the useEffect hook and its empty dependency array. This means that the code will only run on the component mount.

### Image Upload

```javascript
// React hooks
const [file, setFile] = useState(null);

//Update the .webp file when the user selects a file
const handleFileChange = (e) => {
  if (e.target.files[0]) {
    setFile(e.target.files[0]);
  }
};
```
This section is linked to the image upload input in the jsx that is returned from the enter page. It uses a hook to handle the file upload.

### AI Chat Bot

```javascript
const handleSubmit = async (event) => {
  //Set the message to the input value and load the loading spinner
  setMessage(inputValue)
  event.preventDefault();
  setLoading(true);
  
  //Use the generative model to generate a response
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = "BusinessIndex is an innovative application designed for high schools and organizations across the nation, offering a simple to use platform to catalog and discover businesses that precisely meet their unique requirements. Some instructions about the app are for search, type in the box and click enter to search for businesses, for Enter, make sure you fill out every field and hit submit. There will be an error thrown if you hit submit and all the fields are not filled out, for Login, make sure you have a verified email address; otherwise, you will not be able to login. Write a reply to a person about the app BusinessIndex with the question " +
                  inputValue;
  setInputValue("");

  // Generate the response using the model with the prompt as the input
  const result = await model.generateContent(prompt);
  const response = result.response;
  
  //Filter and set the response to the correct variables
  let text = response.text();
  let ans = text.replaceAll("*", "");
  setResponse(ans);
  
  setLoading(false);
};
```
This section handles the submit of the users text prompt and then queries the gemini pro model to give the user a response. 

## Contribution Guidelines:
Our project is fully ready for outside contribution. If you're interested in contributing, please follow these guidelines:

```
Fork the Repository: Start by forking the project repository to your GitHub account.
Create a Feature Branch: Create a new branch for each feature or fix you're working on.
Commit Your Changes: Make your changes in your feature branch and commit them with clear, descriptive messages.
Submit a Pull Request: Once your changes are complete, submit a pull request to the main project for review.
Your contributions are greatly appreciated and will help make Solo Earnings an even better educational tool for everyone. 
```

## Copyright
We would like to state that all media used in our presentation follows copyright laws and falls under Educational Fair Use and Creative Commons 3.0. We would  like to acknowledge the usage of Next.js, Tailwind CSS, Firebase, and Flowbite components in the development of our project. We ensured that these tools were used in accordance with their respective terms of service and guidelines.
