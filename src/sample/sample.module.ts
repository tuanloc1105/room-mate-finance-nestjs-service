import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleResolver } from './sample.resolver';

@Module({
  providers: [SampleService, SampleResolver],
})
export class SampleModule {}
