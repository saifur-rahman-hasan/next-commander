#! /usr/bin/env node
import fs from 'fs';
import inquirer from 'inquirer';


class NextCommander {
  constructor() {
    this.cwd = process.cwd()
    this.configPath = this.cwd + '/next-commander.json',
    this.defaultConfig = {
      owner: "unknown",
      repo: "unknwon",
      access: "unknown",
      inputFilesDir: "https://api.github.com/repos/unknown/unknown/contents/unknown?access_token=unknown"
    };
  }

  async run() {
    try {
      if (!this.configFileExists()) {
        await this.collectGitHubInfo();
      } else {
        await this.updateConfig();
      }

      const userInfo = await this.collectUserInfo();
      const projectInfo = await this.collectProjectInfo();
      const moduleInfo = await this.collectModuleInfo();

      console.log("Hello World! This is the first program!");
      console.log("CWD: " + this.cwd);
    } catch (error) {
      console.error(error.message);
    }
  }

  configFileExists() {
    return fs.existsSync(this.configPath);
  }

  async readConfigFile() {
    try {
      const fileContent = await fs.promises.readFile(this.configPath, 'utf-8');
      const configObject = JSON.parse(fileContent);
      return configObject;
    } catch (error) {
      throw new Error(`Error reading configuration file: ${error.message}`);
    }
  }

  async collectGitHubInfo() {
    const githubInfoQuestions = [
      {
        type: 'input',
        name: 'owner',
        message: 'Enter your GitHub username:',
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Enter your GitHub repository:',
      },
      {
        type: 'input',
        name: 'access',
        message: 'Enter your GitHub access key:',
        default: null
      },
      {
        type: 'input',
        name: 'inputFilesDir',
        message: 'Enter your InputFiles directory path:',
        default: 'InputFiles'
      },
    ];

    try {
      const githubInfo = await inquirer.prompt(githubInfoQuestions);
      this.saveConfigFile(githubInfo);
    } catch (error) {
      throw new Error(`Error collecting GitHub information: ${error.message}`);
    }
  }

  saveConfigFile(data) {
    try {
      
      const {owner, repo, access, inputFilesDir} = data
      const inputFilesDirRepoLink = `https://api.github.com/repos/${owner}/${repo}/contents/${inputFilesDir}?access_token=${access}`

      const jsonData = {
        ...data, 
        inputFilesDir: inputFilesDirRepoLink
      }

      fs.writeFileSync(this.configPath, JSON.stringify(jsonData, null, 2));
      console.log(`Configuration saved to ${this.configPath}`);
    } catch (error) {
      throw new Error(`Error saving configuration file: ${error.message}`);
    }
  }

  async updateConfig() {
    try {
      const existingConfig = await this.readConfigFile();
      const missingKeys = Object.keys(this.defaultConfig).filter(key => !(key in existingConfig));
      console.log(`missingKeys`, missingKeys)

      if (missingKeys.length > 0) {
        console.log("The existing configuration is incomplete. Please provide the missing information:");

        await this.collectGitHubInfo();
      }
    } catch (error) {
      throw new Error(`Error updating configuration: ${error.message}`);
    }
  }

  async collectUserInfo() {
    // Implement this method to collect user information
  }

  async collectProjectInfo() {
    // Implement this method to collect project information
  }

  async collectModuleInfo() {
    // Implement this method to collect module information
  }
}


(async () => {

  const nextCommander = new NextCommander()
  await nextCommander.run()

})()



// const CWD = process.cwd()


// const commanderConfig = CWD + `/next-commander.json`
// const conmmaderConfigData = {}

// if (fs.existsSync(userDataPath)) {
//   // If the user data file exists, load it
//   userData = require(userDataPath);
// } else {}

// import inquirer from "inquirer";

// const prompt = inquirer.createPromptModule();

// const registreadCommands = {
//     "create-project": "./commands/CreateProject.mjs",
//     "init": "./commands/NextCommanderInit.mjs",
//     "make-module": "./commands/MakeModule.mjs",
//     "make-controller": "./commands/MakeController.mjs",
//     "make-model": "./commands/MakeModel/index.mjs",
//     "make-repository": "./commands/MakeRepository.mjs",
//     "make-interface": "./commands/MakeInterface.mjs",
//     "make-config": "./commands/MakeConfig.mjs",
//     "make-component": "./commands/MakeComponent/index.mjs",
//     "make-action": "./commands/MakeAction.mjs",
// }

// const commandChoiceOptions = Object.keys(registreadCommands);

//   (async () => {
//     const answer = await prompt([
//       {
//         type: 'list',
//         name: 'command',
//         message: 'Choose a command to run:',
//         choices: commandChoiceOptions,
//       },
//     ]);
  
//     const selectedCommand = answer.command;

//     try {

//       const commandModulePath = registreadCommands[selectedCommand];
//       const { default: CommandModule } = await import(commandModulePath);
//       const commandInstance = new CommandModule();

//       // Assuming the imported module has a run function
//       if (typeof commandInstance.run === 'function') {
//           await commandInstance.run();
//       } else {
//           console.error(`Error: The selected command module does not have a run function.`);
//       }
//     } catch (error) {
//         console.error(`Error importing the module for the selected command: ${error?.message}`);
//     }

//   })();