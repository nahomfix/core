import { InMemoryCache } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, waitFor } from '@testing-library/react'

import { JourneyProvider } from '@core/journeys/ui/JourneyProvider'

import { GetJourney_journey as Journey } from '../../../../../../__generated__/GetJourney'
import { UserJourneyRole } from '../../../../../../__generated__/globalTypes'
import { GET_USER_INVITES } from '../../../../../libs/useUserInvitesLazyQuery/useUserInvitesLazyQuery'

import { USER_INVITE_REMOVE, USER_JOURNEY_REMOVE } from './RemoveUser'

import { RemoveUser } from '.'

jest.mock('react-i18next', () => ({
  __esModule: true,
  useTranslation: () => {
    return {
      t: (str: string) => str
    }
  }
}))

describe('RemoveUser', () => {
  it('should remove user journey', async () => {
    const handleClick = jest.fn()
    const cache = new InMemoryCache()
    cache.restore({
      ROOT_QUERY: {
        __typename: 'Query',
        userInvites: [{ __ref: `UserInvite:userInviteId` }]
      }
    })

    const result = jest.fn(() => ({
      data: {
        userJourneyRemove: {
          id: 'userJourneyId',
          role: UserJourneyRole.editor,
          journey: {
            id: 'journeyId'
          }
        }
      }
    }))
    const inviteResult = jest.fn(() => ({
      data: {
        userInviteRemove: {
          __typename: 'UserInvite',
          id: 'userInviteId',
          journeyId: 'journeyId',
          acceptedAt: null,
          removedAt: 'dateTime'
        }
      }
    }))
    const { getByRole } = render(
      <JourneyProvider
        value={{
          journey: { id: 'journeyId' } as unknown as Journey,
          variant: 'admin'
        }}
      >
        <MockedProvider
          cache={cache}
          mocks={[
            {
              request: {
                query: USER_JOURNEY_REMOVE,
                variables: {
                  id: 'userJourneyId'
                }
              },
              result
            },
            {
              request: {
                query: USER_INVITE_REMOVE,
                variables: {
                  id: 'userInviteId',
                  journeyId: 'journeyId'
                }
              },
              result: inviteResult
            },
            {
              request: {
                query: GET_USER_INVITES,
                variables: {
                  journeyId: 'journeyId'
                }
              },
              result: {
                data: {
                  userInvites: [
                    {
                      __typename: 'UserInvite',
                      id: 'userInviteId',
                      journeyId: 'journeyId',
                      email: 'invite@email.com',
                      acceptedAt: null,
                      removedAt: null
                    }
                  ]
                }
              }
            }
          ]}
        >
          <RemoveUser
            id="userJourneyId"
            email="invite@email.com"
            onClick={handleClick}
            journeyId="journeyId"
          />
        </MockedProvider>
      </JourneyProvider>
    )

    fireEvent.click(getByRole('menuitem'))
    await waitFor(() => expect(result).toHaveBeenCalled())
    await waitFor(() => expect(inviteResult).toHaveBeenCalled())
    expect(handleClick).toHaveBeenCalled()
    await waitFor(() => {
      expect(cache.extract()?.ROOT_QUERY?.userInvites).toEqual([])
    })
  })

  it('should remove user invite', async () => {
    const handleClick = jest.fn()
    const cache = new InMemoryCache()
    cache.restore({
      ROOT_QUERY: {
        __typename: 'Query',
        userInvites: [{ __ref: `UserInvite:userInviteId` }]
      }
    })

    const result = jest.fn(() => ({
      data: {
        userInviteRemove: {
          __typename: 'UserInvite',
          id: 'userInviteId',
          journeyId: 'journeyId',
          acceptedAt: null,
          removedAt: 'dateTime'
        }
      }
    }))
    const { getByRole } = render(
      <JourneyProvider
        value={{
          journey: { id: 'journeyId' } as unknown as Journey,
          variant: 'admin'
        }}
      >
        <MockedProvider
          cache={cache}
          mocks={[
            {
              request: {
                query: USER_INVITE_REMOVE,
                variables: {
                  id: 'userInviteId',
                  journeyId: 'journeyId'
                }
              },
              result
            }
          ]}
        >
          <RemoveUser
            id="userInviteId"
            onClick={handleClick}
            journeyId="journeyId"
          />
        </MockedProvider>
      </JourneyProvider>
    )

    fireEvent.click(getByRole('menuitem'))
    await waitFor(() => expect(result).toHaveBeenCalled())
    expect(handleClick).toHaveBeenCalled()
    await waitFor(() => {
      expect(cache.extract()?.ROOT_QUERY?.userInvites).toEqual([])
    })
  })
})
