import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginResolver } from './login.resolver';
import { KeycloakHandlerService } from '../../service/keycloak.handler.service';

@Module({
  providers: [LoginService, LoginResolver, KeycloakHandlerService],
})
export class LoginModule {}
