import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestIdMiddleware } from './middleware/request.id.middleware';
import { LoggingMiddleware } from './middleware/request.log.middleware';
import { GraphqlModule } from './graphql/graphql.module';
import { SampleModule } from './sample/sample.module';
import { LoginModule } from './auth/login/login.module';
import { ConfigModule } from '@nestjs/config';
import { KeycloakHandlerService } from './service/keycloak.handler.service';

@Module({
  imports: [ConfigModule.forRoot(), GraphqlModule, SampleModule, LoginModule],
  controllers: [AppController],
  providers: [AppService, KeycloakHandlerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RequestIdMiddleware).forRoutes('*');
    consumer.apply(RequestIdMiddleware, LoggingMiddleware).forRoutes('*');
  }
}
