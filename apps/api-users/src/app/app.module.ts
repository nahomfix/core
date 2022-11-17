import { join } from 'path'
import { Module } from '@nestjs/common'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo'
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      plugins:
        process.env.NODE_ENV === 'production'
          ? undefined
          : [ApolloServerPluginInlineTraceDisabled()],
      driver: ApolloFederationDriver,
      typePaths: [
        join(process.cwd(), 'apps/api-users/src/app/**/*.graphql'),
        join(process.cwd(), 'assets/**/*.graphql')
      ],
      cors: true,
      context: ({ req }) => ({ headers: req.headers })
    })
  ]
})
export class AppModule {}
