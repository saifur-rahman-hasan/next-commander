import fs from 'fs';
import path from 'path';
import inquirer from "inquirer";
import CommanderContracts from './CommanderContracts.mjs';

export default class CreateProject extends CommanderContracts {
    constructor(){
        super()

        this.destinationPath = path.join(process.cwd(), 'projects');
    }

    async run() {

        const pathInRepo = 'dist/InputFiles/projects';
        const apiUrl = this.repositoryContentLink + pathInRepo;

        const projects = await this.fetchAvailableProjects(apiUrl);
        const projectInfo = await this.promptUser(projects);


        const { 
            name: projectName, 
            path: projectPath, 
            moduleDirName 
        } = projectInfo;

        const apiUrlForSelectedProject = `${this.repositoryContentLink}${projectPath}`;

        try {
            const response = await fetch(apiUrlForSelectedProject);
            const data = await response.json();

            if (Array.isArray(data)) {
                this.createDirectoryIfNotExists(this.destinationPath);

                for (const item of data) {
                    if (item.type === 'file') {
                        await this.downloadAndSaveFile(item.download_url, item.name, moduleDirName);
                        console.log(`Downloaded: ${item.name}`);
                    } else if (item.type === 'dir') {
                        await this.copyDirectory(item.url, item.name, moduleDirName);
                        console.log(`Copied directory: ${item.name}`);
                    }
                }
            } else {
                console.error(`Error fetching data for the selected project from GitHub API: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error(`Error fetching data from GitHub API: ${error}`);
        }
    }

    async fetchAvailableProjects() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (Array.isArray(data)) {
                return data.map(project => ({
                    name: project.name,
                    path: project.path,
                }));
            } else {
                console.error(`Error fetching project data from GitHub API: ${JSON.stringify(data)}`);
                return [];
            }
        } catch (error) {
            console.error(`Error fetching project data from GitHub API: ${error}`);
            return [];
        }
    }

    async promptProjectInfo() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'project',
                message: 'Select Project Template:',
                validate: (value) => value.trim() !== '',
            }
        ]);
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    async copyDirectory(url, dirName) {
        const directoryPath = path.join(this.destinationPath, dirName);
        this.createDirectoryIfNotExists(directoryPath);

        const dirApiUrl = `${url}?recursive=1`;

        try {
            const response = await fetch(dirApiUrl);
            const data = await response.json();

            for (const item of data.tree) {
                if (item.type === 'blob') {
                    await this.downloadAndSaveFile(item.url, item.path.replace(`${dirName}/`, ''));
                    console.log(`Copied file: ${item.path}`);
                }
            }
        } catch (error) {
            console.error(`Error copying directory ${dirName}: ${error}`);
        }
    }

    async downloadAndSaveFile(url, fileName, moduleDirName) {
        if (!url || !fileName) {
            console.error(`Error: Invalid url or fileName`);
            return;
        }
    
        const response = await fetch(url);
        const content = await response.text();
    
        const filePath = path.join(this.destinationPath, moduleDirName, fileName);
    
        try {
            fs.writeFileSync(filePath, content);
            console.log(`Downloaded: ${fileName}`);
        } catch (error) {
            console.error(`Error writing file ${fileName}: ${error}`);
        }
    }
}