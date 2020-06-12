const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

async function main() {
    var response = await inquirer
    .prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your project title?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "Please provide a brief description of your project",
            name: "description"
        },
        {
            type: "input",
            message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
            name: "installation"
        },
        {
            type: "input",
            message: "Please provide instructions for use.",
            name: "usage"
        },
        {
            type:"input",
            message: "What is the name of license?",
            name: "license"
        },
        {
            type: "input",
            message: "please enter git hub user names of the contributor if any (If there are mulitple contributor, seperate names with comma and no space! )",
            name: "contributing"
        },
        {
            type: "input",
            message: "How to run tests? Please provide some examples.",
            name: "test"
        }
    ]);
    console.log("---------here is the data---------")
    console.log(response);
    var gitUsername = response.username;
    var projectTitle = response.projectTitle;
    var description = response.description;
    var installation = response.installation;
    var usage = response.usage;
    var licenseGit = response.license;
    var contributor = response.contributing;
    var test = response.test;

    //fetching data from git
    const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);

    var gitData = gitResponse.data
    var gitLogin = gitData.login;
    var gitEmail = gitData.email;
    var gitPictureURL = gitData.avatar_url;
    var gitLocation = gitData.location;
    var gitURL = gitData.html_url;

    //.split(",") separates each items in the array.
    var contributorArray = contributor.split(',');
    console.log(`------contributor's array------`)
    console.log(contributorArray);

    var contributorResult;

    for (i=0; i<contributorArray.length; i++) {
        var contributorUsername = contributorArray[i];
        const conGitResponse = await axios.get(`https://api.github.com/users/${contributorUsername}`);
        var conData = conGitResponse.data;
        var conPicture = conData.avatar_url;
        var conURL = conData.html_url;
        var conLogin = conData.login;
        var conEmail = conData.email;
        var contributorResult = (`
        \n![ProfileImage](${conPicture})
        \nGitHub Username: ${conLogin}
        \nEmail: ${conEmail}  
        \nGitHubLink: ${conURL}
        `);
    }


    //result that will be putting in README.md
    var result = (
    `# ${projectTitle}
    \n## Description
    \n${description}

    \n## Table of Contents
    \n* [Installation](#installation)
    \n* [Usage](#usage)
    \n* [Tests](#tests)
    \n* [Credits](#credits)
    \n* [Author](#author)
    \n* [License](#license)
    
    \n## Installation
    \n${installation}

    \n## Usage
    \n${usage}

    \n## Tests
    \n${test}

    \n## Credits
    \nThis project was contributed by:
    \n${contributorResult}

    \n## Author
    \n![ProfileImage](${gitPictureURL})
    \nUsername: ${gitLogin}
    \nEmail: ${gitEmail}
    \nLocation: ${gitLocation}
    \nGitHub site: ${gitURL}
    
    \n## License
    \nThis project is licensed under the ${licenseGit}.`);

    fs.writeFile('README.md', result, writeComplete);
};

function writeComplete( err, data ){
    if( err ){
        console.log( `Sorry something went wrong.` )
        return;
    }

    console.log( `Finished Writing file.` )
}

main()
