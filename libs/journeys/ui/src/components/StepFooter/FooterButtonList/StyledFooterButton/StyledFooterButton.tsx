import Button, { ButtonProps } from '@mui/material/Button'
import { Theme, styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ReactElement, ReactNode } from 'react'

const StyledButton = styled(Button)<ButtonProps & { clicked: boolean }>(
  ({ theme, clicked }) => ({
    minWidth: 46,
    minHeight: 30,
    borderRadius: 100,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.grey[100],
    [theme.breakpoints.down('lg')]: {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? `${theme.palette.grey[200]}26`
          : `${theme.palette.grey[200]}4D`,
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${theme.palette.grey[200]}4D`
            : `${theme.palette.grey[200]}8F`
      },
      border: theme.palette.mode === 'dark' ? 'none' : '0.8px solid #0000000D',
      color:
        theme.palette.mode === 'dark'
          ? `${theme.palette.grey[200]}FF`
          : `${theme.palette.grey[800]}FF`
    },
    ...(clicked
      ? {
          animation: 'bounce 0.5s',
          '@keyframes bounce': {
            '0%': { transform: 'translateY(0)' },
            '40%': { transform: 'translateY(-10px)' },
            '50%': { transform: 'translateY(0)' },
            '60%': { transform: 'translateY(-5px)' },
            '100%': { transform: 'translateY(0)' }
          }
        }
      : {})
  })
)

interface Props {
  onClick: () => void
  children: ReactNode
  clicked?: boolean
}

export function StyledFooterButton({
  onClick,
  children,
  clicked = false
}: Props): ReactElement {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  return (
    <StyledButton onClick={onClick} disableRipple={lgUp} clicked={clicked} sx = {{ px: 3.5, py: 1 }}>
      {children}
    </StyledButton>
  )
}
