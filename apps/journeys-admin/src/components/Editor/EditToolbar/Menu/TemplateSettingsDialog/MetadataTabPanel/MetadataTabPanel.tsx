import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { useTemplateSettingsForm } from '../useTemplateSettingsForm'

export function MetadataTabPanel(): ReactElement {
  const { values, handleChange } = useTemplateSettingsForm()
  const { t } = useTranslation()
  return (
    <>
      <TextField
        label={t('Title')}
        id="title"
        name="title"
        fullWidth
        value={values.title}
        variant="filled"
        onChange={handleChange}
        helperText={t('Recommended length: six words or shorter')}
      />
      <TextField
        label={t('Description')}
        id="description"
        name="description"
        fullWidth
        value={values.description}
        multiline
        variant="filled"
        rows={3}
        onChange={handleChange}
        helperText={t('Publicly visible on template details page')}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              sx={{ mr: 1 }}
              color="secondary"
              defaultChecked={values.featured}
              onChange={handleChange}
              value={values.featured}
              name="featured"
            />
          }
          componentsProps={{
            typography: { color: 'secondary.main', variant: 'subtitle2' }
          }}
          label={t('Featured')}
        />
      </FormGroup>
    </>
  )
}
