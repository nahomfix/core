import { TranslationField } from '@core/nest/decorators/TranslationField'
import {
  Resolver,
  Query,
  Args,
  Info,
  ResolveReference,
  ResolveField,
  Parent
} from '@nestjs/graphql'
import { FieldNode, GraphQLResolveInfo, Kind } from 'graphql'
import { compact } from 'lodash'

import {
  IdType,
  ArclightVideo,
  ArclightVideosFilter
} from '../../__generated__/graphql'
import { ArclightVideoService } from './arclightVideo.service'

@Resolver('ArclightVideo')
export class ArclightVideoResolver {
  constructor(private readonly arclightVideoService: ArclightVideoService) {}

  @Query()
  async arclightVideos(
    @Info() info: GraphQLResolveInfo,
    @Args('where') where?: ArclightVideosFilter,
    @Args('offset') offset?: number,
    @Args('limit') limit?: number
  ): Promise<ArclightVideo[]> {
    return await this.arclightVideoService.filterAll({
      title: where?.title ?? undefined,
      availableVariantLanguageIds:
        where?.availableVariantLanguageIds ?? undefined,
      ids: where?.ids ?? undefined,
      variantLanguageId: this.extractVariantLanguageId(info),
      labels: where?.labels ?? undefined,
      subtitleLanguageIds: where?.subtitleLanguageIds ?? undefined,
      offset,
      limit
    })
  }

  @Query()
  async arclightVideo(
    @Info() info: GraphQLResolveInfo,
    @Args('id') id: string,
    @Args('idType') idType: IdType = IdType.databaseId
  ): Promise<ArclightVideo> {
    switch (idType) {
      case IdType.databaseId:
        return await this.arclightVideoService.getArclightVideo(
          id,
          this.extractVariantLanguageId(info)
        )
      case IdType.slug:
        return await this.arclightVideoService.getArclightVideoBySlug(id)
    }
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: 'ArclightVideo'
    id: string
    primaryLanguageId?: string | null
  }): Promise<ArclightVideo> {
    return await this.arclightVideoService.getArclightVideo(
      reference.id,
      reference.primaryLanguageId ?? undefined
    )
  }

  @ResolveField()
  async children(
    @Parent()
    arclightVideo: {
      childIds?: string[]
      variant?: { languageId: string }
    }
  ): Promise<ArclightVideo[] | null> {
    return arclightVideo.childIds != null
      ? await this.arclightVideoService.getArclightVideosByIds(
          arclightVideo.childIds,
          arclightVideo.variant?.languageId
        )
      : null
  }

  @ResolveField()
  @TranslationField('title')
  title(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @TranslationField('seoTitle')
  seoTitle(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @TranslationField('snippet')
  snippet(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @TranslationField('description')
  description(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @TranslationField('studyQuestions')
  studyQuestions(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @TranslationField('imageAlt')
  imageAlt(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  childrenCount(@Parent() arclightVideo): number {
    return compact(arclightVideo.childIds).length
  }

  @ResolveField('variantLanguagesCount')
  variantLanguagesCount(@Parent() arclightVideo): number {
    return compact(arclightVideo.variantLanguages).length
  }

  private extractVariantLanguageId(
    info: GraphQLResolveInfo
  ): string | undefined {
    const argumentNode = (
      info.fieldNodes[0].selectionSet?.selections.find(
        (node) => node.kind === Kind.FIELD && node.name.value === 'variant'
      ) as FieldNode | undefined
    )?.arguments?.find(({ name }) => name.value === 'languageId')

    let variantLanguageId: string | undefined
    const valueNode = argumentNode?.value
    if (valueNode != null && 'value' in valueNode) {
      variantLanguageId = valueNode.value.toString()
    }
    if (valueNode != null && valueNode.kind === Kind.VARIABLE) {
      variantLanguageId = info.variableValues[valueNode.name.value] as string
    }
    return variantLanguageId
  }
}

@Resolver('LanguageWithSlug')
export class LanguageWithSlugResolver {
  @ResolveField('language')
  language(@Parent() languageWithSlug): { __typename: 'Language'; id: string } {
    // 529 (english) is default if not set
    return { __typename: 'Language', id: languageWithSlug.languageId ?? '529' }
  }
}
