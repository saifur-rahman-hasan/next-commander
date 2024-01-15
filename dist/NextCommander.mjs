import fs from 'fs'
import inquirer from "inquirer";
import path from 'path';

const DEFAULT_REGISTREAD_COMMANDS = {
    "create-project": "./commands/CreateProjectCommand.mjs",
    "init": "./commands/NextCommanderInit.mjs",
    "make-module": "./commands/MakeModuleCommand.mjs",
    "make-controller": "./commands/MakeController.mjs",
    "make-model": "./commands/MakeModel/index.mjs",
    "make-repository": "./commands/MakeRepository.mjs",
    "make-interface": "./commands/MakeInterface.mjs",
    "make-config": "./commands/MakeConfig.mjs",
    "make-component": "./commands/MakeComponent/index.mjs",
    "make-action": "./commands/MakeAction.mjs",
}

const DEFAULT_CONFIG = {
    owner: "$1",
    repo: "$2",
    access: "$3",
    inputFilesDir: "https://api.github.com/repos/$1/$2/contents/$4",
	outputFilesDir: "$5"
}

export default class NextCommander {
    constructor() {
      this.cwd = process.cwd()
      this.configPath = this.cwd + '/next-commander.json',
      this.config = DEFAULT_CONFIG;
      
      this.registreadCommands = DEFAULT_REGISTREAD_COMMANDS
      this.commandChoiceOptions = Object.keys(this.registreadCommands);
    }

    async run() {
      try {
        this.config = await this.getConfig()

		console.log('Loading your commands...')
        const selectedCommand = await this.promptUserToSelectCommand()

        try {

            const commandModulePath = this.registreadCommands[selectedCommand];
            const { default: CommandModule } = await import(commandModulePath);
            const commandInstance = new CommandModule(this.config);
			
			console.log(`Preparing the selected Command Instance...`)

            // Assuming the imported module has a run function
            if (typeof commandInstance.run === 'function') {
                await commandInstance.run();
            } else {
                console.error(`Error: The selected command module does not have a run function.`);
            }
        } catch (error) {
            console.error(`Error importing the module for the selected command: ${error?.message}`);
        }
        
      } catch (error) {
        console.error(error.message);
      }
    }

	async promptUserToSelectCommand() {
		const selectedCommandAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'command',
                message: 'Choose a command to run:',
                choices: this.commandChoiceOptions,
            },
        ]);

        return selectedCommandAnswer.command;
	}

    async getConfig() {
      const configData = !this.configFileExists()
        ? await this.confirmConfigData()
        : await this.updateConfig();
		
		if(!configData){
			throw new Error("Config Data is not properly ready")
		}

        return configData;
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
  
    async confirmConfigData() {
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
		{
			type: 'input',
			name: 'outputFilesDir',
			message: 'Enter your InputFiles directory path:',
			default: 'OutputFiles'
		},
      ];
  
      try {
        const githubInfo = await inquirer.prompt(githubInfoQuestions);
        return this.saveConfigFile(githubInfo);
      } catch (error) {
        throw new Error(`Error collecting GitHub information: ${error.message}`);
      }
    }
  
    saveConfigFile(data) {
      try {
        
        const {owner, repo, access, inputFilesDir, outputFilesDir} = data
        const inputFilesDirRepoLink = `https://api.github.com/repos/${owner}/${repo}/contents/${inputFilesDir}`
  
        const jsonData = {
          ...data, 
          inputFilesDir: inputFilesDirRepoLink,
		  outputFilesDir: `./${outputFilesDir}`
        }
  
        fs.writeFileSync(this.configPath, JSON.stringify(jsonData, null, 2));
        console.log(`Configuration saved to ${this.configPath}`);

        return jsonData
      } catch (error) {
        throw new Error(`Error saving configuration file: ${error.message}`);
      }
    }
  
    async updateConfig() {
      try {
        const existingConfig = await this.readConfigFile();
        const missingKeys = Object.keys(this.config).filter(key => !(key in existingConfig));

        if (missingKeys.length > 0) {
			console.log("The existing configuration is incomplete. Please provide the missing information:");
			console.log('missingKeys', missingKeys)
			return await this.confirmConfigData()
        }else{
            return existingConfig
        }
      } catch (error) {
        throw new Error(`Error updating configuration: ${error.message}`);
      }
    }
  
	async handleMissingKeys(missingKeys) {
		console.log('Found some missing keys in config. Help us to fix it.')

		const missingKeysAnswers = await missingKeys.map(async (missingKey) => {
			const missingKeyAnswer = await inquirer.prompt([
				{
					type: 'input',
					name: `${missingKey}`,
					message: `Enter the ${missingKey} key:`,
				},
			]);

			return {missingKey: missingKeyAnswer[missingKey]}
		});

		console.log(`missingKeysAnswers`, missingKeysAnswers)
	}

    async collectUserInfo() {
        
      // Implement this method to collect user information
    }
  
    async collectProjectInfo() {
        console.log('Implement this method to collect project information')
      // Implement this method to collect project information
    }
  
    async collectModuleInfo() {
        console.log('Implement this method to collect module information')
      // Implement this method to collect module information
    }
  }