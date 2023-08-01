import { Story, Meta } from '@storybook/react'
import { MockedProvider } from '@apollo/client/testing'
import { SnackbarProvider } from 'notistack'
import noop from 'lodash/noop'
import { simpleComponentConfig } from '../../../../../libs/storybook'
import { TeamProvider } from '../../../../Team/TeamProvider'
import { TrashJourneyDialogProps } from './TrashJourneyDialog'
import { TrashJourneyDialog } from '.'

const TrashJourneyDialogDemo = {
  ...simpleComponentConfig,
  component: TrashJourneyDialog,
  title: 'Journeys-Admin/JourneyList/JourneyCard/Menu/Dialogs'
}

const Template: Story<TrashJourneyDialogProps> = ({ ...args }) => (
  <MockedProvider>
    <SnackbarProvider>
      <TeamProvider>
        <TrashJourneyDialog {...args} />
      </TeamProvider>
    </SnackbarProvider>
  </MockedProvider>
)

export const Trash = Template.bind({})
Trash.args = {
  id: 'journey-id',
  published: false,
  open: true,
  handleClose: noop
}

export default TrashJourneyDialogDemo as Meta
