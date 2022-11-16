import { ReactElement, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { gql, useQuery } from '@apollo/client'
import { Box } from '@mui/material'
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

const PAGE_SIZE = 1

export function VisitorList(): ReactElement {
  const [page, setPage] = useState(0)
  const { loading, data, fetchMore } = useQuery<GetVisitorsConnection>(
    GET_VISITORS_CONNECTION,
    {
      variables: {
        first: 1,
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
    <Box sx={{ height: 'calc(100vh - 48px)' }}>
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
        hideFooterSelectedRowCount
        rowCount={2}
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[1,5,10]}
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        loading={loading}
      />
    </Box>
  )
}
