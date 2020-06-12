var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");


async function main() {
    console.log(`it is starting!`)
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
            message: "What is the table of contents?",
            name: "tableofContents"
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
            name: "liense"
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
    ])
}

var gitUsername = reponse.username;
var projectTitle = response.projectTitle;
var description = response.description;
var tableofContents = response.tablefoContents;
var installation = response.installation;
var usage = response.usage;
var license = response.license;
var contributor = response.contributing;
var test = response.test;


// fetching data from git

const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);

var gitData = gitResponse.data
var gitLogin = gitData.login;
var gitEmail = gitData.email;
var gitPictureURL = gitData.avatar_url;
var gitLocation = gitData.location;
var gitURL = gitData.html_url;

var contributorArray = contributor.split(",");
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
    var contributorResult = contributorResult + (`
    \n <img src="${conPicture}" alt="drawing" width="150" display="inline"/> 
    \n ${contributorUsername}
    \n Email: ${conEmail}  
    \n GitHubLink: ${conURL}`);
}

// .then (writeToFile())

// var gitUserName = userResponse.username ;
// var projectTitle = userResponse.projectTitle;
// var 



// function writeToFile(fileName, result) {
//     console.log(`Generating readme file.......`)
//     var fileName = "README.md"
//     fs.writeFile(fileName, result)
// }

main()
