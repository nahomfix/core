import { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'

import { MockedProvider } from '@apollo/client/testing'
import { simpleComponentConfig } from '../../../../../../../../libs/storybook'

import { HostAvatarsButton } from './HostAvatarsButton'

const Demo = {
  ...simpleComponentConfig,
  component: HostAvatarsButton,
  title:
    'Journeys-Admin/Editor/ControlPanel/Attributes/Footer/HostForm/HostAvatarsButton'
}

const Template: Story<ComponentProps<typeof HostAvatarsButton>> = ({
  ...args
}) => {
  return (
    <MockedProvider>
      <HostAvatarsButton {...args} />
    </MockedProvider>
  )
}

export const Default = Template.bind({})
Default.play = () => {
  userEvent.click(screen.getByTestId('avatar2'))
}

export const Image = Template.bind({})
Image.args = {
  avatar1Image: {
    id: 'avatar1',
    __typename: 'ImageBlock',
    alt: 'avatar1',
    src: 'https://images.unsplash.com/photo-1508363778367-af363f107cbb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=chester-wade-hLP7lVm4KUE-unsplash.jpg&w=1920',
    parentBlockId: 'none',
    parentOrder: 0,
    width: 44,
    height: 44,
    blurhash: ''
  },
  avatar2Image: {
    id: 'avatar2',
    __typename: 'ImageBlock',
    alt: 'avatar2',
    src: 'https://images.unsplash.com/photo-1447023029226-ef8f6b52e3ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    parentBlockId: 'none',
    parentOrder: 0,
    width: 44,
    height: 44,
    blurhash: ''
  }
}
Image.play = () => {
  userEvent.click(screen.getByTestId('avatar1'))
}

export default Demo as Meta
