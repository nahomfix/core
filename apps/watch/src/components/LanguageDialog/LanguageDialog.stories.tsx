import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react'
import { watchConfig } from '../../libs/storybook'
import { GET_VIDEO_LANGUAGES } from './LanguageDialog'
import { LanguageDialog } from '.'

const LanguageDialogStory = {
  ...watchConfig,
  component: LanguageDialog,
  title: 'Watch/LanguageDialog'
}

const Template: Story = () => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: GET_VIDEO_LANGUAGES,
          variables: {
            id: '1_jf-0-0',
            languageId: '529'
          }
        },
        result: {
          data: {
            video: {
              id: '1_jf-0-0',
              variant: {
                language: {
                  __typename: 'Language',
                  name: [
                    {
                      value: 'English',
                      primary: true,
                      __typename: 'Translation'
                    }
                  ]
                }
              },
              variantLanguages: [
                {
                  __typename: 'Language',
                  id: '529',
                  name: [
                    {
                      value: 'English',
                      primary: true,
                      __typename: 'Translation'
                    }
                  ]
                },
                {
                  id: '496',
                  __typename: 'Language',
                  name: [
                    {
                      value: 'Français',
                      primary: true,
                      __typename: 'Translation'
                    },
                    {
                      value: 'French',
                      primary: false,
                      __typename: 'Translation'
                    }
                  ]
                },
                {
                  id: '1106',
                  __typename: 'Language',
                  name: [
                    {
                      value: 'Deutsch',
                      primary: true,
                      __typename: 'Translation'
                    },
                    {
                      value: 'German, Standard',
                      primary: false,
                      __typename: 'Translation'
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    ]}
  >
    <LanguageDialog open />
  </MockedProvider>
)

export const Default = Template.bind({})

export default LanguageDialogStory as Meta