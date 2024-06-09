import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginOutput {
  @Field()
  traceId: string;

  @Field()
  errorCode: string;

  @Field()
  errorMessage: string;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  expiresIn: number;

  @Field({ nullable: true })
  refreshExpiresIn: number;

  @Field({ nullable: true })
  refreshToken: string;

  @Field({ nullable: true })
  tokenType: string;

  @Field({ nullable: true })
  idToken: string;

  @Field({ nullable: true })
  notBeforePolicy: number;

  @Field({ nullable: true })
  sessionState: string;

  @Field({ nullable: true })
  scope: string;

  @Field({ nullable: true })
  error: string;

  @Field({ nullable: true })
  errorDescription: string;

}
