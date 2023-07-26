import { ReactElement, useRef, useEffect, CSSProperties } from 'react'
import { styled } from '@mui/material/styles'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import {
  VideoBlockObjectFit,
  VideoBlockSource
} from '../../../../../__generated__/globalTypes'
import { TreeBlock } from '../../../../libs/block'
import { VideoFields } from '../../../Video/__generated__/VideoFields'

import 'videojs-youtube'
import 'video.js/dist/video-js.css'

interface BackgroundVideoProps extends TreeBlock<VideoFields> {
  setLoading: (loading: boolean) => void
}

const StyledVideo = styled('video')(() => ({}))

export function BackgroundVideo({
  source,
  children,
  video,
  videoId,
  startAt,
  endAt,
  objectFit,
  setLoading
}: BackgroundVideoProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<Player>()

  const isYouTube = source === VideoBlockSource.youTube

  // Initiate Video
  useEffect(() => {
    if (videoRef.current != null) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        controls: false,
        controlBar: false,
        bigPlayButton: false,
        preload: 'metadata',
        // Make video fill container instead of set aspect ratio
        fill: true,
        userActions: {
          hotkeys: false,
          doubleClick: false
        },
        hls: {
          limitRenditionByPlayerDimensions: true,
          useDevicePixelRatio: true
        },
        muted: true,
        loop: true,
        responsive: true
        // Don't use poster prop as image isn't optimised
      })
    }
  }, [])

  // Set up video listeners
  useEffect(() => {
    const player = playerRef.current
    if (player != null) {
      // Video jumps to new time and finishes loading
      player.on('ready', () => {
        player.currentTime(startAt ?? 0)
        void player.play()
      })
      player.on('seeked', () => {
        setLoading(false)
      })
      player.on('pause', () => {
        // 2) Loop video if at end
        const currentTime = player.currentTime()
        if (
          currentTime < (startAt ?? 0) ||
          (endAt != null && currentTime >= endAt)
        ) {
          player?.currentTime(startAt ?? 0)
          void player?.play()
        }
      })
      player.on('timeupdate', () => {
        const currentTime = player?.currentTime()
        if (
          currentTime < (startAt ?? 0) ||
          (endAt != null && currentTime >= endAt)
        ) {
          player?.pause()
        }
      })
    }
  }, [playerRef, startAt, endAt, source, video, videoId, setLoading])

  let videoFit: CSSProperties['objectFit']
  if (source === VideoBlockSource.youTube) {
    videoFit = 'contain'
  } else {
    switch (objectFit) {
      case VideoBlockObjectFit.fit:
      case VideoBlockObjectFit.zoomed:
        videoFit = 'contain'
        break
      default:
        videoFit = 'cover'
        break
    }
  }

  return (
    <StyledVideo
      ref={videoRef}
      data-testid="background-video"
      className="video-js"
      playsInline
      sx={{
        '&.video-js.vjs-fill:not(.vjs-audio-only-mode)': {
          height: isYouTube ? 'inherit' : '100%',
          transform: isYouTube
            ? {
                xs: 'scale(4)',
                sm: 'scale(1.3)',
                md: 'scale(2.65)',
                lg: 'scale(1.2)'
              }
            : 'unset',
          bottom: { xs: children.length !== 0 ? 50 : 0, lg: 0 }
        },
        '> .vjs-tech': {
          objectFit: videoFit,
          transform:
            objectFit === VideoBlockObjectFit.zoomed ? 'scale(1.33)' : undefined
        },
        '> .vjs-loading-spinner': {
          zIndex: 1,
          display: isYouTube ? 'none' : 'block'
        },
        pointerEvents: 'none'
      }}
    >
      {source === VideoBlockSource.cloudflare && videoId != null && (
        <source
          src={`https://customer-${
            process.env.NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE ?? ''
          }.cloudflarestream.com/${videoId ?? ''}/manifest/video.m3u8`}
          type="application/x-mpegURL"
        />
      )}
      {source === VideoBlockSource.internal && video?.variant?.hls != null && (
        <source src={video.variant.hls} type="application/x-mpegURL" />
      )}
      {source === VideoBlockSource.youTube && videoId != null && (
        <source
          src={`https://www.youtube.com/embed/${videoId}?start=${
            startAt ?? 0
          }&end=${endAt ?? 0}`}
          type="video/youtube"
        />
      )}
    </StyledVideo>
  )
}
