import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { expect } from '@storybook/jest'
import { Meta, Story } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { ComponentProps } from 'react'

import { JourneyProvider } from '@core/journeys/ui/JourneyProvider'
import { JourneyFields as Journey } from '@core/journeys/ui/JourneyProvider/__generated__/JourneyFields'

import { UserTeamRole } from '../../../../../../../../__generated__/globalTypes'
import { journeysAdminConfig } from '../../../../../../../libs/storybook'
import { GET_CURRENT_USER } from '../../../../../../../libs/useCurrentUser'
import { GET_USER_TEAMS_AND_INVITES } from '../../../../../../../libs/useUserTeamsAndInvitesQuery/useUserTeamsAndInvitesQuery'
import { ThemeProvider } from '../../../../../../ThemeProvider'

import { GET_ALL_TEAM_HOSTS, HostSidePanel } from './HostSidePanel'

const Demo = {
  ...journeysAdminConfig,
  component: HostSidePanel,
  title: 'Journeys-Admin/Editor/ControlPanel/Attributes/Footer/HostSidePanel'
}

const defaultHost = {
  id: 'hostId',
  __typename: 'Host' as const,
  teamId: 'teamId',
  title: 'Cru International',
  location: null,
  src1: null,
  src2: null
}

const journey = {
  __typename: 'Journey',
  id: 'journeyId',
  seoTitle: 'My awesome journey',
  language: {
    __typename: 'Language',
    id: '529',
    name: [
      {
        value: 'English',
        primary: true,
        __typename: 'Translation'
      }
    ]
  },
  team: { __typename: 'Team', id: 'teamId', title: 'My Team' },
  host: defaultHost
} as unknown as Journey

const user = {
  id: 'userId',
  email: 'admin@email.com'
}

const userMock = {
  request: {
    query: GET_CURRENT_USER
  },
  result: {
    data: {
      me: user
    }
  }
}
const userTeamMock = {
  request: {
    query: GET_USER_TEAMS_AND_INVITES,
    variables: {
      teamId: 'teamId',
      where: { role: [UserTeamRole.manager, UserTeamRole.member] }
    }
  },
  result: {
    data: {
      userTeams: [
        {
          id: 'teamId',
          __typename: 'UserTeam',
          role: UserTeamRole.manager,
          user: {
            __typename: 'User',
            email: user.email,
            firstName: 'User',
            id: user.id,
            imageUrl: 'imageURL',
            lastName: '1'
          }
        }
      ],
      userTeamInvites: []
    }
  }
}
const teamHostsMock = {
  request: {
    query: GET_ALL_TEAM_HOSTS,
    variables: { teamId: journey?.team?.id }
  },
  result: {
    data: {
      hosts: [
        {
          id: '1',
          location: '',
          src1: null,
          src2: null,
          title: `John "The Rock" Geronimo`
        },
        {
          id: '2',
          location: 'Auckland, New Zealand',
          src1: null,
          src2: null,
          title: 'Jian Wei'
        },
        {
          id: '3',
          location: 'Auckland, New Zealand',
          src1: null,
          src2: 'https://tinyurl.com/4b3327yn',
          title: 'Nisal Cottingham'
        },
        {
          id: '4',
          location: 'Tokyo, Japan',
          src1: 'https://tinyurl.com/3bxusmyb',
          src2: 'https://tinyurl.com/mr4a78kb',
          title: 'John G & Siyang C'
        }
      ]
    }
  }
}

const Template: Story<
  ComponentProps<typeof HostSidePanel> & { mocks: MockedResponse[] }
> = ({ mocks, ...args }) => (
  <MockedProvider mocks={mocks}>
    <ThemeProvider>
      <JourneyProvider value={{ ...args, variant: 'admin' }}>
        <HostSidePanel />
      </JourneyProvider>
    </ThemeProvider>
  </MockedProvider>
)

// Default side panels based on host availability
export const Default = Template.bind({})
Default.args = {
  mocks: [userMock, userTeamMock, teamHostsMock],
  journey: { ...journey, host: null }
}

export const Disabled = Template.bind({})
Disabled.args = {
  mocks: [],
  journey: { ...journey, host: null }
}

export const EditHost = Template.bind({})
EditHost.args = {
  ...Default.args,
  journey
}

// Popup side panels
export const SelectHost = Template.bind({})
SelectHost.args = {
  ...Default.args,
  journey: { ...journey, host: null }
}
SelectHost.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await waitFor(() => {
    expect(
      canvas.getByRole('button', { name: 'Select a Host' })
    ).not.toBeDisabled()
  })
  userEvent.click(canvas.getByRole('button', { name: 'Select a Host' }))
  await waitFor(() => {
    expect(canvas.getAllByText('Authors')).toHaveLength(2)
  })
}

export const CreateHost = Template.bind({})
CreateHost.args = {
  ...Default.args,
  journey: { ...journey, host: null }
}
CreateHost.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await waitFor(() => {
    expect(
      canvas.getByRole('button', { name: 'Select a Host' })
    ).not.toBeDisabled()
  })
  userEvent.click(canvas.getByRole('button', { name: 'Select a Host' }))
  expect(canvas.getByRole('button', { name: 'Create New' })).toBeInTheDocument()
  userEvent.click(canvas.getByRole('button', { name: 'Create New' }))
  await waitFor(() => {
    expect(canvas.getAllByText('Create Author')).toHaveLength(2)
  })
}

export const Info = Template.bind({})
Info.args = {
  ...Default.args,
  journey: { ...journey, host: null }
}
Info.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await waitFor(() => {
    expect(
      canvas.getByRole('button', { name: 'Select a Host' })
    ).not.toBeDisabled()
  })
  userEvent.click(canvas.getByRole('button', { name: 'Select a Host' }))
  expect(canvas.getAllByTestId('info')[0]).toBeInTheDocument()
  userEvent.click(canvas.getAllByTestId('info')[0])
  await waitFor(() => {
    expect(canvas.getByText('Information')).toBeInTheDocument()
  })
}

export default Demo as Meta
