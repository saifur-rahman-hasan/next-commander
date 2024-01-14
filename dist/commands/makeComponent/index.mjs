#! /usr/bin/env node 
const CWD = process.cwd()

console.log("Hello World This is the first program!"); 
console.log("Here is the CWD: " + CWD)


import inquirer from "inquirer";

const prompt = inquirer.createPromptModule();

const registreadCommands = {
    "LandingPage": "./makeComponent/MakeComponent.mjs",
    "Button": "./makeComponent/ButtonComponent.mjs",
    "NavBar": "/makeComponent/MakeComponent.mjs",
    "Dialog": "./makeComponent/MakeComponent.mjs",
}

const commandChoiceOptions = Object.keys(registreadCommands);

  (async () => {
    const answer = await prompt([
      {
        type: 'list',
        name: 'command',
        message: 'Choose a command to run:',
        choices: commandChoiceOptions,
      },
    ]);
  
    const selectedCommand = answer.command;

    try {

      const commandModulePath = registreadCommands[selectedCommand];
      const { default: CommandModule } = await import(commandModulePath);
      const commandInstance = new CommandModule();

      // Assuming the imported module has a run function
      if (typeof commandInstance.run === 'function') {
          await commandInstance.run();
      } else {
          console.error(`Error: The selected command module does not have a run function.`);
      }
    } catch (error) {
        console.error(`Error importing the module for the selected command: ${error?.message}`);
    }

  })();






















import fs from 'fs';
import path from 'path';

export default class MakeComponent {
    constructor(){
        this.destinationPath = path.join(process.cwd(), 'src', 'core');
    }

    async run() {
        const owner = 'saifur-rahman-hasan';
        const repo = 'next-commander';
        const pathInRepo = 'dist/InputFiles/core';

        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathInRepo}`;

        try {
            const response = await fetch(apiUrl);``
            const data = await response.json();
            
            
            if (Array.isArray(data)) {
                this.createDirectoryIfNotExists(this.destinationPath);

                for (const item of data) {
                    if (item.type === 'file') {
                        await this.downloadAndSaveFile(item.download_url, item.name);
                        console.log(`Downloaded: ${item.name}`);
                    }
                }
            } else {
                console.error(`Error fetching data from GitHub API: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error(`Error fetching data from GitHub API: ${error}`);
        }
    }

    async downloadAndSaveFile(url, fileName) {
        if (!url || !fileName) {
            console.error(`Error: Invalid url or fileName`);
            return;
        }

        const response = await fetch(url);
        const content = await response.text();

        // const filePath = path.join(process.cwd(), 'src', 'core', fileName);
        const newFileName = `${path.basename(fileName, path.extname(fileName))}.ts`;
        const filePath = path.join(this.destinationPath, newFileName);

        try {
            fs.writeFileSync(filePath, content);
        } catch (error) {
            console.error(`Error writing file ${fileName}: ${error}`);
        }
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }
}