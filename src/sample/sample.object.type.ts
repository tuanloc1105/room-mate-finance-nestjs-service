import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Sample {
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;
}
