import { Context, Query, Resolver } from '@nestjs/graphql';
import { Sample } from './sample.object.type';
import { SampleService } from './sample.service';
import { prepareGraphQLRequestContext } from '../common/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Sample)
export class SampleResolver {
  constructor(private sampleService: SampleService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Sample])
  samples(@Context() request): Sample[] {
    const context = prepareGraphQLRequestContext(request);
    console.log(context);
    return this.sampleService.findAll();
  }
}
