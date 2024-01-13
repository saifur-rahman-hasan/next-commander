export class MakeController {
    private name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    public run(): void {
      console.log(`Creating controller: ${this.name}`);
      // Add logic to generate controller files or perform other actions
    }
  }