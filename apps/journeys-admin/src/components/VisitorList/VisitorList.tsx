import { ReactElement } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import { VisitorEdge } from '../../api-journeys/src/app/__generated__/graphql'

// README: This is the implementation for the visitorList. Imports, DB call, and implementation included

// import { VisitorsConnection } from '../../../api-journeys/src/app/__generated__/graphql'
// import { gql, useQuery } from '@apollo/client'
// import { VisitorList } from '../../src/components/VisitorList'

// const { data } = useQuery<VisitorsConnection>(GET_VISITOR_CONNECTION, {
//   variables: { teamId: 'jfp-team' }
// })

// export const GET_VISITOR_CONNECTION = gql`
//   query VisitorsConnection($teamId: String!) {
//     visitorsConnection(teamId: $teamId) {
//       edges {
//         cursor
//         node {
//           id
//           createdAt
//         }
//       }
//     }
//   }
// `

// {data != null ? <VisitorList {...{ edges: data.edges }} /> : <></>}



interface Props {
  edges: VisitorEdge[]
  onClick?: () => void
}

export function VisitorList({ edges, onClick }: Props): ReactElement {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {edges.map((row) => (
            <TableRow key={row.node.id}>
              <TableCell component="th" scope="row">
                {row.node.id}
              </TableCell>
              <TableCell align="left">{row.node.createdAt}</TableCell>
            </TableRow>
          ))} <Button onCLick={onClick}>
          <TableRow/>Load More</Button>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
