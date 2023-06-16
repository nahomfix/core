import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { contextToUserId } from '@core/nest/common/firebaseClient'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = GqlExecutionContext.create(context).getContext().req
    const userId = await contextToUserId(context)
    req.userId = userId
    return userId != null
  }
}
