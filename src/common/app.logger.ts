import { Logger } from '@nestjs/common';
import { LogLevel } from 'src/enums/log.level.enum';
import { AppContext } from './app.context';

export class AppLogger {
  private static readonly data: Map<string, Logger> = new Map();
  static readonly startTimeKey: string = 'start_time';
  static readonly traceIdKey: string = 'trace_id';

  private static checkLoggerClass(className: string): Logger {
    let result: Logger = AppLogger.data.get(className);
    if (result === undefined) {
      result = new Logger(className);
    }
    return result;
  }

  static formatDate(date: Date): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n);

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }

  static log(
    className: string,
    level: LogLevel,
    context: AppContext,
    message: string | string[] | any[],
  ) {
    const startTime = context.get(AppLogger.startTimeKey);
    const traceId = context.get(AppLogger.traceIdKey);
    // const logger = this.checkLoggerClass(className);
    const finalMessageToLog = `${LogLevel[level]} - ${AppLogger.formatDate(new Date())} - [${className}] [${startTime}] [${traceId}] ⏩ `;
    console.log(finalMessageToLog, message);
    // switch () {
    //   case LogLevel.INFO:
    //     logger.log(finalMessageToLog);
    //     break;
    //   case LogLevel.WARN:
    //     logger.warn(finalMessageToLog);
    //     break;
    //   case LogLevel.ERROR:
    //     logger.error(finalMessageToLog);
    //     break;
    // }
  }
}
