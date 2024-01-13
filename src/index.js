#! /usr/bin/env node 
const CWD = process.cwd();
console.log("Hello World This is the first program!");
console.log("Here is the CWD: " + CWD);
import inquirer from "inquirer";
const prompt = inquirer.createPromptModule();
const registreadCommands = {
    "init": "./dist/commands/NextCommanderInit.mjs",
    "make-module": "./dist/commands/MakeModule.mjs",
    "make-controller": "./dist/commands/MakeController.mjs",
    "make-model": "./dist/commands/MakeModel.mjs",
    "make-repository": "./dist/commands/MakeRepository.mjs",
    "make-interface": "./dist/commands/MakeInterface.mjs",
    "make-config": "./dist/commands/MakeConfig.mjs",
    "make-component": "./dist/commands/MakeComponent.mjs",
    "make-action": "./dist/commands/MakeAction.mjs",
};
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
        const commandModule = await import(registreadCommands[selectedCommand]);
        // Assuming the imported module has a run function
        if (commandModule.run) {
            await commandModule.run();
        }
        else {
            console.error(`Error: The selected command module does not have a run function.`);
        }
    }
    catch (error) {
        console.error(`Error importing the module for the selected command: ${error?.message}`);
    }
})();
