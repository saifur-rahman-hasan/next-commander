import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export default class NextCommanderInit {
    constructor(config) {
        this.config = config;
        this.destinationPath = path.join(this.config.outputFilesDir, 'src', 'core');
    }

    async run() {
        try {
            const data = await this.fetchDataFromGitHub();

            if (Array.isArray(data)) {
                this.createDirectoryIfNotExists(this.destinationPath);
                await this.downloadAndSaveFiles(data);
            } else {
                console.error(`Error: Invalid data received from GitHub API: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    async fetchDataFromGitHub() {
        const apiUrl = this.config.inputFilesDir + '/core';
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch data from GitHub API: ${response.statusText}`);
        }

        return response.json();
    }

    async downloadAndSaveFiles(data) {
        for (const item of data) {
            if (item.type === 'file') {
                await this.downloadAndSaveFile(item.download_url, item.name);
                console.log(`Downloaded: ${item.name}`);
            }
        }
    }

    async downloadAndSaveFile(url, fileName) {
        if (!url || !fileName) {
            console.error(`Error: Invalid url or fileName`);
            return;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download file ${fileName}: ${response.statusText}`);
        }

        const content = await response.text();
        const filePath = path.join(this.destinationPath, fileName);

        try {
            fs.writeFileSync(filePath, content);
        } catch (error) {
            console.error(`Error writing file ${fileName}: ${error.message}`);
        }
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }
}
