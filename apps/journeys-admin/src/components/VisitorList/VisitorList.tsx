import { ReactElement, useRef, useCallback, useState, useEffect } from 'react'
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

const PAGE_SIZE = 20

export interface Column {
  id: string
  headerName?: string
  align?: TableCellProps['align']
  minWidth?: number
}

export function VisitorList(): ReactElement {
  const { loading, data, fetchMore } = useQuery<GetVisitorsConnection>(
    GET_VISITORS_CONNECTION, {
    variables: {
      first: PAGE_SIZE,
      // this should be removed when the UI can support team management
      teamId: 'jfp-team'
    }
  })

  const tableEl = useRef<HTMLTableColElement>(null)

  const scrollListener = () => {
    if (tableEl.current != null) {
      const bottom = tableEl.current.scrollHeight - tableEl.current.scrollTop < tableEl.current.clientHeight + 100
      if (bottom && data?.visitorsConnection?.pageInfo?.hasNextPage === true && !loading) {
        console.log("Loading More")
        void fetchMore({
          variables: {
            after: data?.visitorsConnection?.pageInfo?.endCursor
          }
        })
      }
    }       
  }

  useEffect(() => {
    const tableRef = tableEl.current
    if (tableRef != null) {
      tableRef.addEventListener('scroll', scrollListener)
      return () => {
        tableRef.removeEventListener('scroll', scrollListener)
      }
    }    
  }, [scrollListener])

  // const handlePageChange = async (): Promise<void> => {
  //   await fetchMore({
  //     variables: {
  //       after: data?.visitorsConnection?.pageInfo?.endCursor
  //     }
  //   })
  // }

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
    <TableContainer sx={{ height: "100%" }} ref={tableEl}>
      <Table stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
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
    </TableContainer>
  )
}
