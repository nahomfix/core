import { ReactElement, useRef, useState } from 'react'
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded'
import Stack from '@mui/material/Stack'
import sortBy from 'lodash/sortBy'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useTeam } from '../TeamProvider'

interface TeamSelectProps {
  onboarding?: boolean
}
export function TeamSelect({ onboarding }: TeamSelectProps): ReactElement {
  const { query, activeTeam, setActiveTeam } = useTeam()
  const { t } = useTranslation('apps-journeys-admin')
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(onboarding ?? false)

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ overflow: 'hidden', flexGrow: 1 }}
        ref={anchorRef}
      >
        <PeopleOutlineRoundedIcon sx={{ mr: 3, ml: '3px' }} />
        <FormControl variant="standard" sx={{ minWidth: 100 }}>
          <Select
            defaultValue={activeTeam?.id}
            disabled={query.loading}
            displayEmpty
            value={activeTeam?.id ?? ''}
            onChange={(event) => {
              setActiveTeam(
                query?.data?.teams.find(
                  (team) => team.id === event.target.value
                ) ?? null
              )
            }}
            autoWidth
            sx={{
              '> .MuiSelect-select': {
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              }
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
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
                sx={{
                  display: 'block',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}
              >
                {team.title}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem
              value=""
              sx={{
                display: 'block',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              }}
            >
              {t('Shared With Me')}
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 35,
          horizontal: 'left'
        }}
        PaperProps={{
          sx: {
            maxWidth: { xs: 'calc(100% - 30px)', sm: 300 },
            mt: 4,
            position: 'relative',
            overflow: 'visible',
            '&::before': {
              backgroundColor: 'white',
              content: '""',
              display: 'block',
              position: 'absolute',
              width: 12,
              height: 12,
              top: -6,
              transform: 'rotate(45deg)',
              left: { xs: 20, sm: 10 },
              zIndex: 1
            }
          }
        }}
      >
        <Stack spacing={2} p={4}>
          <Typography variant="h6" gutterBottom>
            {t('More journeys here')}
          </Typography>
          <Typography>
            {t(
              'Journeys are grouped by teams. You can switch between teams by using this dropdown.'
            )}
          </Typography>
          <Box textAlign="right">
            <Button onClick={() => setOpen(false)}>{t('Dismiss')}</Button>
          </Box>
        </Stack>
      </Popover>
    </>
  )
}
