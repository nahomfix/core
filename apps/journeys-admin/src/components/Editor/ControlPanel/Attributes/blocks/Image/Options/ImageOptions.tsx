import { gql, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { ReactElement } from 'react'

import type { TreeBlock } from '@core/journeys/ui/block'
import { useEditor } from '@core/journeys/ui/EditorProvider'
import { useJourney } from '@core/journeys/ui/JourneyProvider'

import { GetJourney_journey_blocks_ImageBlock as ImageBlock } from '../../../../../../../../__generated__/GetJourney'
import { ImageBlockUpdate } from '../../../../../../../../__generated__/ImageBlockUpdate'
import { ImageBlockEditor } from '../../../../../ImageBlockEditor'

export const IMAGE_BLOCK_UPDATE = gql`
  mutation ImageBlockUpdate(
    $id: ID!
    $journeyId: ID!
    $input: ImageBlockUpdateInput!
  ) {
    imageBlockUpdate(id: $id, journeyId: $journeyId, input: $input) {
      id
      src
      alt
      width
      height
      parentOrder
      blurhash
    }
  }
`

export function ImageOptions(): ReactElement {
  const {
    state: { selectedBlock }
  } = useEditor()
  const { journey } = useJourney()
  const { enqueueSnackbar } = useSnackbar()
  const [imageBlockUpdate, { loading, error }] =
    useMutation<ImageBlockUpdate>(IMAGE_BLOCK_UPDATE)

  const imageBlock = selectedBlock as TreeBlock<ImageBlock>

  const handleImageDelete = async (): Promise<void> => {
    if (journey == null) return

    try {
      await imageBlockUpdate({
        variables: {
          id: imageBlock.id,
          journeyId: journey.id,
          input: {
            src: null
          }
        }
      })
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
        preventDuplicate: true
      })
    }
  }

  const updateImageBlock = async (block: ImageBlock): Promise<void> => {
    if (journey == null) return

    try {
      await imageBlockUpdate({
        variables: {
          id: imageBlock.id,
          journeyId: journey.id,
          input: {
            src: block.src,
            alt: block.alt
          }
        }
      })
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
        preventDuplicate: true
      })
    }
  }

  return (
    <ImageBlockEditor
      onChange={updateImageBlock}
      onDelete={handleImageDelete}
      selectedBlock={imageBlock}
      loading={loading}
      error={error != null}
    />
  )
}
