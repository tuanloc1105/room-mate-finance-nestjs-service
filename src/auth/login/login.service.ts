import { Injectable } from '@nestjs/common';
import { LoginInput, LoginOutput } from './login.object.type';
import * as process from 'node:process';
import { keycloakLoginPath } from '../../constant/app.constant';
import { shellOut } from '../../common/utils';
import { AppContext } from '../../common/app.context';
import { ErrorCodeEnum } from '../../enums/error.code.enum';

@Injectable()
export class LoginService {
  async login(context: AppContext, input: LoginInput): Promise<LoginOutput> {
    const loginCurlCommand: string = `curl -k --connect-timeout 30 --max-time 40 --location '${process.env.KEYCLOAK_API_URL + keycloakLoginPath}' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'client_id=${process.env.KEYCLOAK_CLIENT_ID}' --data-urlencode 'client_secret=${process.env.KEYCLOAK_CLIENT_SECRET}' --data-urlencode 'username=${input.username}' --data-urlencode 'password=${input.password}' --data-urlencode 'grant_type=password' --data-urlencode 'scope=openid'`;
    const loginCurlCommandResult = await shellOut(context, loginCurlCommand);
    let output: LoginOutput = new LoginOutput();
    if (loginCurlCommandResult.error) {
      output.traceId = context.get('traceId');
      output.errorCode = String(ErrorCodeEnum.FAILURE.code);
      output.errorMessage = ErrorCodeEnum.FAILURE.message;
    } else {
      const object = JSON.parse(loginCurlCommandResult.stdout);
      if (object.error) {
        output.traceId = context.get('traceId');
        output.errorCode = String(ErrorCodeEnum.AUTH_FAILURE.code);
        output.errorMessage = ErrorCodeEnum.AUTH_FAILURE.message;
      } else {
        output = LoginOutput.parse(output, object);
        output.traceId = context.get('traceId');
        output.errorCode = String(ErrorCodeEnum.SUCCESS.code);
        output.errorMessage = ErrorCodeEnum.SUCCESS.message;
      }
    }
    return output;
  }
}
