// version 1
// increment to trigger re-seed (ie: files other than seed.ts are changed)

import {
  PrismaClient,
  Prisma,
  Video,
  Variant,
  StudyQuestion,
  Subtitle,
  Download
} from '.prisma/api-arclight-videos-client'
import {
  fetchMediaComponentsAndTransformToVideos,
  fetchMediaLanguagesAndTransformToLanguages
} from '../src/libs/arclight'
import { Video as ArclightVideo } from '../src/libs/arclight/arclight'

const prisma = new PrismaClient()

async function createSubtitle(
  input: ArclightVideo['variants'][number]['subtitles'][number],
  variant: Variant
): Promise<Subtitle> {
  console.log('processing subtitle:', variant.id, input.languageId)
  const attributes: Prisma.SubtitleCreateInput = {
    url: input.url,
    languageId: input.languageId,
    variant: {
      connect: { id: variant.id }
    }
  }
  const subtitle = await prisma.subtitle.upsert({
    where: {
      variantId_languageId: {
        variantId: variant.id,
        languageId: input.languageId
      }
    },
    create: attributes,
    update: attributes
  })

  return subtitle
}

async function createDownload(
  input: ArclightVideo['variants'][number]['downloads'][number],
  variant: Variant
): Promise<Download> {
  console.log('processing download:', variant.id, input.quality)
  const attributes: Prisma.DownloadCreateInput = {
    quality: input.quality,
    size: input.size,
    url: input.url,
    variant: {
      connect: { id: variant.id }
    }
  }
  const download = await prisma.download.upsert({
    where: {
      variantId_quality: {
        variantId: variant.id,
        quality: input.quality
      }
    },
    create: attributes,
    update: attributes
  })

  return download
}

async function createVariant(
  input: ArclightVideo['variants'][number],
  video: Video
): Promise<Variant> {
  console.log('processing mediaComponentLanguage:', input.id)
  const attributes: Prisma.VariantCreateInput = {
    id: input.id,
    hls: input.hls,
    languageId: input.languageId,
    duration: input.duration,
    slug: input.slug,
    video: {
      connect: { id: video.id }
    }
  }
  const variant = await prisma.variant.upsert({
    where: { id: input.id },
    create: attributes,
    update: attributes
  })

  await Promise.all(
    input.subtitles.map(async (subtitle) => {
      await createSubtitle(subtitle, variant)
    })
  )

  await Promise.all(
    input.downloads.map(async (download) => {
      await createDownload(download, variant)
    })
  )

  return variant
}

async function createStudyQuestion(
  input: string,
  video: Video,
  arclightVideo: ArclightVideo
): Promise<StudyQuestion> {
  console.log('processing study question:', input)
  const content = await prisma.content.upsert({
    where: {
      text_languageId: {
        text: input,
        languageId: arclightVideo.metadataLanguageId
      }
    },
    create: {
      text: input,
      languageId: arclightVideo.metadataLanguageId
    },
    update: {}
  })
  const attributes: Prisma.StudyQuestionCreateInput = {
    content: {
      connect: { id: content.id }
    },
    video: {
      connect: { id: video.id }
    }
  }
  const studyQuestion = await prisma.studyQuestion.upsert({
    where: {
      contentId_videoId: {
        contentId: content.id,
        videoId: video.id
      }
    },
    create: attributes,
    update: {}
  })

  return studyQuestion
}

async function createVideo(input: ArclightVideo): Promise<Video> {
  const attributes: Prisma.VideoCreateInput = {
    id: input.id,
    label: input.label,
    primaryLanguageId: input.primaryLanguageId,
    image: input.image,
    slug: input.slug,
    title: {
      connectOrCreate: {
        where: {
          text_languageId: {
            text: input.title,
            languageId: input.metadataLanguageId
          }
        },
        create: {
          text: input.title,
          languageId: input.metadataLanguageId
        }
      }
    },
    snippet:
      input.description != null
        ? {
            connectOrCreate: {
              where: {
                text_languageId: {
                  text: input.snippet,
                  languageId: input.metadataLanguageId
                }
              },
              create: {
                text: input.snippet,
                languageId: input.metadataLanguageId
              }
            }
          }
        : undefined,
    description:
      input.description != null
        ? {
            connectOrCreate: {
              where: {
                text_languageId: {
                  text: input.description,
                  languageId: input.metadataLanguageId
                }
              },
              create: {
                text: input.description,
                languageId: input.metadataLanguageId
              }
            }
          }
        : undefined,
    imageAlt: {
      connectOrCreate: {
        where: {
          text_languageId: {
            text: input.imageAlt,
            languageId: input.metadataLanguageId
          }
        },
        create: {
          text: input.imageAlt,
          languageId: input.metadataLanguageId
        }
      }
    },
    variantCount: input.variants.length,
    childrenCount: input.childIds.length
  }
  console.log('processing mediaComponent:', input.id)
  const video = await prisma.video.upsert({
    where: { id: input.id },
    create: attributes,
    update: attributes
  })

  await Promise.all(
    input.variants.map(async (variant) => {
      await createVariant(variant, video)
    })
  )

  await Promise.all(
    input.studyQuestions.map(async (studyQuestion) => {
      await createStudyQuestion(studyQuestion, video, input)
    })
  )

  return video
}

async function main(): Promise<void> {
  const usedVideoSlugs: string[] = []
  const languages = await fetchMediaLanguagesAndTransformToLanguages()
  let videos: ArclightVideo[] = []
  let allVideos: ArclightVideo[] = []
  let page = 1
  const startTime = new Date().getTime()
  do {
    videos = await fetchMediaComponentsAndTransformToVideos(
      languages,
      usedVideoSlugs,
      page
    )
    allVideos = [...allVideos, ...videos]
    await Promise.all(
      videos.map(async (video) => {
        usedVideoSlugs.push(video.slug)
        await createVideo(video)
      })
    )
    const duration = new Date().getTime() - startTime
    console.log('importMediaComponents duration(s):', duration * 0.001)
    console.log('importMediaComponents page:', page)
    page++
  } while (videos.length > 0)
  for (const video of allVideos) {
    for (const childId of video.childIds) {
      await prisma.children.upsert({
        where: { parentId_childId: { parentId: video.id, childId } },
        update: {},
        create: {
          parentId: video.id,
          childId
        }
      })
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
