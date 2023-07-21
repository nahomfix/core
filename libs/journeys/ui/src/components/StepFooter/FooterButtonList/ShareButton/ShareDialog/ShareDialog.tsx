import { ReactElement } from 'react'
import { useSnackbar } from 'notistack'
import { Dialog } from '@core/shared/ui/Dialog'
import LinkAngled from '@core/shared/ui/icons/LinkAngled'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import FacebookLogo from '@core/shared/ui/icons/FacebookLogo'
import TwitterLogo from '@core/shared/ui/icons/TwitterLogo'

const StyledIconButton = styled(IconButton)<
  IconButtonProps & { href?: string; target?: string; rel?: string }
>(({ theme }) => ({
  width: '40px',
  height: '40px',
  backgroundColor: `${theme.palette.grey[700]}FF`,
  '&:hover': {
    backgroundColor: `${theme.palette.grey[700]}BF`
  },
  m: 2
}))

interface Props {
  url?: string
  open: boolean
  closeDialog: () => void
}

export function ShareDialog({ url, open, closeDialog }: Props): ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation('libs-journeys-ui')

  async function handleCopyLink(): Promise<void> {
    if (url == null) return
    await navigator.clipboard.writeText(url).then(() => {
      enqueueSnackbar(t('Copied to clipboard'), {
        variant: 'success',
        preventDuplicate: true
      })
    })
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      dialogTitle={{
        title: t('Share'),
        closeButton: true
      }}
    >
      <Stack direction="row" justifyContent="space-around">
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ minWidth: '55px' }}
        >
          <StyledIconButton onClick={handleCopyLink} size="large">
            <LinkAngled sx={{ color: 'white' }} />
          </StyledIconButton>
          <Typography variant="caption">{t('Copy Link')}</Typography>
        </Stack>

        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ minWidth: '55px' }}
        >
          <StyledIconButton
            href={`https://www.facebook.com/sharer/sharer.php?u=${url ?? ''}`}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <FacebookLogo sx={{ fontSize: '48px' }} />
          </StyledIconButton>
          <Typography variant="caption">{t('Facebook')}</Typography>
        </Stack>

        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ minWidth: '55px' }}
        >
          <StyledIconButton
            href={`https://twitter.com/intent/tweet?url=${url ?? ''}`}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <TwitterLogo sx={{ fontSize: '48px' }} />
          </StyledIconButton>
          <Typography variant="caption">{t('Twitter')}</Typography>
        </Stack>
      </Stack>
    </Dialog>
  )
}
