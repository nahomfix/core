import { InView } from 'react-intersection-observer'
import { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { GetVisitorsConnection } from '../../../__generated__/GetVisitorsConnection'
import { VisitorListItem } from './VisitorListItem'

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

const PAGE_SIZE = 10

export interface Column {
  id: string
  headerName?: string
  align?: TableCellProps['align']
  minWidth?: number
}

export function VisitorList(): ReactElement {
  const { loading, data, fetchMore } = useQuery<GetVisitorsConnection>(
    GET_VISITORS_CONNECTION,
    {
      variables: {
        first: PAGE_SIZE,
        // this should be removed when the UI can support team management
        teamId: 'jfp-team'
      }
    }
  )

  const handleInView = async (inView: boolean): Promise<void> => {
    if (
      inView &&
      !loading &&
      data?.visitorsConnection?.pageInfo?.hasNextPage === true
    )
      await fetchMore({
        variables: {
          after: data?.visitorsConnection?.pageInfo?.endCursor
        }
      })
  }

  const columns: Column[] = [
    {
      id: 'status',
      headerName: 'Status',
      minWidth: 80
    },
    { id: 'id', headerName: 'ID' },
    { id: 'name', headerName: 'Name', minWidth: 100 },
    {
      id: 'lastChatStartedAt',
      headerName: 'Chat started',
      minWidth: 150
    },
    {
      id: 'createdAt',
      headerName: 'Time started',
      minWidth: 150
    }
  ]

  return (
    <TableContainer
      sx={{ height: '100%', backgroundColor: 'background.paper' }}
      data-testid="The container"
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                sx={{
                  minWidth: column.minWidth,
                  backgroundColor: 'background.paper'
                }}
              >
                {column.headerName ?? column.id}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.visitorsConnection?.edges?.map(({ node }) => (
            <VisitorListItem visitor={node} columns={columns} key={node.id} />
          ))}
        </TableBody>
      </Table>
      <InView onChange={handleInView} />
    </TableContainer>
  )
}
