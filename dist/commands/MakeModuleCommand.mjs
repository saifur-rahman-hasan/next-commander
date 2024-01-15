import path from 'path';
import { createDirectoryIfNotExists } from './BaseCommand.mjs';
import inquirer from 'inquirer';

export default class MakeModuleCommand {
    constructor(config){
        this.config = config
        this.destinationPath = path.join(process.cwd(), this.config.outputFilesDir, 'src', 'modules');
    }

    async run() {
        console.log(`Creating new module`)

        const moduleName = await inquirer.prompt([
            {
                type: 'input',
                name: 'moduleName',
                message: 'Enter the name for the new module:',
                validate: (value) => value.trim() !== '',
            },
        ]).then(ans => ans.moduleName)

        
        this.destinationPath = this.destinationPath + `/${moduleName}` 
        console.log(`this.destinationPath`, this.destinationPath)
        createDirectoryIfNotExists(this.destinationPath)

        console.log(`Module Created!!!`)
    }
}