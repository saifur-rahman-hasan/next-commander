#! /usr/bin/env node 
const CWD = process.cwd()

console.log("Hello World This is the first program!"); 
console.log("Here is the CWD: " + CWD)


import inquirer from "inquirer";

const prompt = inquirer.createPromptModule();

(async () => {
    const answer = await prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter your age: '
        },
        {
            type: 'list',
            name: 'gender',
            message: 'What is your gender?',
            choices: ['Male', 'Female', 'Prefer not to say']
        }
    ]);

    console.log(`Your name is ${answer.name}, your age is ${answer.age}. Your gender is ${answer.gender}`);
})();
