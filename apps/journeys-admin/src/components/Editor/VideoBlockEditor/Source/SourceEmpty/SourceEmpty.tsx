import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ReactElement } from 'react'

import Plus2Icon from '@core/shared/ui/icons/Plus2'
import VideoOnIcon from '@core/shared/ui/icons/VideoOn'

import { ImageBlockThumbnail } from '../../../ImageBlockThumbnail'

export function SourceEmpty(): ReactElement {
  return (
    <>
      <Box>
        <ImageBlockThumbnail Icon={VideoOnIcon} />
      </Box>
      <Box flexGrow={1} minWidth={0}>
        <Typography variant="subtitle2">Select Video</Typography>
      </Box>
      <Plus2Icon color="primary" />
    </>
  )
}
