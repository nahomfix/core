import { Resolver, ResolveField, Parent } from '@nestjs/graphql'
import { compact } from 'lodash'

@Resolver('ArclightVariant')
export class ArclightVariantResolver {
  @ResolveField('language')
  async language(
    @Parent() arclightVariant
  ): Promise<{ __typename: string; id: string }> {
    return { __typename: 'Language', id: arclightVariant.languageId }
  }

  @ResolveField('subtitleCount')
  subtitleCount(@Parent() arclightVariant): number {
    return compact(arclightVariant.subtitle).length
  }
}
