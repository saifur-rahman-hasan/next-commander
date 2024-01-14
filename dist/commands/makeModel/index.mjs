import inquirer from 'inquirer';
import MakeModel from './MakeModel.mjs';

const prompt = inquirer.createPromptModule();

async function promptUserForModelName() {
    const { modelName } = await prompt([
        {
            type: 'input',
            name: 'modelName',
            message: 'Enter the name for your model:',
        },
    ]);
    return modelName;
}

async function main() {
    // Prompt the user for the model name
    const modelName = await promptUserForModelName();
    
    // Instantiate the MakeModel class
    const makeModel = new MakeModel();

    // Run the model creation process
    try {
        await makeModel.run(modelName);
        console.log('Model creation process completed successfully.');
    } catch (error) {
        console.error(`Error creating model: ${error.message || error}`);
    }
}

// Run the CLI
main();
