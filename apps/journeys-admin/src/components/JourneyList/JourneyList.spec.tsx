import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { SnackbarProvider } from 'notistack'
import { NextRouter, useRouter } from 'next/router'
import { FlagsProvider } from '@core/shared/ui/FlagsProvider'
import { ThemeProvider } from '../ThemeProvider'
import { JourneyList } from '.'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(() => {
    return {
      query: {
        tab: 'active'
      },
      push: jest.fn()
    }
  })
}))

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

jest.mock('react-i18next', () => ({
  __esModule: true,
  useTranslation: () => {
    return {
      t: (str: string) => str
    }
  }
}))

describe('JourneyList', () => {
  it('should render tab panel', () => {
    const { getByRole } = render(
      <SnackbarProvider>
        <FlagsProvider>
          <MockedProvider>
            <ThemeProvider>
              <JourneyList />
            </ThemeProvider>
          </MockedProvider>
        </FlagsProvider>
      </SnackbarProvider>
    )
    expect(getByRole('tablist')).toBeInTheDocument()
  })

  it('should render report', async () => {
    const { getByTestId } = render(
      <SnackbarProvider>
        <FlagsProvider flags={{ journeysSummaryReport: true }}>
          <MockedProvider>
            <ThemeProvider>
              <JourneyList />
            </ThemeProvider>
          </MockedProvider>
        </FlagsProvider>
      </SnackbarProvider>
    )
    await waitFor(() => {
      expect(getByTestId('powerBi-multipleSummary-report')).toBeInTheDocument()
    })
  })

  it('should show add journey button', () => {
    const { getByRole } = render(
      <SnackbarProvider>
        <FlagsProvider>
          <MockedProvider>
            <ThemeProvider>
              <JourneyList />
            </ThemeProvider>
          </MockedProvider>
        </FlagsProvider>
      </SnackbarProvider>
    )
    expect(getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('should show add journey button', () => {
    mockedUseRouter.mockReturnValue({
      query: { tab: 'active' }
    } as unknown as NextRouter)
    const { getByRole } = render(
      <SnackbarProvider>
        <FlagsProvider>
          <MockedProvider>
            <ThemeProvider>
              <JourneyList />
            </ThemeProvider>
          </MockedProvider>
        </FlagsProvider>
      </SnackbarProvider>
    )
    expect(getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('should hide add journey button', () => {
    mockedUseRouter.mockReturnValue({
      query: { tab: 'trashed' }
    } as unknown as NextRouter)
    const { queryByRole } = render(
      <SnackbarProvider>
        <FlagsProvider>
          <MockedProvider>
            <ThemeProvider>
              <JourneyList />
            </ThemeProvider>
          </MockedProvider>
        </FlagsProvider>
      </SnackbarProvider>
    )
    expect(queryByRole('button', { name: 'Add' })).toBeNull()
  })

  it('should hide add journey button', () => {
    mockedUseRouter.mockReturnValue({
      query: { tab: 'archived' }
    } as unknown as NextRouter)
    const { queryByRole } = render(
      <SnackbarProvider>
        <FlagsProvider>
          <MockedProvider>
            <ThemeProvider>
              <JourneyList />
            </ThemeProvider>
          </MockedProvider>
        </FlagsProvider>
      </SnackbarProvider>
    )
    expect(queryByRole('button', { name: 'Add' })).toBeNull()
  })
})
