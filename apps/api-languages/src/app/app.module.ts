import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo'
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core'
import { LanguageModule } from './modules/language/language.module'
import { TranslationModule } from './modules/translation/translation.module'
import { CountryModule } from './modules/country/country.module'

@Module({
  imports: [
    CountryModule,
    LanguageModule,
    TranslationModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      plugins:
        process.env.NODE_ENV === 'production'
          ? undefined
          : [ApolloServerPluginInlineTraceDisabled()],
      driver: ApolloFederationDriver,
      typePaths: [
        join(process.cwd(), 'apps/api-languages/src/app/**/*.graphql'),
        join(process.cwd(), 'assets/**/*.graphql')
      ],
      cors: true,
      context: ({ req }) => ({ headers: req.headers })
    })
  ]
})
export class AppModule {}
