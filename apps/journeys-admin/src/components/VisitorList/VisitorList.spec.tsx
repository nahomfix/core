import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import {
    setupIntersectionMocking,
    resetIntersectionMocking,
  } from 'react-intersection-observer/test-utils';
import { GET_VISITORS_CONNECTION, VisitorList } from './VisitorList'

const reportMocks = [
    {
      request: {
        query: GET_VISITORS_CONNECTION,
        variables: { first: 10, teamId: 'jfp-team'}
      },
      result: {
        data: {
          visitorsConnection: {
            edges: [
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "3f40a48a-4146-4394-91a8-4588ded7198b",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "3f40a48a-4146-4394-91a8-4588ded7198b"
              },
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 1",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 1"
              },
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 2",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 2"
              },
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 3",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 3"
              },
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 4",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 4"
              },
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 5",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 5"
              },
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 6",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 6"
              },          
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 7",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 7"
              },
              {
                node: {createdAt: "2022-10-24T21:11:38.637Z",
                id: "Testing 8",
                lastChatStartedAt: null,
                name: null,
                status: null,},
                cursor: "Testing 8"
              },
          ],
            
            pageInfo: {
              endCursor: "8edb26aa-95b1-44ce-b534-f27c455a0ea1",
              hasNextPage: false
            }
          }
        }
      }
    }
]  

beforeEach(() => {
    setupIntersectionMocking(jest.fn);
});
  
afterEach(() => {
    resetIntersectionMocking();
});

describe('VisitorList', () => {
  it('should render the report', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={reportMocks}>
        <VisitorList />
      </MockedProvider>  
    )
    await waitFor(() =>
      expect(getByTestId("The container")).toBeInTheDocument()
    )
  })
  it('should render the correct row header', async () => {
    const { getByText } = render(
      <MockedProvider mocks={reportMocks}>
        <VisitorList />
      </MockedProvider>  
    )
    await waitFor(() =>
      expect(getByText('Name')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Status')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('ID')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Chat started')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Time started')).toBeInTheDocument()
    )
  })
  it('should render the correct row data', async () => {
    const { getByText } = render(
      <MockedProvider mocks={reportMocks}>
        <VisitorList />
      </MockedProvider>  
    )
    await waitFor(() =>
      expect(getByText('3f40a48a-4146-4394-91a8-4588ded7198b')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 1')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 2')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 3')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 4')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 5')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 6')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 7')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByText('Testing 8')).toBeInTheDocument()
    )
  })
})
