import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { generateUUID } from '../common/utils';
import { AppLogger } from '../common/app.logger';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (req.url.includes('graph') || req.url === '/') {
      req[AppLogger.startTimeKey] = Date.now();
      req[AppLogger.traceIdKey] = generateUUID();
    } else {
      (req as any).context = {
        start_time: Date.now(),
        trace_id: generateUUID(),
      };
    }
    next();
  }
}
