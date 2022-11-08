import { ReactElement, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { gql, useQuery } from '@apollo/client'
import { GetVisitorsConnection } from '../../../__generated__/GetVisitorsConnection'

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

export function VisitorList(): ReactElement {
  const [page, setPage] = useState(0)
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

  const handlePageChange = async (): Promise<void> => {
    await fetchMore({
      variables: {
        after: data?.visitorsConnection?.pageInfo?.endCursor
      }
    })
  }

  return (
    <>
      <DataGrid
        rows={data?.visitorsConnection?.edges?.map(({ node }) => node) ?? []}
        columns={[
          { field: 'id', headerName: 'ID' },
          { field: 'status' },
          { field: 'name' },
          { field: 'lastChatStartedAt', headerName: 'Chat Started' },
          { field: 'createdAt', headerName: 'Time Started' }
        ]}
        pagination
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        loading={loading}
      />
    </>
  )
}
