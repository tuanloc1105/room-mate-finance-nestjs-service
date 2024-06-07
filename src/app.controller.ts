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
  async getHello(@Req() request: Request): Promise<string> {
    const context = prepareRequestContext(request);
    const serviceResult = await this.appService.getHello(context);
    AppLogger.log(
      AppController.name,
      LogLevel.INFO,
      context,
      `${serviceResult}`,
    );
    return serviceResult;
  }
}
