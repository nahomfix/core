import { gql, useMutation, useSuspenseQuery } from '@apollo/client'
import { useUser } from 'next-firebase-auth'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { ActiveJourneyEditContent } from '@core/journeys/ui/EditorProvider'
import { JOURNEY_FIELDS } from '@core/journeys/ui/JourneyProvider/journeyFields'

import { GetAdminJourney } from '../../../__generated__/GetAdminJourney'
import { Editor } from '../Editor'
import { EditToolbar } from '../Editor/EditToolbar'
import { JourneyEdit } from '../Editor/JourneyEdit'
import { PageWrapper } from '../NewPageWrapper'

interface JourneyEditPageContentProps {
  id: string
  stepId?: string
  view: ActiveJourneyEditContent | undefined
}

export const GET_ADMIN_JOURNEY = gql`
  ${JOURNEY_FIELDS}
  query GetAdminJourney($id: ID!) {
    journey: adminJourney(id: $id, idType: databaseId) {
      ...JourneyFields
    }
  }
`

export const USER_JOURNEY_OPEN = gql`
  mutation UserJourneyOpen($id: ID!) {
    userJourneyOpen(id: $id) {
      id
    }
  }
`

export function JourneyEditPageContent({
  id,
  stepId,
  view
}: JourneyEditPageContentProps): ReactElement {
  const { t } = useTranslation('apps-journeys-admin')
  const user = useUser()
  const { data } = useSuspenseQuery<GetAdminJourney>(GET_ADMIN_JOURNEY, {
    variables: {
      id
    }
  })
  void useMutation(USER_JOURNEY_OPEN, { variables: { id } })

  return (
    <Editor
      journey={data.journey ?? undefined}
      selectedStepId={stepId}
      view={view}
    >
      <PageWrapper
        title={data.journey.title ?? t('Edit Journey')}
        showDrawer
        backHref="/"
        menu={<EditToolbar />}
        user={user}
      >
        <JourneyEdit />
      </PageWrapper>
    </Editor>
  )
}
