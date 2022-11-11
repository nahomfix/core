import { ReactElement } from 'react'
import {
  DataGrid,
  GridEventListener,
  GridRowParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { gql, useQuery } from '@apollo/client'
import { isThisYear, parseISO, intlFormat } from 'date-fns'
import { useRouter } from 'next/router'
import { VisitorStatus } from '../../../__generated__/globalTypes'
import {
  GetVisitorsConnection,
  GetVisitorsConnection_visitorsConnection_edges_node as Visitor
} from '../../../__generated__/GetVisitorsConnection'

export const GET_VISITORS_CONNECTION = gql`
  query GetVisitorsConnection($after: String, $first: Int!, $teamId: String!) {
    visitorsConnection(after: $after, first: $first, teamId: $teamId) {
      edges {
        node {
          id
          status
          name
          lastChatStartedAt
          createdAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

const PAGE_SIZE = 100

function valueGetterStatus(
  params: GridValueGetterParams<unknown, Visitor>
): string {
  switch (params.row.status) {
    case VisitorStatus.star:
      return '⭐'
    case VisitorStatus.prohibited:
      return '🚫'
    case VisitorStatus.checkMarkSymbol:
      return '✅'
    case VisitorStatus.thumbsUp:
      return '👍'
    case VisitorStatus.thumbsDown:
      return '👎'
    case VisitorStatus.partyPopper:
      return '🎉'
    case VisitorStatus.warning:
      return '⚠'
    case VisitorStatus.robotFace:
      return '🤖'
    case VisitorStatus.redExclamationMark:
      return '❗'
    case VisitorStatus.redQuestionMark:
      return '❓'
    default:
      return '⚪️'
  }
}

function valueGetterLastChatStartedAt(
  params: GridValueGetterParams<unknown, Visitor>
): string {
  if (params.row.lastChatStartedAt == null) return ''
  const date = parseISO(params.row.lastChatStartedAt)
  return intlFormat(date, {
    day: 'numeric',
    month: 'long',
    year: isThisYear(date) ? undefined : 'numeric'
  })
}

function valueGetterCreatedAt(
  params: GridValueGetterParams<unknown, Visitor>
): string {
  if (params.row.createdAt == null) return ''
  const date = parseISO(params.row.createdAt)
  return intlFormat(date, {
    day: 'numeric',
    month: 'long',
    year: isThisYear(date) ? undefined : 'numeric'
  })
}

export function VisitorList(): ReactElement {
  const router = useRouter()
  const { loading, data, fetchMore } = useQuery<GetVisitorsConnection>(
    GET_VISITORS_CONNECTION,
    {
      variables: {
        first: 100,
        // this should be removed when the UI can support team management
        teamId: 'jfp-team'
      }
    }
  )

  const handleRowClick: GridEventListener<'rowClick'> = (
    params: GridRowParams<Visitor>
  ) => {
    void router.push(`/reports/visitors/${params.row.id}`)
  }

  const handlePageChange = async (): Promise<void> => {
    await fetchMore({
      variables: {
        after: data?.visitorsConnection?.pageInfo?.endCursor
      }
    })
  }

  return (
    <DataGrid
      rows={data?.visitorsConnection?.edges?.map(({ node }) => node) ?? []}
      columns={[
        {
          field: 'status',
          headerName: 'Status',
          width: 80,
          valueGetter: valueGetterStatus
        },
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 100 },
        {
          field: 'lastChatStartedAt',
          headerName: 'Chat started',
          width: 150,
          valueGetter: valueGetterLastChatStartedAt
        },
        {
          field: 'createdAt',
          headerName: 'Time started',
          width: 150,
          valueGetter: valueGetterCreatedAt
        }
      ]}
      pagination
      pageSize={PAGE_SIZE}
      rowsPerPageOptions={[PAGE_SIZE]}
      paginationMode="server"
      onPageChange={handlePageChange}
      loading={loading}
      sx={{ backgroundColor: 'background.paper' }}
      onRowClick={handleRowClick}
    />
  )
}
