import { MockedProvider } from '@apollo/client/testing'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { JourneyProvider } from '../../../../libs/context'
import { defaultJourney } from '../../data'
import { TitleDialog, JOURNEY_TITLE_UPDATE } from '.'

const onClose = jest.fn()

describe('JourneyView/Menu/TitleDialog', () => {
  it('should not set journey title on close', () => {
    const { getByRole } = render(
      <MockedProvider mocks={[]}>
        <JourneyProvider value={defaultJourney}>
          <TitleDialog open onClose={onClose} />
        </JourneyProvider>
      </MockedProvider>
    )

    fireEvent.change(getByRole('textbox'), { target: { value: 'New Journey' } })
    fireEvent.click(getByRole('button', { name: 'Cancel' }))

    expect(onClose).toBeCalled()
  })

  it('should update journey title on submit', async () => {
    const updatedJourney = {
      title: 'New Journey'
    }

    const result = jest.fn(() => ({
      data: {
        journeyUpdate: {
          id: defaultJourney.id,
          __typename: 'Journey',
          ...updatedJourney
        }
      }
    }))

    const { getByRole, getByText } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: JOURNEY_TITLE_UPDATE,
              variables: {
                id: defaultJourney.id,
                input: updatedJourney
              }
            },
            result
          }
        ]}
      >
        <JourneyProvider value={defaultJourney}>
          <TitleDialog open onClose={onClose} />
        </JourneyProvider>
      </MockedProvider>
    )

    fireEvent.change(getByRole('textbox'), { target: { value: 'New Journey' } })
    fireEvent.click(getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(result).toHaveBeenCalled()
    })
    expect(getByText('Title updated successfully')).toBeInTheDocument()
  })
})
