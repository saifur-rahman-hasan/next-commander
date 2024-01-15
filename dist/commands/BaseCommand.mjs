import fs from 'fs'
const owner = 'saifur-rahman-hasan';
const repo = 'next-commander';
import path from 'path';

export default class BaseCommand {
    repositoryContentLink = `https://api.github.com/repos/${owner}/${repo}/contents/InputFiles`
}

export async function readJsonFile(filePath) {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        const jsonObject = JSON.parse(fileContent);
        return jsonObject;
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error.message}`);
    }
}

export async function getConfig() {
    return await readJsonFile('./next-commander.json')
}
  

export function directoryExists(directoryPath) {
    return fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory();
}

export function createDirectoryIfNotExists(directoryPath) {
    if (!directoryExists(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

export async function downloadAndSaveFile(url, destinationPath, fileName) {
    if (!url || !fileName) {
        console.error(`Error: Invalid url or fileName`);
        return;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to download file ${fileName}: ${response.statusText}`);
    }

    const content = await response.text();
    const filePath = path.join(destinationPath, fileName);

    try {
        fs.writeFileSync(filePath, content);
    } catch (error) {
        console.error(`Error writing file ${fileName}: ${error.message}`);
    }
}