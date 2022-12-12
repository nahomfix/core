import { Meta } from '@storybook/react'
import { parameters as rootParameters } from '../../../../../../.storybook/preview'
import { ThemeDecorator } from '../../components/ThemeDecorator'

// Must set parameters at component level for shared-storybook stories to work
export const sharedUiConfig: Meta = {
  decorators: [
    (Story, context) => (
      <ThemeDecorator
        name={context.parameters.themeName}
        mode={context.parameters.theme ?? context.globals.theme}
        layout={context.parameters.layout}
        rtl={context.parameters.rtl}
        locale={context.parameters.locale}
      >
        <Story />
      </ThemeDecorator>
    )
  ],
  parameters: {
    ...rootParameters
  }
}
