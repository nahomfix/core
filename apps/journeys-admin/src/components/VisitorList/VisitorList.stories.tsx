import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { journeysAdminConfig } from '../../libs/storybook'
import { VisitorList } from '.'

const VisitorListDemo = {
  ...journeysAdminConfig,
  component: VisitorList,
  title: 'Journeys-Admin/VisitorList',
  parameters: {
    ...journeysAdminConfig.parameters,
    layout: 'fullscreen'
  }
}

const Template: Story<ComponentProps<typeof VisitorList>> = ({ ...args }) => (
  <VisitorList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  edges: [
    {
      node: {
        id: 'Hello',
        createdAt: 'world'
      }
    }
  ]
}

export default VisitorListDemo as Meta
