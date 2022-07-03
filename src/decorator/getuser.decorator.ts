import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entity/user.interface';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User | string => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return data ? user[data] : user;
  },
);
