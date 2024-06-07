import { Logger } from "@nestjs/common";
import { LogLevel } from "src/enums/log.level.enum";
import { RequestContext } from "./request.context";

export class AppLogger {
    private static readonly data: Map<string, Logger> = new Map();

    private static checkLoggerClass(className: string): Logger {
        let result: Logger = AppLogger.data.get(className);
        if (result === undefined) {
            result = new Logger(className);
        }
        return result;
    }

    static log(className: string, level: LogLevel, context: RequestContext, message: string) {
        const startTime = context.get("startTime");
        const traceId = context.get("traceId");
        const logger = this.checkLoggerClass(className);
        const finalMessageToLog = `[${startTime}] [${traceId}] ⏩ ${message}`
        switch (level) {
            case LogLevel.INFO:
                logger.log(finalMessageToLog);
                break;
            case LogLevel.WARN:
                logger.warn(finalMessageToLog);
                break;
            case LogLevel.ERROR:
                logger.error(finalMessageToLog);
                break;
        }
    }

}
