// button.component.tsx

import Button from '@mui/material/Button'
import { ComponentStory, ComponentMeta } from '@storybook/react'

const Demo: ComponentMeta<typeof Button> = {
  title: 'Mui/Button',
  component: Button
}

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Hello World',
  variant: 'contained'
}

export default Demo
