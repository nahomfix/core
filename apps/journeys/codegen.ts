import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'apps/api-gateway/schema.graphql',
  documents: [
    './apps/journeys/pages/**/*',
    './apps/journeys/src/**/*',
    './libs/journeys/ui/**/*'
  ],
  config: {
    preResolveTypes: true,
    namingConvention: 'keep',
    avoidOptionals: {
      field: true
    },
    nonOptionalTypename: true,
    skipTypeNameForRoot: true
  },
  generates: {
    './apps/journeys/__generated__/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
