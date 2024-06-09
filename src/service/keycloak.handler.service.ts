import { AppContext } from 'src/common/app.context';
import { KeycloakLoginOutput } from 'src/object/keycloak.object';
import * as process from 'node:process';
import { keycloakLoginPath } from '../constant/app.constant';
import { shellOut } from '../common/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakHandlerService {
  async login(
    context: AppContext,
    username: string,
    password: string,
  ): Promise<{
    result: KeycloakLoginOutput;
    error: Error | null;
  }> {
    const loginCurlCommand: string = `curl -k --connect-timeout 30 --max-time 40 --location '${process.env.KEYCLOAK_API_URL + keycloakLoginPath}' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'client_id=${process.env.KEYCLOAK_CLIENT_ID}' --data-urlencode 'client_secret=${process.env.KEYCLOAK_CLIENT_SECRET}' --data-urlencode 'username=${username}' --data-urlencode 'password=${password}' --data-urlencode 'grant_type=password' --data-urlencode 'scope=openid'`;
    const loginCurlCommandResult = await shellOut(context, loginCurlCommand);
    if (loginCurlCommandResult.error) {
      return {
        result: null,
        error: loginCurlCommandResult.error,
      };
    } else {
      const jsonObject = JSON.parse(loginCurlCommandResult.stdout);
      const output = jsonObject as KeycloakLoginOutput;
      return {
        result: output,
        error: null,
      };
    }
  }
}
