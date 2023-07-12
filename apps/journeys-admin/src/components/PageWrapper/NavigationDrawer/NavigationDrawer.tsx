import { ReactElement, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { AuthUser } from 'next-firebase-auth'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, Theme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import ShopRoundedIcon from '@mui/icons-material/ShopRounded'
import ShopTwoRoundedIcon from '@mui/icons-material/ShopTwoRounded'
import Backdrop from '@mui/material/Backdrop'
import Image from 'next/image'
import { useRouter } from 'next/router'
import compact from 'lodash/compact'
import { useQuery } from '@apollo/client'
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import { useTranslation } from 'react-i18next'
import { useFlags } from '@core/shared/ui/FlagsProvider'
import { JourneyStatus, Role } from '../../../../__generated__/globalTypes'
import taskbarIcon from '../../../../public/taskbar-icon.svg'
import nextstepsTitle from '../../../../public/nextsteps-title.svg'
import { GetMe } from '../../../../__generated__/GetMe'
import { GetUserRole } from '../../../../__generated__/GetUserRole'
import { GET_USER_ROLE } from '../../JourneyView/JourneyView'
import { getJourneyTooltip } from '../utils/getJourneyTooltip'
import { GET_ME } from '../../NewPageWrapper/NavigationDrawer'
import { useAdminJourneysQuery } from '../../../libs/useAdminJourneysQuery'
import { UserMenu } from './UserMenu'
import { NavigationListItem } from './NavigationListItem'

const DRAWER_WIDTH = '237px'

export interface NavigationDrawerProps {
  open: boolean
  onClose: (value: boolean) => void
  authUser?: AuthUser
}

const StyledNavigationDrawer = styled(Drawer)(({ theme, open }) => ({
  width: '72px',
  display: 'flex',
  '& .MuiDrawer-paper': {
    border: 0,
    backgroundColor: theme.palette.secondary.dark,
    overflowX: 'hidden',
    ...(open === true && {
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }),
    ...(open === false && {
      width: theme.spacing(18),
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    })
  }
}))

export const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  '& .MuiListItemButton-root, & .MuiListItem-root': {
    paddingLeft: 0,
    marginBottom: 6,
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      width: '72px',
      justifyContent: 'center'
    },
    '& .MuiListItemText-primary': {
      fontSize: '15px',
      fontWeight: 'bold'
    }
  }
})

export function NavigationDrawer({
  open,
  onClose,
  authUser
}: NavigationDrawerProps): ReactElement {
  const { data: activeJourneys } = useAdminJourneysQuery({
    status: [JourneyStatus.draft, JourneyStatus.published]
  })
  const journeys = activeJourneys?.journeys
  const { t } = useTranslation('apps-journeys-admin')
  const router = useRouter()
  const { globalReports } = useFlags()
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)

  const selectedPage = router?.pathname?.split('/')[1]

  const profileOpen = Boolean(profileAnchorEl)
  const handleProfileClick = (event): void => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileClose = (): void => {
    setProfileAnchorEl(null)
  }

  const handleClose = (): void => {
    onClose(!open)
  }

  const { data } = useQuery<GetMe>(GET_ME)
  const { data: userRoleData } = useQuery<GetUserRole>(GET_USER_ROLE)

  const journeyTooltip = getJourneyTooltip(t, journeys, authUser?.id)

  return (
    <StyledNavigationDrawer
      open={open}
      onClose={handleClose}
      variant={smUp ? 'permanent' : 'temporary'}
      anchor="left"
    >
      {open && smUp && <Backdrop open={open} onClick={handleClose} />}
      <StyledList>
        <ListItemButton onClick={handleClose} data-testid="toggle-nav-drawer">
          <ListItemIcon
            sx={{
              '> .MuiSvgIcon-root': {
                color: 'secondary.dark',
                backgroundColor: 'secondary.light',
                borderRadius: 2
              }
            }}
          >
            {open ? <ChevronLeftRounded /> : <ChevronRightRounded />}
          </ListItemIcon>
        </ListItemButton>

        <NavigationListItem
          icon={<ViewCarouselRoundedIcon />}
          label="Discover"
          selected={selectedPage === 'journeys' || selectedPage === ''} // empty string for when page is index. UPDATE when we add the actual index page
          link="/"
          tooltipText={journeyTooltip}
        />

        <NavigationListItem
          icon={<ShopRoundedIcon />}
          label="Templates"
          selected={selectedPage === 'templates'}
          link="/templates"
        />

        {globalReports && (
          <NavigationListItem
            icon={<LeaderboardRoundedIcon />}
            label="Reports"
            selected={selectedPage === 'reports'}
            link="/reports"
          />
        )}

        {authUser != null && data?.me != null && (
          <>
            <Divider sx={{ mb: 2, mx: 6, borderColor: 'secondary.main' }} />

            {userRoleData?.getUserRole?.roles?.includes(Role.publisher) ===
              true && (
              <NavigationListItem
                icon={<ShopTwoRoundedIcon />}
                label="Publisher"
                selected={selectedPage === 'publisher'}
                link="/publisher"
              />
            )}

            <NavigationListItem
              icon={
                <Avatar
                  alt={compact([data.me.firstName, data.me.lastName]).join(' ')}
                  src={data.me.imageUrl ?? undefined}
                  sx={{ width: 24, height: 24 }}
                />
              }
              label="Profile"
              selected={false}
              handleClick={handleProfileClick}
            />
            <UserMenu
              user={data.me}
              profileOpen={profileOpen}
              profileAnchorEl={profileAnchorEl}
              handleProfileClose={handleProfileClose}
              authUser={authUser}
            />
          </>
        )}
      </StyledList>
      <Box sx={{ flexGrow: 1 }} />
      <StyledList>
        <ListItem>
          <ListItemIcon>
            <Image
              src={taskbarIcon}
              width={32}
              height={32}
              layout="fixed"
              alt="Next Steps Logo"
            />
          </ListItemIcon>
          <Box sx={{ display: 'flex' }}>
            <Image
              src={nextstepsTitle}
              width={106}
              height={24}
              layout="fixed"
              alt="Next Steps Title"
            />
          </Box>
        </ListItem>
      </StyledList>
    </StyledNavigationDrawer>
  )
}
