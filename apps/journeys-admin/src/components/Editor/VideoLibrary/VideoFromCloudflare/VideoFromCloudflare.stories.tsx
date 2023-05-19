import { Story, Meta } from '@storybook/react'
import Box from '@mui/material/Box'
import { MockedProvider } from '@apollo/client/testing'
import { simpleComponentConfig } from '../../../../libs/storybook'
import { VideoFromCloudflare } from '.'

const VideoFromCloudflareStory = {
  ...simpleComponentConfig,
  component: VideoFromCloudflare,
  title: 'Journeys-Admin/Editor/VideoLibrary/VideoFromCloudflare',
  argTypes: { onSelect: { action: 'clicked' } }
}

const Template: Story = ({ onSelect }) => (
  <MockedProvider mocks={[]}>
    <Box sx={{ bgcolor: 'background.paper' }}>
      <VideoFromCloudflare onSelect={onSelect} />
    </Box>
  </MockedProvider>
)

export const Default = Template.bind({})

export default VideoFromCloudflareStory as Meta
