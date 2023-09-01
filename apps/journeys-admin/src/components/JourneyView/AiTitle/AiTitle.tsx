import { gql, useQuery } from '@apollo/client'
import Typography from '@mui/material/Typography'
import { ReactElement } from 'react'

import { GetJourneyTitleAi } from '../../../../__generated__/GetJourneyTitleAi'

interface AiTitleProps {
  id: string
}
export const GET_JOURNEY_TITLE_AI = gql`
  query GetJourneyTitleAi($journeyId: ID!) {
    journeyTitleAi(id: $journeyId)
  }
`

export function AiTitle({ id }: AiTitleProps): ReactElement {
  const { data } = useQuery<GetJourneyTitleAi>(GET_JOURNEY_TITLE_AI, {
    variables: { id }
  })

  console.log(id)
  console.log(data)
  return data?.journeyTitleAi != null ? (
    <Typography>Generated{data.journeyTitleAi}</Typography>
  ) : (
    <></>
  )
}
