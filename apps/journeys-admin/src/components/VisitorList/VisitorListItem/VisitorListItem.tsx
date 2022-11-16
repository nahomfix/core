import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useRouter } from 'next/router'
import { isThisYear, parseISO, intlFormat } from 'date-fns'
import { ReactElement } from 'react'
import { GetVisitorsConnection_visitorsConnection_edges_node as Visitor } from '../../../../__generated__/GetVisitorsConnection'
import { VisitorStatus } from '../../../../__generated__/globalTypes'
import { Column } from '../VisitorList'

function formatStatus(value: string | null): string {
  switch (value) {
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

function formatDate(value: string | null): string {
  if (value == null) return ''
  const date = parseISO(value)
  return intlFormat(date, {
    day: 'numeric',
    month: 'long',
    year: isThisYear(date) ? undefined : 'numeric'
  })
}

interface Props {
  visitor: Visitor
  columns: Column[]
}

export function VisitorListItem({ visitor, columns }: Props): ReactElement {
  const router = useRouter()

  function handleClick(): void {
    void router.push(`/reports/visitors/${visitor.id}`)
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} onClick={handleClick}>
      {columns.map((column) => {
        let value
        switch (column.id) {
          case 'status':
            value = formatStatus(visitor.status)
            break
          case 'lastChatStartedAt':
            value = formatDate(visitor.lastChatStartedAt)
            break
          case 'createdAt':
            value = formatDate(visitor.createdAt)
            break
          default:
            value = visitor[column.id]
        }
        return (
          <TableCell key={column.id} align={column.align}>
            {value}
          </TableCell>
        )
      })}
    </TableRow>
  )
}
