import { Resolver, Query } from '@nestjs/graphql';
import { Sample } from './sample.object.type';
import { SampleService } from './sample.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Sample)
export class SampleResolver {
  constructor(private sampleService: SampleService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Sample])
  samples(): Sample[] {
    return this.sampleService.findAll();
  }
}
