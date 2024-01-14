import fs from 'fs';
import path from 'path';

export default class MakeModel {
    constructor(){
        this.destinationPath = path.join(process.cwd(), 'src', 'core');
    }

    async run() {
        const owner = 'saifur-rahman-hasan';
        const repo = 'next-commander';
        const pathInRepo = 'dist/InputFiles/core';
        console.log("Riniing ")
    }
}