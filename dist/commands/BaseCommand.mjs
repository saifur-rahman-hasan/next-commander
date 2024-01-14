const owner = 'saifur-rahman-hasan';
const repo = 'next-commander';

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
  