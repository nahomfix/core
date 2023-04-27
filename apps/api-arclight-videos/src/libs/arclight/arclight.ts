import fetch, { Response, RequestInfo, RequestInit } from 'node-fetch'
import {
  Prisma,
  PrismaClient,
  Video,
  Variant
} from '.prisma/api-arclight-videos-client'
import { slugify } from '../slugify'

const prisma = new PrismaClient()

export interface ArclightMediaLanguage {
  languageId: number
  bcp47: string
  name: string
}

export interface Language extends ArclightMediaLanguage {
  slug: string
}

export interface ArclightMediaComponent {
  mediaComponentId: string
  primaryLanguageId: number
  title: string
  shortDescription: string
  longDescription: string
  metadataLanguageTag: string
  imageUrls: {
    mobileCinematicHigh: string
  }
  subType: string
  studyQuestions: string[]
}

export interface MediaComponent extends ArclightMediaComponent {
  slug: string
}

export interface ArclightMediaComponentLanguage {
  refId: string
  languageId: number
  lengthInMilliseconds?: number
  subtitleUrls: {
    vtt?: Array<{
      languageId: number
      url: string
    }>
  }
  streamingUrls: {
    hls?: Array<{
      url: string
    }>
  }
  downloadUrls: {
    low?: {
      url: string
      sizeInBytes: number
    }
    high?: {
      url: string
      sizeInBytes: number
    }
  }
}

async function fetchOrRetry(
  url: RequestInfo,
  init?: RequestInit,
  retries = 3
): Promise<Response> {
  try {
    return await fetch(url, init)
  } catch (error) {
    if (error.name === 'FetchError' && retries > 0) {
      return await fetchOrRetry(url, init, retries - 1)
    }
    throw new Error(error)
  }
}

export async function getArclightMediaLanguages(): Promise<
  ArclightMediaLanguage[]
