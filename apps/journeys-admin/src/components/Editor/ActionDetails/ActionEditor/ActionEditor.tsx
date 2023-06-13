import { ReactElement, ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik'
import TextField from '@mui/material/TextField'
import { useJourney } from '@core/journeys/ui/JourneyProvider'
import { gql, useMutation } from '@apollo/client'
import { object, string } from 'yup'
import Typography from '@mui/material/Typography'
import QuestionAnswerOutlined from '@mui/icons-material/QuestionAnswerOutlined'
import WebOutlined from '@mui/icons-material/WebOutlined'
import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import Stack from '@mui/material/Stack'
import { BlockFields_ButtonBlock as ButtonBlock } from '../../../../../__generated__/BlockFields'
import { ActionFields_LinkAction as LinkAction } from '../../../../../__generated__/ActionFields'
import { MultipleLinkActionUpdate } from '../../../../../__generated__/MultipleLinkActionUpdate'

export const MULTIPLE_LINK_ACTION_UPDATE = gql`
  mutation MultipleLinkActionUpdate(
    $id: ID!
    $journeyId: ID!
    $input: LinkActionInput!
  ) {
    blockUpdateLinkAction(id: $id, journeyId: $journeyId, input: $input) {
      gtmEventName
      url
    }
  }
`

interface ActionEditorProps {
  url: string
  goalLabel?: (url: string) => string
  setSelectedAction?: (url: string) => void
}

export function ActionEditor({
  url,
  goalLabel,
  setSelectedAction
}: ActionEditorProps): ReactElement {
  const { journey } = useJourney()

  const blocks = (journey?.blocks ?? [])
    .filter((block) => ((block as ButtonBlock).action as LinkAction) != null)
    .filter(
      (block) => ((block as ButtonBlock).action as LinkAction).url === url
    )

  const [linkActionUpdate] = useMutation<MultipleLinkActionUpdate>(
    MULTIPLE_LINK_ACTION_UPDATE
  )

  // check for valid URL
  function checkURL(value?: string): boolean {
    const protocol = /^\w+:\/\//
    let urlInspect = value ?? ''
    if (!protocol.test(urlInspect)) {
      if (/^mailto:/.test(urlInspect)) return false
      urlInspect = 'https://' + urlInspect
    }
    try {
      return new URL(urlInspect).toString() !== ''
    } catch (error) {
      return false
    }
  }

  const linkActionSchema = object({
    link: string()
      .test('valid-url', 'Invalid URL', checkURL)
      .required('Required')
  })

  async function handleSubmit(src: string): Promise<void> {
    if (journey == null) return
    // checks if url has a protocol
    const url = /^\w+:\/\//.test(src) ? src : `https://${src}`
    blocks.map(async (block) => {
      await linkActionUpdate({
        variables: {
          id: block.id,
          journeyId: journey.id,
          input: {
            url
          }
        },
        update(cache, { data }) {
          if (data?.blockUpdateLinkAction != null) {
            cache.modify({
              id: cache.identify({
                __typename: block.__typename,
                id: block.id
              }),
              fields: {
                action: () => data.blockUpdateLinkAction
              }
            })
          }
        }
      })
    })
    setSelectedAction?.(url)
    goalLabel?.(url)
  }

  let icon: ReactNode
  switch (goalLabel?.(url)) {
    case 'Start a Conversation':
      icon = <QuestionAnswerOutlined sx={{ color: 'secondary.light' }} />
      break
    case 'Link to Bible':
      icon = <MenuBookRounded sx={{ color: 'secondary.light' }} />
      break
    default:
      icon = <WebOutlined sx={{ color: 'secondary.light' }} />
      break
  }

  return (
    <Box sx={{ pt: 6 }} data-testid="ActionEditor">
      <Formik
        initialValues={{
          link: url ?? ''
        }}
        validationSchema={linkActionSchema}
        onSubmit={async (values): Promise<void> => {
          await handleSubmit(values.link)
        }}
        enableReinitialize
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <TextField
              id="link"
              name="link"
              variant="filled"
              label="Navigate to"
              fullWidth
              value={values.link}
              error={touched.link === true && Boolean(errors.link)}
              helperText={touched.link === true && errors.link}
              onBlur={(e) => {
                handleBlur(e)
                errors.link == null && handleSubmit(e.target.value)
              }}
              onChange={handleChange}
            />
          </Form>
        )}
      </Formik>
      <Stack gap={2} direction="row" alignItems="center" sx={{ pt: 3 }}>
        {icon}
        <Typography variant="subtitle2">{goalLabel?.(url)}</Typography>
      </Stack>
    </Box>
  )
}
