import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import Plus2Icon from '@core/shared/ui/icons/Plus2'

import { useJourneyCreateMutation } from '../../../../libs/useJourneyCreateMutation'
import { useTeam } from '../../../Team/TeamProvider'

export function AddJourneyButton(): ReactElement {
  const { createJourney } = useJourneyCreateMutation()
  const router = useRouter()
  const { activeTeam } = useTeam()
  const { t } = useTranslation('apps-journeys-admin')

  const handleClick = async (): Promise<void> => {
    const journey = await createJourney()
    if (journey != null) {
      void router.push(`/journeys/${journey.id}/edit`, undefined, {
        shallow: true
      })
    }
  }

  return (
    <>
      {activeTeam != null && (
        <Button
          variant="contained"
          startIcon={<Plus2Icon />}
          size="medium"
          onClick={handleClick}
          sx={{ mt: 3, alignSelf: 'center' }}
          data-testid="AddJourneyButton"
        >
          {t('Create a Journey')}
        </Button>
      )}
    </>
  )
}
