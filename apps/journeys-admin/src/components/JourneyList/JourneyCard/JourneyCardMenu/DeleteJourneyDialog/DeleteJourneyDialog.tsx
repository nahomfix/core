import { ReactElement } from 'react'
import { useMutation, gql, ApolloQueryResult } from '@apollo/client'
import Typography from '@mui/material/Typography'
import { Dialog } from '@core/shared/ui/Dialog'
import { useSnackbar } from 'notistack'
import { JourneyDelete } from '../../../../../../__generated__/JourneyDelete'
import { JourneyStatus } from '../../../../../../__generated__/globalTypes'
import { GetAdminJourneys } from '../../../../../../__generated__/GetAdminJourneys'

export const JOURNEY_DELETE = gql`
  mutation JourneyDelete($ids: [ID!]!) {
    journeysDelete(ids: $ids) {
      id
      status
    }
  }
`

export interface DeleteJourneyDialogProps {
  id: string
  open: boolean
  handleClose: () => void
  refetch?: () => Promise<ApolloQueryResult<GetAdminJourneys>>
}

export function DeleteJourneyDialog({
  id,
  open,
  handleClose,
  refetch
}: DeleteJourneyDialogProps): ReactElement {
  const { enqueueSnackbar } = useSnackbar()

  const [deleteJourney] = useMutation<JourneyDelete>(JOURNEY_DELETE, {
    variables: {
      ids: [id]
    },
    optimisticResponse: {
      journeysDelete: [
        {
          id,
          status: JourneyStatus.deleted,
          __typename: 'Journey'
        }
      ]
    }
  })

  async function handleDelete(): Promise<void> {
    try {
      await deleteJourney()
      handleClose()
      enqueueSnackbar('Journey Deleted', {
        variant: 'success',
        preventDuplicate: true
      })
      await refetch?.()
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        preventDuplicate: true
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      dialogTitle={{ title: 'Delete Forever?', closeButton: true }}
      dialogAction={{
        onSubmit: handleDelete,
        submitLabel: 'Delete',
        closeLabel: 'Cancel'
      }}
    >
      <Typography>
        Are you sure you would like to delete the journey immediately? You will
        not be able to undo or restore these journeys.
      </Typography>
    </Dialog>
  )
}
