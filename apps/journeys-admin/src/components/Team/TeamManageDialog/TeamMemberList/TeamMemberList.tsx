import { ReactElement, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

import { sortBy } from 'lodash'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Skeleton from '@mui/material/Skeleton'
import ListItemText from '@mui/material/ListItemText'
import { TeamMemberListItem } from '../TeamMemberListItem'
import { useUserTeamsAndInvitesQuery } from '../../../../libs/useUserTeamsAndInvitesQuery'
import { useTeam } from '../../TeamProvider'
import { useCurrentUser } from '../../../../libs/useCurrentUser'
import { GetUserTeamsAndInvites_userTeams as UserTeam } from '../../../../../__generated__/GetUserTeamsAndInvites'
import { UserTeamRole } from '../../../../../__generated__/globalTypes'

export function TeamMemberList({ title }: { title?: string }): ReactElement {
  const { activeTeam } = useTeam()
  const { loadUser, data: currentUser } = useCurrentUser()
  const { data, loading } = useUserTeamsAndInvitesQuery(
    activeTeam != null
      ? {
          teamId: activeTeam.id
        }
      : undefined
  )
  const currentUserTeam: UserTeam | undefined = useMemo(() => {
    return data?.userTeams?.find(({ user: { email } }) => {
      return email === currentUser?.email
    })
  }, [data, currentUser])

  const sortedUserTeams: UserTeam[] = useMemo(() => {
    return (
      sortBy(data?.userTeams ?? [], ({ user: { id } }) =>
        id === currentUser?.id ? 0 : 1
      ) ?? []
    )
  }, [data, currentUser])

  useEffect(() => {
    void loadUser()
  }, [loadUser])

  return (
    <>
      {loading ? (
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          <List>
            {[0, 1, 2].map((i) => (
              <ListItem key={i} sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ alignSelf: 'center' }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={<Skeleton variant="text" width="60%" />}
                  secondary={<Skeleton variant="text" width="30%" />}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <>
          {sortedUserTeams.length > 0 && currentUser != null && (
            <Box>
              <Typography variant="subtitle1"> {title}</Typography>
              <List sx={{ py: 0 }}>
                {sortedUserTeams.map((userTeam) => {
                  return (
                    <TeamMemberListItem
                      key={userTeam.id}
                      user={userTeam}
                      disabled={
                        currentUserTeam?.role !== UserTeamRole.manager ||
                        currentUser.email === userTeam.user.email
                      }
                    />
                  )
                })}
                {data?.userTeamInvites?.map((userTeamInvite) => {
                  return (
                    <TeamMemberListItem
                      key={userTeamInvite.id}
                      user={userTeamInvite}
                      disabled={currentUserTeam?.role !== UserTeamRole.manager}
                    />
                  )
                })}
              </List>
            </Box>
          )}
        </>
      )}
    </>
  )
}
