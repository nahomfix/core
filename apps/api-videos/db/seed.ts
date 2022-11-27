import { aql } from 'arangojs'
import fetch from 'node-fetch'
import slugify from 'slugify'
import { flatten } from 'lodash'
import { VideoType } from '../src/app/__generated__/graphql'
import { ArangoDB } from './db'

interface Video {
  _key: string
}

const db = ArangoDB()

interface MediaComponent {
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

interface MediaComponentLanguage {
  refId: string
  languageId: number
  lengthInMilliseconds: number
  subtitleUrls: {
    vtt?: Array<{
      languageId: number
      url: string
    }>
  }
  streamingUrls: {
    hls: Array<{
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

interface Language {
  languageId: number
  bcp47: string
}

interface Translation {
  value: string
  languageId: string
  primary: boolean
}

interface Download {
  quality: string
  size: number
  url: string
}

interface VideoVariant {
  id: string
  subtitle: Translation[]
  hls?: string
  languageId: string
  duration: number
  downloads: Download[]
}

interface Video {
  type: VideoType
  primaryLanguageId: string
  title: Translation[]
  seoTitle: Translation[]
  snippet: Translation[]
  description: Translation[]
  studyQuestions: Translation[]
  image: string
  imageAlt: Translation[]
  variants: VideoVariant[]
  tagIds: string[]
  slug: Translation[]
  episodeIds: string[]
  noIndex: boolean
}

interface Tag {
  _key: string
  title: Translation[]
}

const tags: Record<string, Tag> = {}

async function getLanguages(): Promise<Language[]> {
  const response: {
    _embedded: { mediaLanguages: Language[] }
  } = await (
    await fetch(
      `https://api.arclight.org/v2/media-languages?limit=5000&filter=default&apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  return response._embedded.mediaLanguages
}

async function getMediaComponents(
  type: 'content' | 'container'
): Promise<MediaComponent[]> {
  const response: {
    _embedded: { mediaComponents: MediaComponent[] }
  } = await (
    await fetch(
      `https://api.arclight.org/v2/media-components?limit=5000&isDeprecated=false&type=${type}&contentTypes=video&apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  return response._embedded.mediaComponents
}

async function getMediaComponentLanguage(
  mediaComponentId: string
): Promise<MediaComponentLanguage[]> {
  const response: {
    _embedded: { mediaComponentLanguage: MediaComponentLanguage[] }
  } = await (
    await fetch(
      `https://api.arclight.org/v2/media-components/${mediaComponentId}/languages?platform=android&apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  return response._embedded.mediaComponentLanguage
}

const usedTitles: string[] = []
function getIteration(slug: string, collection: string[]): string {
  const exists = collection.find((t) => t === slug)
  if (exists != null && slug !== '') {
    const regex = slug.match(/^(.*?)-(\d+)$/)
    const iteration = parseInt(regex?.[2] ?? '1') + 1
    const title = regex?.[1] ?? slug
    const value = `${title}-${iteration}`
    return getIteration(value, collection)
  }
  return slug
}

function getSeoSlug(title: string, collection: string[]): string {
  const slug = slugify(title, { lower: true, remove: /[^a-zA-Z\d\s:]/g })
  const newSlug = getIteration(slug, collection)
  collection.push(newSlug)
  return newSlug
}
async function digestContent(
  languages: Language[],
  mediaComponent: MediaComponent
): Promise<void> {
  const video = await getVideo(mediaComponent.mediaComponentId)
  if (video?.slug != null)
    video.slug.forEach((title) => usedTitles.push(title.value))

  const metadataLanguageId =
    languages
      .find(({ bcp47 }) => bcp47 === mediaComponent.metadataLanguageTag)
      ?.languageId.toString() ?? '529' // english by default

  console.log('content:', mediaComponent.mediaComponentId)

  const variants: VideoVariant[] = []
  for (const mediaComponentLanguage of await getMediaComponentLanguage(
    mediaComponent.mediaComponentId
  )) {
    variants.push(
      await digestMediaComponentLanguage(mediaComponentLanguage, mediaComponent)
    )
  }

  const body = {
    type: VideoType.standalone,
    primaryLanguageId: mediaComponent.primaryLanguageId.toString(),
    title: [
      {
        value: mediaComponent.title,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    seoTitle: [
      {
        value: mediaComponent.title,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    snippet: [
      {
        value: mediaComponent.shortDescription,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    description: [
      {
        value: mediaComponent.longDescription,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    studyQuestions: mediaComponent.studyQuestions.map((studyQuestion) => {
      return {
        languageId: metadataLanguageId,
        value: studyQuestion,
        primary: true
      }
    }),
    image: mediaComponent.imageUrls.mobileCinematicHigh,
    imageAlt: [
      {
        value:
          mediaComponent.title.length <= 100
            ? mediaComponent.title
            : mediaComponent.title.substring(0, 99),
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    tagIds: [],
    episodeIds: [],
    variants,
    slug: video?.slug ?? [
      {
        value: getSeoSlug(mediaComponent.title, usedTitles),
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    noIndex: false
  }

  if (video != null) {
    await db.collection('videos').update(mediaComponent.mediaComponentId, body)
  } else {
    await db
      .collection('videos')
      .save({ _key: mediaComponent.mediaComponentId, ...body })
  }
}

async function digestMediaComponentLanguage(
  mediaComponentLanguage: MediaComponentLanguage,
  mediaComponent: MediaComponent
): Promise<VideoVariant> {
  if (mediaComponent.subType === 'series') {
    return {
      id: mediaComponentLanguage.refId,
      languageId: mediaComponentLanguage.languageId.toString(),
      duration: Math.round(mediaComponentLanguage.lengthInMilliseconds * 0.001),
      subtitle: [],
      downloads: []
    }
  }
  const downloads: Download[] = []
  for (const [key, value] of Object.entries(
    mediaComponentLanguage.downloadUrls
  )) {
    downloads.push({
      quality: key,
      size: value.sizeInBytes,
      url: value.url
    })
  }
  return {
    id: mediaComponentLanguage.refId,
    subtitle:
      mediaComponentLanguage.subtitleUrls.vtt?.map(({ languageId, url }) => ({
        languageId: languageId.toString(),
        value: url,
        primary: languageId === mediaComponentLanguage.languageId
      })) ?? [],
    hls: mediaComponentLanguage.streamingUrls.hls[0].url,
    languageId: mediaComponentLanguage.languageId.toString(),
    duration: Math.round(mediaComponentLanguage.lengthInMilliseconds * 0.001),
    downloads
  }
}

async function getMediaComponentLinks(
  mediaComponentId: string
): Promise<string[]> {
  const response: {
    linkedMediaComponentIds: { contains: string[] }
  } = await (
    await fetch(
      `https://api.arclight.org/v2/media-component-links/${mediaComponentId}?apiKey=${
        process.env.ARCLIGHT_API_KEY ?? ''
      }`
    )
  ).json()
  return response.linkedMediaComponentIds.contains
}

async function digestSeriesContainer(
  mediaComponent,
  languages,
  video
): Promise<Video> {
  if (video?.slug != null)
    video.slug.forEach((title) => usedTitles.push(title.value))
  const metadataLanguageId =
    languages
      .find(({ bcp47 }) => bcp47 === mediaComponent.metadataLanguageTag)
      ?.languageId.toString() ?? '529' // english by default

  const variants: VideoVariant[] = []
  for (const mediaComponentLanguage of await getMediaComponentLanguage(
    mediaComponent.mediaComponentId
  )) {
    variants.push(
      await digestMediaComponentLanguage(mediaComponentLanguage, mediaComponent)
    )
  }

  return {
    _key: mediaComponent.mediaComponentId,
    type: VideoType.playlist,
    primaryLanguageId: mediaComponent.primaryLanguageId.toString(),
    title: [
      {
        value: mediaComponent.title,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    seoTitle: [
      {
        value: mediaComponent.title,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    snippet: [
      {
        value: mediaComponent.shortDescription,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    description: [
      {
        value: mediaComponent.longDescription,
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    studyQuestions: mediaComponent.studyQuestions.map((studyQuestion) => {
      return {
        languageId: metadataLanguageId,
        value: studyQuestion,
        primary: true
      }
    }),
    image: mediaComponent.imageUrls.mobileCinematicHigh,
    imageAlt: [
      {
        value:
          mediaComponent.title.length <= 100
            ? mediaComponent.title
            : mediaComponent.title.substring(0, 99),
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    tagIds: [],
    slug: video?.slug ?? [
      {
        value: getSeoSlug(mediaComponent.title, usedTitles),
        languageId: metadataLanguageId,
        primary: true
      }
    ],
    episodeIds: [],
    variants,
    noIndex: false
  }
}

async function digestContainer(
  languages: Language[],
  mediaComponent: MediaComponent
): Promise<void> {
  console.log('container:', mediaComponent.mediaComponentId)
  let series, existingSeries
  if (mediaComponent.subType === 'series') {
    existingSeries = await getVideo(mediaComponent.mediaComponentId)
    series = await digestSeriesContainer(
      mediaComponent,
      languages,
      existingSeries
    )
  } else {
    const metadataLanguageId =
      languages
        .find(({ bcp47 }) => bcp47 === mediaComponent.metadataLanguageTag)
        ?.languageId.toString() ?? '529' // english by default
    tags[mediaComponent.mediaComponentId] = {
      _key: mediaComponent.mediaComponentId,
      title: [
        {
          value: mediaComponent.title,
          languageId: metadataLanguageId,
          primary: true
        }
      ]
    }
  }
  for (const videoId of await getMediaComponentLinks(
    mediaComponent.mediaComponentId
  )) {
    const video = await getVideo(videoId)
    if (video == null) continue

    if (mediaComponent.subType === 'series') series.episodeIds.push(videoId)

    if (video.tagIds.includes(mediaComponent.mediaComponentId)) continue

    if (mediaComponent.subType === 'series') {
      await db.collection('videos').update(videoId, {
        type: VideoType.episode
      })
    } else {
      await db.collection('videos').update(videoId, {
        tagIds: [...video.tagIds, mediaComponent.mediaComponentId]
      })
    }
  }
  if (mediaComponent.subType === 'series') {
    if (existingSeries != null)
      await db
        .collection('videos')
        .update(mediaComponent.mediaComponentId, series)
    else await db.collection('videos').save(series)
  }
}

async function getVideo(videoId: string): Promise<Video | undefined> {
  const rst = await db.query(aql`
  FOR item IN ${db.collection('videos')}
    FILTER item._key == ${videoId}
    LIMIT 1
    RETURN item`)
  return await rst.next()
}

async function getVideoIds(): Promise<
  Array<{ mediaComponentId: string; languageId: string }>
> {
  const rst = await db.query(aql`
  FOR item IN videos
    RETURN item.variants[
      * RETURN { mediaComponentId: item._key, languageId: CURRENT.languageId }
    ]
  `)
  return flatten(await rst.all())
}

async function sleep(ms = 1000): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

async function getVideoPath(
  mediaComponentId: string,
  languageId: string
): Promise<string | undefined> {
  let retry = 3

  while (retry > 0) {
    try {
      const response = await fetch(
        `https://4b7b842f-ffbe-4829-8117-3138356f72f4.jesusfilm.org/bin/jf/watch.html/${mediaComponentId}/${languageId}`,
        { redirect: 'manual' }
      )
      return (
        response.headers
          .get('location')
          ?.replace('https://www.jesusfilm.org/', '') ?? undefined
      )
    } catch (e) {
      retry = retry - 1
      if (retry === 0) {
        throw e
      }
      console.log('pausing..')
      await sleep()
      console.log('done pausing...')
    }
  }
}

async function main(): Promise<void> {
  // if (!(await db.collection('videos').exists())) {
  //   await db.createCollection('videos', { keyOptions: { type: 'uuid' } })
  // }
  // if (!(await db.collection('videoTags').exists())) {
  //   await db.createCollection('videoTags', { keyOptions: { type: 'uuid' } })
  // }
  // await db.collection('videos').ensureIndex({
  //   name: 'language_id',
  //   type: 'persistent',
  //   fields: ['variants[*].languageId']
  // })
  // const view = {
  //   links: {
  //     videos: {
  //       fields: {
  //         tagIds: {
  //           analyzers: ['identity']
  //         },
  //         variants: {
  //           fields: {
  //             languageId: {
  //               analyzers: ['identity']
  //             },
  //             subtitle: {
  //               fields: {
  //                 languageId: {
  //                   analyzers: ['identity']
  //                 }
  //               }
  //             }
  //           }
  //         },
  //         title: {
  //           fields: {
  //             value: {
  //               analyzers: ['text_en']
  //             }
  //           }
  //         },
  //         type: {
  //           analyzers: ['identity']
  //         },
  //         episodeIds: {
  //           analyzers: ['identity']
  //         },
  //         slug: {
  //           analyzers: ['identity']
  //         }
  //       }
  //     }
  //   }
  // }
  // if (await db.view('videosView').exists()) {
  //   console.log('updating view')
  //   await db.view('videosView').updateProperties(view)
  // } else {
  //   console.log('creating view')
  //   await db.createView('videosView', view)
  // }
  // console.log('view created')
  // const languages = await getLanguages()
  // for (const content of await getMediaComponents('content')) {
  //   await digestContent(languages, content)
  // }
  // for (const container of await getMediaComponents('container')) {
  //   await digestContainer(languages, container)
  // }
  // await db.collection('videos').ensureIndex({
  //   name: 'slug',
  //   type: 'persistent',
  //   fields: ['slug[*].value'],
  //   unique: true
  // })
  // for (const key in tags) {
  //   await db.collection('videoTags').save(
  //     {
  //       _key: tags[key]._key,
  //       title: tags[key].title
  //     },
  //     { overwriteMode: 'update' }
  //   )
  // }
  let offset = 0
  const count = 1
  const videos = await getVideoIds()
  while (offset < videos.length) {
    await Promise.all(
      videos
        .slice(offset, offset + count)
        .map(async ({ mediaComponentId, languageId }) => {
          const path = await getVideoPath(mediaComponentId, languageId)
          console.log('path:', mediaComponentId, languageId, path)
          if (path === undefined) return

          await db.query(aql`
          FOR video in videos
            FILTER video._key == ${mediaComponentId}
            UPDATE video WITH {
              variants: (
                FOR variant IN video.variants
                  RETURN variant.languageId == ${languageId} ?
                    MERGE(variant, { path: ${path}}) : variant
              )
            } IN videos
          `)
        })
    )
    offset = offset + count
  }
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
