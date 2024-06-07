import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { prepareGraphQLRequestContext } from '../../common/utils';
import { LoginInput, LoginOutput } from './login.object.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => LoginOutput)
export class LoginResolver {
  constructor(private loginService: LoginService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => LoginOutput)
  async login(
    @Context() request: any,
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginOutput> {
    const context = prepareGraphQLRequestContext(request);
    return this.loginService.login(context, loginInput);
  }
}
