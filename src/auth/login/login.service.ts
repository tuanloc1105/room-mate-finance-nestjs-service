import { Injectable } from '@nestjs/common';
import { LoginInput, LoginOutput } from './login.object.type';
import { AppContext } from '../../common/app.context';
import { KeycloakHandlerService } from '../../service/keycloak.handler.service';
import { ErrorCodeEnum } from '../../enums/error.code.enum';
import { log } from '../../common/utils';
import { AppLogger } from '../../common/app.logger';

@Injectable()
export class LoginService {
  constructor(private readonly keycloakService: KeycloakHandlerService) {}

  @log
  async login(context: AppContext, input: LoginInput): Promise<LoginOutput> {
    const loginResult = await this.keycloakService.login(
      context,
      input.username,
      input.password,
    );
    const output = new LoginOutput();
    output.traceId = context.get(AppLogger.traceIdKey);
    if (loginResult.error) {
      output.errorCode = String(ErrorCodeEnum.FAILURE.code);
      output.errorMessage = ErrorCodeEnum.FAILURE.message;
    } else {
      if (loginResult.result.error) {
        output.errorCode = String(ErrorCodeEnum.AUTH_FAILURE.code);
        output.errorMessage = ErrorCodeEnum.AUTH_FAILURE.message;
      } else {
        output.errorCode = String(ErrorCodeEnum.SUCCESS.code);
        output.errorMessage = ErrorCodeEnum.SUCCESS.message;
        output.accessToken = loginResult.result.access_token;
        output.expiresIn = loginResult.result.expires_in;
        output.refreshExpiresIn = loginResult.result.refresh_expires_in;
        output.refreshToken = loginResult.result.refresh_token;
        output.tokenType = loginResult.result.token_type;
        output.idToken = loginResult.result.id_token;
        output.notBeforePolicy = loginResult.result['not-before-policy'];
        output.sessionState = loginResult.result.session_state;
        output.scope = loginResult.result.scope;
        output.error = loginResult.result.error;
        output.errorDescription = loginResult.result.error_description;
      }
    }
    return output;
  }
}
