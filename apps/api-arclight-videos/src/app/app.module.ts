import { join } from 'path'
import { Module } from '@nestjs/common'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { LoggerModule } from 'nestjs-pino'
import { DatadogTraceModule } from 'nestjs-ddtrace'
import TranslationModule from '@core/nest/common/TranslationModule'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { ArclightVideoModule } from './modules/arclightVideo/arclightVideo.module'
import { ArclightVariantModule } from './modules/arclightVariant/arclightVariant.module'
import { PrismaModule } from './modules/prisma/prisma.module'

@Module({
  imports: [
    TranslationModule,
    ArclightVideoModule,
    ArclightVariantModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths:
        process.env.NODE_ENV !== 'production'
          ? [
              join(
                process.cwd(),
                'apps/api-arclight-videos/src/app/**/*.graphql'
              ),
              join(
                process.cwd(),
                'libs/nest/common/src/lib/TranslationModule/translation.graphql'
              )
            ]
          : [join(process.cwd(), 'assets/**/*.graphql')],
      cors: true,
      context: ({ req }) => ({ headers: req.headers }),
      cache: 'bounded',
      plugins: [responseCachePlugin()]
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: {
          ignore: (req) => req.url === '/.well-known/apollo/server-health'
        },
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                  timestampKey: ''
                }
              }
            : undefined,
        level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info'
      }
    }),
    DatadogTraceModule.forRoot()
  ]
})
export class AppModule {}
