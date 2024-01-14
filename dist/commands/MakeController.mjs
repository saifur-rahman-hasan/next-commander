import fs from 'fs';
import path from 'path';
import inquirer from "inquirer";

export default class MakeController {
    constructor() {
        this.exampleFilePath = path.join(process.cwd(), 'dist', 'InputFiles', 'ExampleController.stub');
        this.modulesPath = path.join(process.cwd(), 'src', 'modules');
        this.moduleControllersPath = path.join(this.modulesPath);
    }

    async run() {
        const moduleName = await this.promptModuleName();

        if (!moduleName) {
            console.error("Error: Invalid module name");
            return;
        }

        const controllerName = await this.promptControllerName();

        if (!controllerName) {
            console.error("Error: Invalid controller name");
            return;
        }

        this.modulesPath = path.join(this.modulesPath, moduleName)
        this.moduleControllersPath = path.join(this.modulesPath, 'Controllers')

        const destinationPath = path.join(this.moduleControllersPath, `${controllerName}.ts`);

        try {
            const exampleContent = fs.readFileSync(this.exampleFilePath, 'utf-8');
            const controllerContent = exampleContent.replace(/ExampleController/g, controllerName);

            this.createDirectoryIfNotExists(path.join(this.moduleControllersPath));
            fs.writeFileSync(destinationPath, controllerContent);

            console.log(`Controller created successfully at: ${destinationPath}`);
        } catch (error) {
            console.error(`Error creating controller: ${error}`);
        }
    }

    async promptModuleName() {
        const availableModules = this.fetchAvailableModules();
        const moduleChoices = availableModules.map((module) => ({
            name: module,
            value: module,
        }));

        return inquirer.prompt([
            {
                type: 'list',
                name: 'moduleName',
                message: 'Choose a module:',
                choices: moduleChoices,
            },
        ]).then((answers) => answers.moduleName);
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
}
