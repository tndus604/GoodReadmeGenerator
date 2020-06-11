var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");


async function main() {
    console.log(`it is starting!`)
    var userResponse = await inquirer
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
            type: "input",
            message: "please enter git hub user names of the contributor if any (If there are mulitple contributor, seperate names with comma and no space! )",
            name: "contributorsGitUserName"
        },
    ])
    console.log(userResponse)
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
