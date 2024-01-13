#! /usr/bin/env node 
const CWD = process.cwd()

console.log("Hello World This is the first program!"); 
console.log("Here is the CWD: " + CWD)


import inquirer from "inquirer";

const prompt = inquirer.createPromptModule();

const registreadCommands = {
    "init": "./commands/NextCommanderInit.mjs",
    "make-module": "./commands/MakeModule.mjs",
    "make-controller": "/commands/MakeController.mjs",
    "make-model": "./commands/MakeModel.mjs",
    "make-repository": "./commands/MakeRepository.mjs",
    "make-interface": "./commands/MakeInterface.mjs",
    "make-config": "./commands/MakeConfig.mjs",
    "make-component": "./commands/MakeComponent.mjs",
    "make-action": "./commands/MakeAction.mjs",
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

      console.log(`commandInstance`);
      console.log(commandInstance);

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