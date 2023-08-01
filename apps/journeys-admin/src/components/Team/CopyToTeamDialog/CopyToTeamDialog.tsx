import { Dialog } from '@core/shared/ui/Dialog'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import sortBy from 'lodash/sortBy'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Formik, FormikHelpers, FormikValues } from 'formik'
import { object, string } from 'yup'
import TextField from '@mui/material/TextField'
import { useTeam } from '../TeamProvider'

interface DuplicateToTeamDialogProps {
  title: string
  submitLabel?: string
  open: boolean
  onClose: () => void
  submitAction: (teamId: string) => Promise<void>
}

export function CopyToTeamDialog({
  title,
  submitLabel = 'Copy',
  open,
  onClose,
  submitAction
}: DuplicateToTeamDialogProps): ReactElement {
  const { query, setActiveTeam } = useTeam()
  const { t } = useTranslation('apps-journeys-admin')
  function handleClose(): void {
    onClose()
  }

  const copyToSchema = object({
    teamSelect: string().required(t('Please select a valid team'))
  })

  async function handleSubmit(
    values: FormikValues,
    { resetForm }: FormikHelpers<FormikValues>
  ): Promise<void> {
    await setActiveTeam(
      query?.data?.teams.find((team) => team.id === values.teamSelect) ?? null
    )
    await submitAction(values.teamSelect)
    resetForm()
  }

  return (
    <Formik
      initialValues={{ teamSelect: '' }}
      onSubmit={handleSubmit}
      validationSchema={copyToSchema}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <Dialog
          open={open}
          onClose={handleClose}
          dialogTitle={{ title: t(title) }}
          dialogAction={{
            onSubmit: () => {
              if (!isSubmitting) handleSubmit()
            },
            closeLabel: t('Cancel'),
            submitLabel: submitLabel === 'Add' ? t('Add') : t('Copy')
          }}
        >
          <FormControl variant="filled" hiddenLabel fullWidth>
            <TextField
              name="teamSelect"
              select
              error={Boolean(errors.teamSelect)}
              helperText={
                errors.teamSelect ??
                t('Journey will be copied to selected team.')
              }
              variant="filled"
              label={t('Select Team')}
              data-testid="team-duplicate-select"
              disabled={isSubmitting}
              value={values.teamSelect}
              onChange={(e) => {
                handleChange(e)
              }}
              SelectProps={{
                IconComponent: KeyboardArrowDownIcon
              }}
              sx={{
                '& >.MuiFormHelperText-contained': {
                  ml: 0
                }
              }}
            >
              {(query?.data?.teams != null
                ? sortBy(query.data?.teams, 'title')
                : []
              ).map((team) => (
                <MenuItem
                  key={team.id}
                  value={team.id}
                  aria-label={team.title}
                  sx={{
                    display: 'block',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                  }}
                >
                  {team.title}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Dialog>
      )}
    </Formik>
  )
}
