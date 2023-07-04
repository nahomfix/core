import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { UserTeamRole } from '../../../../../__generated__/globalTypes'
import { GetUserTeams_userTeams as UserTeam } from '../../../../../__generated__/GetUserTeams'
import { TeamMemberListItem, USER_TEAM_UPDATE } from './TeamMemberListItem'

describe('TeamMemberListItem', () => {
  const mockUser: UserTeam = {
    id: 'userTeamId',
    role: UserTeamRole.member,
    __typename: 'UserTeam',
    user: {
      __typename: 'User',
      id: 'userId',
      email: 'edmondshen@gmail.com',
      firstName: 'Edmond',
      lastName: 'Shen',
      imageUrl: 'image'
    }
  }

  const mockCurrentUser: UserTeam = {
    id: 'userTeamId2',
    role: UserTeamRole.manager,
    __typename: 'UserTeam',
    user: {
      __typename: 'User',
      id: 'userId2',
      email: 'tatai@gmail.com',
      firstName: 'Tatai',
      lastName: 'Nikora',
      imageUrl: 'imagetwo'
    }
  }

  const result = jest.fn(() => ({
    data: {
      userTeamUpdate: {
        id: 'userTeamId',
        role: UserTeamRole.guest,
        user: {
          id: 'userId'
        }
      }
    }
  }))

  const mocks = [
    {
      request: {
        query: USER_TEAM_UPDATE,
        variables: {
          userTeamUpdateId: 'userTeamId',
          input: { role: UserTeamRole.guest }
        }
      },
      result
    }
  ]

  it('it should change the team member permissions correctly', async () => {
    const { getByText, getByRole } = render(
      <MockedProvider mocks={mocks}>
        <TeamMemberListItem user={mockUser} currentUser={mockCurrentUser} />
      </MockedProvider>
    )
    fireEvent.click(getByRole('button'))
    fireEvent.click(getByText('Guest'))
    await waitFor(() => {
      expect(result).toHaveBeenCalled()
    })
  })
})
