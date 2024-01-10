export default class Logger {
  type: string = "info";

  constructor(type: string) {
    this.type = type;
  }

  log(contents: string) {
    console.log(`[${this.type.toUpperCase()}]: ${contents}`);
  }
} 