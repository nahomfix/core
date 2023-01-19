import { render } from '@testing-library/react'
import { VisitorList } from '.'

const data = {
  edges: [
    {
      node: {
        id: 'Hello',
        createdAt: 'world'
      }
    }
  ]
}
describe('VisitorList', () => {
  it('contains the correct information and fields', async () => {
    const { getByText } = render(<VisitorList {...data} />)

    expect(getByText('Hello')).toBeInTheDocument()
    expect(getByText('world')).toBeInTheDocument()
  })
})
