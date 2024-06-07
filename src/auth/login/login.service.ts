import { Injectable } from '@nestjs/common';
import { LoginInput, LoginOutput } from './login.object.type';
import * as process from 'node:process';
import { keycloakLoginPath } from '../../constant/app.constant';
import { shellOut } from "../../common/utils";

@Injectable()
export class LoginService {
  // login(input: LoginInput): LoginOutput {
  //   const loginCurlCommand: string = `curl -k --connect-timeout 30 --max-time 40 --location '${process.env.KEYCLOAK_API_URL + keycloakLoginPath}' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'client_id=${process.env.KEYCLOAK_CLIENT_ID}' --data-urlencode 'client_secret=${process.env.KEYCLOAK_CLIENT_SECRET}' --data-urlencode 'username=${input.username}' --data-urlencode 'password=${input.password}' --data-urlencode 'grant_type=password' --data-urlencode 'scope=openid'`;
  //   const loginCurlCommandResult = await shellOut(context, 'ls -l');
  // }
}
