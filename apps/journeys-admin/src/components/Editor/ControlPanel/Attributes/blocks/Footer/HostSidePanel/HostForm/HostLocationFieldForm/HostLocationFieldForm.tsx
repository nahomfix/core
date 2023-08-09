import { ReactElement } from 'react'

import { useJourney } from '@core/journeys/ui/JourneyProvider'

import { useHostUpdate } from '../../../../../../../../../libs/useHostUpdate/useHostUpdate'
import { TextFieldForm } from '../../../../../../../../TextFieldForm'

interface HostLocationFieldFormProps {
  empty?: boolean
  disabled?: boolean
}

export function HostLocationFieldForm({
  empty = false,
  disabled
}: HostLocationFieldFormProps): ReactElement {
  const { updateHost } = useHostUpdate()
  const { journey } = useJourney()
  const host = journey?.host

  async function handleSubmit(value: string): Promise<void> {
    if (host != null) {
      const { id, teamId } = host
      await updateHost({ id, teamId, input: { location: value } })
    }
  }

  return (
    <TextFieldForm
      id="hostLocation"
      label="Location"
      disabled={disabled}
      initialValue={empty ? undefined : host?.location ?? ''}
      onSubmit={handleSubmit}
    />
  )
}
