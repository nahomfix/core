// version 1
// increment to trigger re-seed (ie: files other than seed.ts are changed)

import { PrismaClient, Video } from '.prisma/api-arclight-videos-client'
import {
  fetchMediaComponentsAndCreateVideos,
  fetchMediaLanguagesAndTransformToLanguages
} from '../src/libs/arclight'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const usedVideoSlugs = []
  const languages = await fetchMediaLanguagesAndTransformToLanguages()
  let videos: Array<{ video: Video; childIds: string[] }> = []
  let allVideos: Array<{ video: Video; childIds: string[] }> = []
  let page = 1
  const startTime = new Date().getTime()
  do {
    videos = await fetchMediaComponentsAndCreateVideos(
      languages,
      usedVideoSlugs,
      page
    )
    allVideos = [...allVideos, ...videos]
    const duration = new Date().getTime() - startTime
    console.log('importMediaComponents duration(s):', duration * 0.001)
    console.log('importMediaComponents page:', page)
    page++
  } while (videos.length > 0)
  for (const video of allVideos) {
    for (const childId of video.childIds) {
      await prisma.children.upsert({
        where: { parentId_childId: { parentId: video.video.id, childId } },
        update: {},
        create: {
          parentId: video.video.id,
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