> {
  const response: {
    _embedded: { mediaLanguages: ArclightMediaLanguage[] }
  } = await (
    await fetchOrRetry(
      `https://api.arclight.org/v2/media-languages?limit=5000&filter=default&apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  return response._embedded.mediaLanguages
}

export async function getArclightMediaComponents(
  page: number
): Promise<ArclightMediaComponent[]> {
  const response: {
    _embedded: { mediaComponents: ArclightMediaComponent[] }
    message?: string
  } = await (
    await fetchOrRetry(
      `https://api.arclight.org/v2/media-components?limit=25&isDeprecated=false&contentTypes=video&page=${page}&apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  if (
    response.message?.match(
      /Page \[\d\d\] does not exist. Given a limit of \[25\] per page, value must not be greater than \[\d\d\]\./
    ) != null
  )
    return []
  return response._embedded.mediaComponents
}

export async function getArclightMediaComponentLanguages(
  mediaComponentId: string
): Promise<ArclightMediaComponentLanguage[]> {
  const response: {
    _embedded: { mediaComponentLanguage: ArclightMediaComponentLanguage[] }
  } = await (
    await fetchOrRetry(
      `https://api.arclight.org/v2/media-components/${mediaComponentId}/languages?platform=android&apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  return response._embedded.mediaComponentLanguage
}

export async function getArclightMediaComponentLinks(
  mediaComponentId: string
): Promise<string[]> {
  const response: {
    linkedMediaComponentIds: { contains?: string[] }
  } = await (
    await fetchOrRetry(
      `https://api.arclight.org/v2/media-component-links/${mediaComponentId}?apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  return response.linkedMediaComponentIds.contains ?? []
}

export async function createVariant(
  mediaComponentLanguage: ArclightMediaComponentLanguage,
  mediaComponent: MediaComponent,
  language: Language,
  video: Video
): Promise<Variant> {
  const slug = `${mediaComponent.slug}/${language.slug}`
  if (mediaComponent.subType === 'series') {
    const attributes: Prisma.VariantCreateInput = {
      id: mediaComponentLanguage.refId,
      languageId: mediaComponentLanguage.languageId.toString(),
      duration: Math.round(
        (mediaComponentLanguage.lengthInMilliseconds ?? 0) * 0.001
      ),
      slug,
      video: {
        connect: { id: video.id }
      }
    }
    return await prisma.variant.upsert({
      where: {
        id: mediaComponentLanguage.refId
      },
      create: attributes,
      update: attributes
    })
  } else {
    const attributes: Prisma.VariantCreateInput = {
      id: mediaComponentLanguage.refId,
      // subtitles,
      hls: mediaComponentLanguage.streamingUrls.hls?.[0].url,
      languageId: mediaComponentLanguage.languageId.toString(),
      duration: Math.round(
        (mediaComponentLanguage.lengthInMilliseconds ?? 0) * 0.001
      ),
      slug,
      video: {
        connect: { id: video.id }
      }
    }

    const variant = await prisma.variant.upsert({
      where: {
        id: mediaComponentLanguage.refId
      },
      create: attributes,
      update: attributes
    })

    for (const [key, value] of Object.entries(
      mediaComponentLanguage.downloadUrls
    )) {
      const downloadAttributes: Prisma.DownloadCreateInput = {
        quality: key,
        size: value.sizeInBytes,
        url: value.url,
        variant: {
          connect: { id: variant.id }
        }
      }
      console.log(downloadAttributes)
      await prisma.download.upsert({
        where: { variantId_quality: { variantId: variant.id, quality: key } },
        create: downloadAttributes,
        update: downloadAttributes
      })
    }

    for (const subtitle of mediaComponentLanguage.subtitleUrls.vtt ?? []) {
      const subtitleAttributes: Prisma.SubtitleCreateInput = {
        languageId: subtitle.languageId.toString(),
        url: subtitle.url,
        variant: {
          connect: { id: variant.id }
        }
      }
      console.log(subtitleAttributes)
      await prisma.subtitle.upsert({
        where: {
          variantId_languageId: {
            variantId: variant.id,
            languageId: subtitle.languageId.toString()
          }
        },
        create: subtitleAttributes,
        update: subtitleAttributes
      })
    }

    return variant
  }
}

export async function createVideo(
  mediaComponent: ArclightMediaComponent,
  mediaComponentLanguages: ArclightMediaComponentLanguage[],
  mediaComponentLinks: string[],
  languages: Language[],
  usedSlugs: string[]
): Promise<Video> {
  const metadataLanguageId =
    languages
      .find(({ bcp47 }) => bcp47 === mediaComponent.metadataLanguageTag)
      ?.languageId.toString() ?? '529' // english by default

  const slug = slugify(mediaComponent.title, usedSlugs)

  const attributes: Prisma.VideoCreateInput = {
    id: mediaComponent.mediaComponentId,
    title: {
      connectOrCreate: {
        where: {
          text_languageId: {
            text: mediaComponent.title,
            languageId: metadataLanguageId
          }
        },
        create: {
          text: mediaComponent.title,
          languageId: metadataLanguageId
        }
      }
    },
    variantCount: mediaComponentLanguages.length,
    childrenCount: mediaComponentLinks.length,
    label: mediaComponent.subType,
    primaryLanguageId: mediaComponent.primaryLanguageId.toString(),
    slug,
    snippet: {
      connectOrCreate: {
        where: {
          text_languageId: {
            text: mediaComponent.shortDescription,
            languageId: metadataLanguageId
          }
        },
        create: {
          text: mediaComponent.shortDescription,
          languageId: metadataLanguageId
        }
      }
    },
    description: {
      connectOrCreate: {
        where: {
          text_languageId: {
            text: mediaComponent.longDescription,
            languageId: metadataLanguageId
          }
        },
        create: {
          text: mediaComponent.longDescription,
          languageId: metadataLanguageId
        }
      }
    },
    image: mediaComponent.imageUrls.mobileCinematicHigh,
    imageAlt: {
      connectOrCreate: {
        where: {
          text_languageId: {
            text:
              mediaComponent.title.length <= 100
                ? mediaComponent.title
                : mediaComponent.title.substring(0, 99),
            languageId: metadataLanguageId
          }
        },
        create: {
          text:
            mediaComponent.title.length <= 100
              ? mediaComponent.title
              : mediaComponent.title.substring(0, 99),
          languageId: metadataLanguageId
        }
      }
    }
  }

  const video = await prisma.video.upsert({
    where: { id: mediaComponent.mediaComponentId },
    create: attributes,
    update: attributes
  })

  for (const mediaComponentLanguage of mediaComponentLanguages) {
    const language = languages.find(
      ({ languageId }) => languageId === mediaComponentLanguage.languageId
    )
    if (language == null) continue
    await createVariant(
      mediaComponentLanguage,
      { ...mediaComponent, slug },
      language,
      video
    )
  }

  return video

  // studyQuestions: mediaComponent.studyQuestions.map((studyQuestion) => {
  //   return {
  //     languageId: metadataLanguageId,
  //     value: studyQuestion,
  //     primary: true
  //   }
  // }),
}

export function transformArclightMediaLanguageToLanguage(
  mediaLanguage: ArclightMediaLanguage,
  usedSlugs: string[]
): Language {
  const slug = slugify(mediaLanguage.name, usedSlugs)
  return {
    ...mediaLanguage,
    slug
  }
}

export async function fetchMediaLanguagesAndTransformToLanguages(): Promise<
  Language[]
> {
  const usedLanguageSlugs = []
  const mediaLanguages = await getArclightMediaLanguages()
  return mediaLanguages.map((mediaLanguage) =>
    transformArclightMediaLanguageToLanguage(mediaLanguage, usedLanguageSlugs)
  )
}

export async function fetchMediaComponentsAndCreateVideos(
  languages: Language[],
  usedVideoSlugs: string[],
  page: number
): Promise<Array<{ video: Video; childIds: string[] }>> {
  const mediaComponents = await getArclightMediaComponents(page)

  const mediaComponentsAndMetadata = await Promise.all(
    mediaComponents.map(async (mediaComponent) => {
      console.log(`fetching mediaComponent:`, mediaComponent.mediaComponentId)
      const mediaComponentLanguages = await getArclightMediaComponentLanguages(
        mediaComponent.mediaComponentId
      )
      const mediaComponentLinks = await getArclightMediaComponentLinks(
        mediaComponent.mediaComponentId
      )
      return { mediaComponent, mediaComponentLanguages, mediaComponentLinks }
    })
  )

  const videos: Array<{ video: Video; childIds: string[] }> = []
  for (const arclightVideo of mediaComponentsAndMetadata) {
    const video = await createVideo(
      arclightVideo.mediaComponent,
      arclightVideo.mediaComponentLanguages,
      arclightVideo.mediaComponentLinks,
      languages,
      usedVideoSlugs
    )
    videos.push({ video, childIds: arclightVideo.mediaComponentLinks })
  }
  return videos
}
