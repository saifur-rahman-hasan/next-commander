import fs from 'fs';
import path from 'path';

export default class MakeModel {
    constructor(){
        this.destinationPath = path.join(process.cwd(), 'src', 'modules', 'model');
    }

    async run(modelName) {

        const owner = 'saifur-rahman-hasan';
        const repo = 'next-commander';
        const pathInRepo = 'dist/InputFiles';
        
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathInRepo}`;
        
        try {

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (Array.isArray(data)) {
                this.createDirectoryIfNotExists(this.destinationPath);

                for (const item of data) {
                    if (item.type === 'file') {
                        if (item.name == "ExampleModel.stub" ){
                            await this.downloadAndSaveFile(item.download_url, item.name, modelName);
                            console.log(`Downloaded: ${item.name}`);
                        }
                    }
                }
            } else {
                console.error(`Error fetching data from GitHub API: ${JSON.stringify(data)}`);
            }
        }catch(error){
            console.log(error.message||error);
        }
    }

    async downloadAndSaveFile(url, fileName, modelName) {
        if (!url || !fileName) {
            console.error(`Error: Invalid url or fileName`);
            return;
        }

        const response = await fetch(url);
        const content = await response.text();
        
        const newFileName = `${path.basename(fileName.replace("Example", modelName), path.extname(fileName))}.ts`;
        const filePath = path.join(this.destinationPath, newFileName);

        try {
            fs.writeFileSync(filePath, content);
        } catch (error) {
            console.error(`Error writing file ${fileName}: ${error}`);
        }
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }
}