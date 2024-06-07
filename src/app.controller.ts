import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async getHello(@Req() request: Request): Promise<string> {
  //   const context = prepareRequestContext(request);
  //   const serviceResult = await this.appService.getHello(context);
  //   AppLogger.log(
  //     AppController.name,
  //     LogLevel.INFO,
  //     context,
  //     `${serviceResult}`,
  //   );
  //   return serviceResult;
  // }
}
