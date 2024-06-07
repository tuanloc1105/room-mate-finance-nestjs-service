import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { generateUUID } from '../common/utils';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (req.url.includes('graph') || req.url === '/') {
      req['startTime'] = Date.now();
      req['traceId'] = generateUUID();
    } else {
      (req as any).context = {
        startTime: Date.now(),
        traceId: generateUUID(),
      };
    }
    next();
  }
}
