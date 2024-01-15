import fs from 'fs';
import path from 'path';
import inquirer from "inquirer";
import { spawn } from 'child_process';


export default class CreateProjectCommand {
    constructor(config){
        this.config = config
        this.destinationPath = path.join(process.cwd(), this.config.outputFilesDir);
    }

    async run() {
        console.log(`####### Running Create Project Command`)
        
        const projects = await this.fetchAvailableProjects();
        const selectedProject = await this.promptUserToSelectProject(projects)

        console.log(`Preparing your project: ${selectedProject.name}`)

        const projectGithubLink = path.join(this.config.inputFilesDir, selectedProject?.path)

        try {
            const response = await fetch(projectGithubLink);
            const data = await response.json();

            console.log(`project data`, data)

            if (Array.isArray(data)) {
                this.createDirectoryIfNotExists(this.destinationPath);

                // for (const item of data) {
                //     if (item.type === 'file') {
                //         await this.downloadAndSaveFile(item.download_url, item.name, moduleDirName);
                //         console.log(`Downloaded: ${item.name}`);
                //     } else if (item.type === 'dir') {
                //         await this.copyDirectory(item.url, item.name, moduleDirName);
                //         console.log(`Copied directory: ${item.name}`);
                //     }
                // }
            } else {
                console.error(`Error fetching data for the selected project from GitHub API: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.log(error)
            console.error(`Error fetching data from GitHub API: ${error}`);
        }

        console.log(`####### Stopped Create Project Command`)
    }

    async promptUserToSelectProject(projects) {
        const selectedProjectAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedProject',
                message: 'Choose your project.',
                choices: projects,
            },
        ]).then(ans => {return ans.selectedProject})
        
        const selectedProject = projects.find(project => project.name === selectedProjectAnswer);

        // Check if the selected project exists
        if (selectedProject) {
            // Remove 'InputFiles/' from the path property
            selectedProject.path = selectedProject.path.replace('InputFiles/', '');
        }
        return selectedProject;

    }

    async fetchAvailableProjects() {
        try {
            const response = await fetch(`${this.config.inputFilesDir}/projects`);
            const data = await response.json();

            if (Array.isArray(data)) {
                return data.filter(project => {
                    return project.type === 'dir'
                });
            } else {
                console.error(`Error fetching project data from GitHub API: ${JSON.stringify(data)}`);
                return [];
            }
        } catch (error) {
            console.error(`Error fetching project data from GitHub API: ${error}`);
            return [];
        }
    }

    async promptProjectInfo(projects) {
        const projectChoices = projects.map((project) => ({
            name: project.name,
            value: project,
        }));

        return inquirer.prompt([
            {
                type: 'list',
                name: 'selectedProject',
                message: 'Choose a project:',
                choices: projectChoices,
            },
            {
                type: 'input',
                name: 'moduleDirName',
                message: 'Enter the directory name for the copied module in your project:',
                default: (answers) => answers.selectedProject.name,
                validate: (value) => value.trim() !== '',
            },
        ]);
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    async copyDirectory(url, dirName, parentModuleDirName) {
        const directoryPath = path.join(this.destinationPath, parentModuleDirName, dirName);
        this.createDirectoryIfNotExists(directoryPath);

        const dirApiUrl = `${url}?recursive=1`;

        try {
            const response = await fetch(dirApiUrl);
            const data = await response.json();

            for (const item of data.tree) {
                if (item.type === 'blob') {
                    await this.downloadAndSaveFile(item.url, item.path.replace(`${dirName}/`, ''));
                    console.log(`Copied file: ${item.path}`);
                } else if (item.type === 'tree') {
                    await this.copyDirectory(item.url, item.path, path.join(parentModuleDirName, dirName));
                }
            }
        } catch (error) {
            console.error(`Error copying directory ${dirName}: ${error}`);
        }
    }

    async downloadAndSaveFile(url, fileName) {
        if (!url || !fileName) {
            console.error(`Error: Invalid url or fileName`);
            return;
        }
    
        const response = await fetch(url);
        const content = await response.text();

        const filePath = path.join(this.destinationPath, fileName);
    
        try {
            fs.writeFileSync(filePath, content);
            console.log(`Downloaded: ${fileName}`);
        } catch (error) {
            console.error(`Error writing file ${fileName}: ${error}`);
        }
    }
}