import fs from 'fs';
import path from 'path';
import inquirer from "inquirer";

export default class MakeRepository {
    constructor() {
        this.exampleFilePath = path.join(process.cwd(), 'InputFiles', 'ExampleRepository.stub');
        this.modulesPath = path.join(process.cwd(), 'src', 'modules');
        this.moduleRepositoriesPath = path.join(this.modulesPath);
    }

    async run() {
        const moduleName = await this.promptModuleName();

        if (!moduleName) {
            console.error("Error: Invalid module name");
            return;
        }

        const repositoryName = await this.promptRepositoryName();

        if (!repositoryName) {
            console.error("Error: Invalid repository name");
            return;
        }

        this.modulesPath = path.join(this.modulesPath, moduleName);
        this.moduleRepositoriesPath = path.join(this.modulesPath, 'Repositories');

        const destinationPath = path.join(this.moduleRepositoriesPath, `${repositoryName}.ts`);

        try {
            const exampleContent = fs.readFileSync(this.exampleFilePath, 'utf-8');
            const repositoryContent = exampleContent.replace(/ExampleRepository/g, repositoryName);

            this.createDirectoryIfNotExists(path.join(this.moduleRepositoriesPath));
            fs.writeFileSync(destinationPath, repositoryContent);

            console.log(`Repository created successfully at: ${destinationPath}`);
        } catch (error) {
            console.error(`Error creating repository: ${error}`);
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

    async promptRepositoryName() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'repositoryName',
                message: 'Enter the name for the new repository:',
                validate: (value) => value.trim() !== '',
                filter: (value) => this.normalizeRepositoryName(value),
            },
        ]).then((answers) => answers.repositoryName);
    }

    normalizeRepositoryName(input) {
        // Remove non-alphanumeric characters, capitalize first letter, and append "Repository"
        return input.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toUpperCase() + input.slice(1) + 'Repository';
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
