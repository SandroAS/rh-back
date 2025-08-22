import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccountId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log("REQUEST", request)

    return request.user.account_id;
  }
);
