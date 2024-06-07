import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
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

  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;

  @Field()
  refreshExpiresIn: number;

  @Field()
  refreshToken: string;

  @Field()
  tokenType: string;

  @Field()
  idToken: string;

  @Field()
  notBeforePolicy: number;

  @Field()
  sessionState: string;

  @Field()
  scope: string;

  @Field()
  error: string;

  @Field()
  errorDescription: string;
}
