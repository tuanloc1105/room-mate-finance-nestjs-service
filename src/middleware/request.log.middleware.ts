import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AppLogger } from '../common/app.logger';
import { LogLevel } from 'src/enums/log.level.enum';
import { prepareGraphQLRequestContext } from '../common/utils';
import { AppContext } from '../common/app.context';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method.toLowerCase() === 'get') {
      next();
      return;
    }
    const context: AppContext = prepareGraphQLRequestContext(req);
    const { method, originalUrl, body, headers } = req;

    const requestMessageToLog: string = `
    - Request: ${method} ${originalUrl}
    - Request Headers: ${JSON.stringify(headers)}
    - Request Body: ${JSON.stringify(body)}`;
    AppLogger.log(
      LoggingMiddleware.name,
      LogLevel.INFO,
      context,
      requestMessageToLog,
    );

    let responseMessageToLog: string = ``;

    const start = Date.now();
    const originalSend = res.send.bind(res);
    const originalSetHeader = res.setHeader.bind(res);
    const responseHeaders: Record<string, any> = {};

    // Intercept the response setHeader method to capture headers
    res.setHeader = function (name: string, value: string | number | string[]) {
      responseHeaders[name] = value;
      return originalSetHeader(name, value);
    };

    // Intercept the response send method
    res.send = function (body) {
      // Log the response body
      responseMessageToLog =
        responseMessageToLog +
        `
      - Response Body: ${body}`;

      // Log the response headers
      responseMessageToLog =
        responseMessageToLog +
        `
      - Response Headers: ${JSON.stringify(responseHeaders)}`;

      // Call the original send method with the body
      return originalSend(body);
    };

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const { statusCode, statusMessage } = res;
      responseMessageToLog =
        responseMessageToLog +
        `
      - Response: ${statusCode} ${statusMessage}
      - Response Time: ${responseTime}ms`;
      AppLogger.log(
        LoggingMiddleware.name,
        LogLevel.INFO,
        context,
        responseMessageToLog,
      );
    });

    next();
  }
}
