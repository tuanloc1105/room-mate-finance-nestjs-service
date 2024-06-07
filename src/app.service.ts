import { Injectable } from '@nestjs/common';
import { AppContext } from './common/app.context';
import { shellOut } from './common/utils';

@Injectable()
export class AppService {
  async getHello(context: AppContext): Promise<string> {
    const commandResult = await shellOut(context, 'ls -l');
    return commandResult.stdout;
  }
}
