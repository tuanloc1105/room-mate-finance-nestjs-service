import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { prepareRequestContext } from './common/utils';
import { AppLogger } from './common/app.logger';
import { LogLevel } from './enums/log.level.enum';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    const context = prepareRequestContext(request);
    AppLogger.log(
      AppController.name,
      LogLevel.INFO,
      context,
      `${this.appService.getHello()}`,
    );
    return (
      this.appService.getHello() +
      ' - ' +
      context.get('traceId') +
      ' - ' +
      context.get('startTime')
    );
  }
}
