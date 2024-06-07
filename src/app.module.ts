import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestIdMiddleware } from './common/request.id.middleware';
import { LoggingMiddleware } from './common/request.log.middleware';
import { GraphqlModule } from './graphql/graphql.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [GraphqlModule, SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, LoggingMiddleware).forRoutes('*');
  }
}
