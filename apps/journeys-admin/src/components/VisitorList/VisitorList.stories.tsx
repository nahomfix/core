import { Story, Meta } from '@storybook/react'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { FlagsProvider } from '@core/shared/ui/FlagsProvider'
import { journeysAdminConfig } from '../../libs/storybook'
import { edges, pageInfo } from './VisitorListData'
import { GET_VISITORS_CONNECTION, VisitorList } from './VisitorList'

const VisitorListStory = {
  ...journeysAdminConfig,
  component: VisitorList,
  title: 'Journeys-Admin/VisitorList'
}

const Template: Story = ({ ...args }) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: GET_VISITORS_CONNECTION
        },
        result: {
          data: {
            nodes: [edges, pageInfo]
          }
        }
      }
    ]}
  >
    <FlagsProvider flags={{ templates: true }}>
      <VisitorList input={args.props.nodes[0]} />
    </FlagsProvider>
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  props: {
    nodes: [edges, pageInfo]
  }
}

export default VisitorListStory as Meta
