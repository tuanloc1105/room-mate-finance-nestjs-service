import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { generateUUID } from './utils';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    (req as any).context = {
      startTime: Date.now(),
      traceId: generateUUID(),
    };
    next();
  }
}
