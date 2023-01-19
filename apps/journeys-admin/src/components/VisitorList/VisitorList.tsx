import { ReactElement } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { VisitorEdge } from '../../api-journeys/src/app/__generated__/graphql'

interface Props {
  edges: VisitorEdge[]
}

export function VisitorList({ edges }: Props): ReactElement {
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
