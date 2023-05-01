import { PrismaTranslationField } from '@core/nest/decorators/PrismaTranslationField'
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
  Video as VideoDB,
  Children as ChildrenDB
} from '.prisma/api-arclight-videos-client'

import { IdType, ArclightVideosFilter } from '../../__generated__/graphql'
import { PrismaService } from '../prisma/prisma.service'

@Resolver('ArclightVideo')
export class ArclightVideoResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query()
  async arclightVideos(
    @Info() info: GraphQLResolveInfo,
    @Args('where') where?: ArclightVideosFilter,
    @Args('offset') offset?: number,
    @Args('limit') limit?: number
  ): Promise<VideoDB[]> {
    return await this.prismaService.video.findMany({
      where: {
        title: {
          is: {
            text: {
              contains: where?.title ?? undefined
            }
          }
        },
        variants: {
          some: {
            languageId: {
              in: where?.availableVariantLanguageIds ?? undefined
            },
            subtitles: {
              some: {
                languageId: {
                  in: where?.subtitleLanguageIds ?? undefined
                }
              }
            }
          }
        },
        id: {
          in: where?.ids ?? undefined
        },
        label: {
          in: where?.labels ?? undefined
        }
      },
      skip: offset,
      take: limit,
      include: {
        title: {
          include: {
            translations: true
          }
        },
        snippet: {
          include: {
            translations: true
          }
        },
        description: {
          include: {
            translations: true
          }
        },
        imageAlt: {
          include: {
            translations: true
          }
        }
      }
    })
  }

  @Query()
  async arclightVideo(
    @Info() info: GraphQLResolveInfo,
    @Args('id') id: string,
    @Args('idType') idType: IdType = IdType.databaseId
  ): Promise<VideoDB | null> {
    switch (idType) {
      case IdType.databaseId:
        return await this.prismaService.video.findUnique({
          where: { id }
        })
      case IdType.slug:
        return await this.prismaService.video.findUnique({
          where: { slug: id }
        })
    }
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: 'ArclightVideo'
    id: string
    primaryLanguageId?: string | null
  }): Promise<VideoDB | null> {
    const video = await this.prismaService.video.findUnique({
      where: { id: reference.id },
      include: {
        children: {
          include: {
            child: true
          }
        },
        title: {
          include: {
            translations: true
          }
        },
        snippet: {
          include: {
            translations: true
          }
        },
        description: {
          include: {
            translations: true
          }
        },
        imageAlt: {
          include: {
            translations: true
          }
        }
      }
    })
    return video
  }

  @ResolveField()
  async children(
    @Parent()
    video: VideoDB & { children: Array<ChildrenDB & { child: VideoDB }> }
  ): Promise<VideoDB[]> {
    return video.children.map(({ child }) => child)
  }

  @ResolveField()
  @PrismaTranslationField('title')
  title(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @PrismaTranslationField('snippet')
  snippet(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @PrismaTranslationField('description')
  description(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @PrismaTranslationField('studyQuestions')
  studyQuestions(
    @Parent() language,
    @Args('languageId') languageId?: string,
    @Args('primary') primary?: boolean
  ): void {}

  @ResolveField()
  @PrismaTranslationField('imageAlt')
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
