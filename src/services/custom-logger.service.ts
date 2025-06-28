import { Logger } from '../interfaces/logger.interface';

export class CustomLogger implements Logger {
  log(message: string): void {
    console.log(`[Custom Logger] ${message}`);
  }
}
