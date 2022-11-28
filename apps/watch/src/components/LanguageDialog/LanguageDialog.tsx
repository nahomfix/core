import { ReactElement } from 'react'
import { Dialog } from '@core/shared/ui/Dialog'
import { Formik, Form, FormikValues } from 'formik'
import { useQuery, gql } from '@apollo/client'
import { LanguageSelect } from '@core/shared/ui/LanguageSelect'
import { GetVideoLanguages } from '../../../__generated__/GetVideoLanguages'

export const GET_VIDEO_LANGUAGES = gql`
  query GetVideoLanguages($id: ID!, $languageId: ID!) {
    video(id: $id, idType: slug) {
      id
      variant {
        language {
          name(languageId: $languageId) {
            value
            primary
          }
        }
      }
      variantLanguages {
        id
        name {
          value
          primary
        }
      }
    }
  }
`

interface LanguageDialogProps {
  open: boolean
}

export function LanguageDialog({ open }: LanguageDialogProps): ReactElement {
  const { data, loading } = useQuery<GetVideoLanguages>(GET_VIDEO_LANGUAGES, {
    variables: {
      id: '1_jf-0-0',
      languageId: '529'
    }
  })

  // onSubmit change redirect to the right video with right audio

  function handleClose(resetForm: (values: FormikValues) => void): () => void {
    return () => {
      // wait for dialog animation to complete
      setTimeout(
        () =>
          resetForm({
            values: {
              language:
                data?.video != null
                  ? {
                    id: data?.video.id,
                    localName: data?.video.variant?.language?.name.find(
                      ({ primary }) => !primary
                    )?.value,
                    nativeName: data?.video.variant?.language?.name.find(
                      ({ primary }) => primary
                    )?.value
                  }
                  : undefined
            }
          }),
        500
      )
    }
  }

  return (
    <Formik
      initialValues={{
        language: data?.video != null ? {
          id: data?.video.id,
          localName: data?.video.variant?.language?.name.find(
            ({ primary }) => !primary
          )?.value,
          nativeName: data?.video.variant?.language?.name?.find(
            ({ primary }) => primary
          )?.value
        } : undefined
      }}
      onSubmit={() => console.log('I have been clicked')}
    >
      {({ values, resetForm, setFieldValue }) => (
        <Dialog
          open={open}
          onClose={handleClose(resetForm)}
          dialogTitle={{ title: 'Language' }}
        >
          <Form>
            <LanguageSelect
              onChange={(value) => setFieldValue('language', value)}
              value={values.language}
              languages={data?.video?.variantLanguages}
              loading={loading}
            />
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}
