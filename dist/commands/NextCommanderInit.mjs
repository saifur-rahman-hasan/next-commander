import fs from 'fs';
import path from 'path';

export default class NextCommanderInit {
    constructor(){}

    run() {
        const coreDirectoryPath = path.join(process.cwd(), 'dist/InputFiles/core');
        console.log(`coreDirectoryPath`, coreDirectoryPath)
        fs.readdir(coreDirectoryPath, (err, files) => {
            if (err) {
                console.error(`Error reading directory: ${err}`);
                return;
            }

            if (files.length === 0) {
                console.log('The "core" directory is empty.');
            } else {
                console.log(`Files and directories in the "core" directory:`);
                files.forEach((file) => {
                    console.log(file);
                });
            }
        });

        console.log('Executing Command:' + this.constructor.name)
    }
}