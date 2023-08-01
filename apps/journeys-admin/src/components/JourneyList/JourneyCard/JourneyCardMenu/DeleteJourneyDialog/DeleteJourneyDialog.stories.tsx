import { Story, Meta } from '@storybook/react'
import { MockedProvider } from '@apollo/client/testing'
import { SnackbarProvider } from 'notistack'
import noop from 'lodash/noop'
import { simpleComponentConfig } from '../../../../../libs/storybook'
import { TeamProvider } from '../../../../Team/TeamProvider'
import { DeleteJourneyDialogProps } from './DeleteJourneyDialog'
import { DeleteJourneyDialog } from '.'

const DeleteJourneyDialogDemo = {
  ...simpleComponentConfig,
  component: DeleteJourneyDialog,
  title: 'Journeys-Admin/JourneyList/JourneyCard/Menu/Dialogs'
}

const Template: Story<DeleteJourneyDialogProps> = ({ ...args }) => (
  <MockedProvider>
    <TeamProvider>
      <SnackbarProvider>
        <DeleteJourneyDialog {...args} />
      </SnackbarProvider>
    </TeamProvider>
  </MockedProvider>
)

export const Delete = Template.bind({})
Delete.args = {
  id: 'journey-id',
  open: true,
  handleClose: noop
}

export default DeleteJourneyDialogDemo as Meta
