import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { downloadAndSaveFile } from './BaseCommand.mjs';

export default class MakeController {
    constructor(config) {
        this.config = config
        this.exampleFileUrl = path.join(this.config.inputFilesDir, 'ExampleController.ts')
        this.modulesPath = path.join(process.cwd(), this.config.outputFilesDir, 'src', 'modules');
        this.moduleControllersPath = path.join(process.cwd(), this.modulesPath);
    }

    directoryExists(directoryPath) {
        return fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory();
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!directoryExists(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    async run() {

        this.createDirectoryIfNotExists(this.modulesPath)

        const moduleName = await this.promptModuleName();

        if (!moduleName) {
            console.error('Error: Invalid module name');
            return;
        }

        const controllerName = await this.promptControllerName();

        if (!controllerName) {
            console.error('Error: Invalid controller name');
            return;
        }

        this.modulesPath = path.join(this.modulesPath, moduleName);
        this.moduleControllersPath = path.join(this.modulesPath, 'Controllers');

        const destinationPath = path.join(this.moduleControllersPath, `${controllerName}.ts`);

        try {
            await downloadAndSaveFile(this.exampleFileUrl, destinationPath, controllerName)

            console.log(`Controller created successfully at: ${destinationPath}`);
        } catch (error) {
            console.log(error)
            console.error(`Error creating controller: ${error}`);
        }
    }

    async promptModuleName() {
        try {
            console.log(`promptModuleName:`)
            const availableModules = this.fetchAvailableModules();
            console.log(`availableModules`, availableModules)

            if(!availableModules?.length > 0){
                const moduleName = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'moduleName',
                        message: 'Enter the name for the new module:',
                        validate: (value) => value.trim() !== '',
                    },
                ]).then(ans => ans.moduleName)

                this.moduleControllersPath = path.join(this.modulesPath, moduleName, 'Controllers')

                this.createDirectoryIfNotExists(this.moduleControllersPath)
                
                this.promptModuleName()
            }


            const moduleChoices = availableModules.map((module) => ({
                name: module,
                value: module,
            }));
        
            if(moduleChoices?.length > 0){
                return await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'moduleName',
                        message: 'Choose a module:',
                        choices: moduleChoices,
                    },
                ]).then((answers) => answers.moduleName);
            }

        } catch (error) {
            console.log(`error`, error)
        }
    }

    async promptControllerName() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'controllerName',
                message: 'Enter the name for the new controller:',
                validate: (value) => value.trim() !== '',
                filter: (value) => this.normalizeControllerName(value),
            },
        ]).then((answers) => answers.controllerName);
    }

    normalizeControllerName(input) {
        // Remove non-alphanumeric characters, capitalize first letter, and append "Controller"
        return input.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toUpperCase() + input.slice(1) + 'Controller';
    }

    fetchAvailableModules() {
        try {
            const moduleDirectories = fs.readdirSync(this.modulesPath, { withFileTypes: true })
                .filter((dir) => dir.isDirectory())
                .map((dir) => dir.name);

            return moduleDirectories;
        } catch (error) {
            console.error(`Error fetching module data: ${error}`);
            return [];
        }
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    async fetchExampleFile() {
        try {
            const response = await fetch(this.exampleFileUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch example file. Status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.log(error)
            throw new Error(`Error fetching example file: ${error.message}`);
        }
    }
}
