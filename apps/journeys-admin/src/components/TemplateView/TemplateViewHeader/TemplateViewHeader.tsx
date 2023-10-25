import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { intlFormat, parseISO } from 'date-fns'
import { User } from 'next-firebase-auth'
import { ReactElement } from 'react'

import { useJourney } from '@core/journeys/ui/JourneyProvider'

import { JourneyFields_tags as Tag } from '../../../../__generated__/JourneyFields'
import { SocialImage } from '../../JourneyView/SocialImage'
import { CreateJourneyButton } from '../CreateJourneyButton'

import { PreviewTemplateButton } from './PreviewTemplateButton'
import { TemplateCollectionsButton } from './TemplateCollectionsButton'
import { TemplateEditButton } from './TemplateEditButton/TemplateEditButton'

interface TemplateViewHeaderProps {
  isPublisher: boolean | undefined
  authUser: User
}

export function TemplateViewHeader({
  isPublisher,
  authUser
}: TemplateViewHeaderProps): ReactElement {
  const { journey } = useJourney()
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  let collectionTags: Tag[] | undefined
  const collectionsId = journey?.tags.find(
    (item) => item.name[0].value === 'Collections'
  )?.id
  if (collectionsId != null) {
    collectionTags = journey?.tags.filter(
      (tag) => tag.parentId === collectionsId
    )
  }

  return (
    <Stack data-testid="TemplateViewHeader">
      <Typography
        variant="overline"
        sx={{
          color: 'secondary.light',
          display: { xs: 'block', sm: 'none' },
          pb: 6
        }}
        noWrap
      >
        {journey?.createdAt != null ? (
          intlFormat(parseISO(journey?.createdAt), {
            month: 'long',
            year: 'numeric'
          })
        ) : (
          <Skeleton sx={{ width: '50%', maxWidth: 150 }} />
        )}
      </Typography>
      <Stack direction="row" sx={{ gap: { xs: 4, sm: 6 } }}>
        <Box
          sx={{
            flexShrink: 0
          }}
        >
          <SocialImage height={smUp ? 244 : 107} width={smUp ? 244 : 107} />
        </Box>
        <Stack
          direction="column"
          sx={{
            width: '100%',
            flexShrink: 1
          }}
        >
          <Stack
            direction="row"
            sx={{ height: 16, display: { xs: 'none', sm: 'flex' } }}
          >
            <Typography
              variant="overline"
              sx={{
                mt: collectionTags != null ? -2 : 0,
                display: { xs: 'none', sm: 'flex' }
              }}
              noWrap
            >
              {journey?.createdAt != null ? (
                intlFormat(parseISO(journey?.createdAt), {
                  month: 'long',
                  year: 'numeric'
                })
              ) : (
                <Skeleton sx={{ width: '35%', maxWidth: 150 }} />
              )}
            </Typography>
            {collectionTags != null && collectionTags.length > 0 && (
              <>
                {collectionTags.map((tag) => (
                  <TemplateCollectionsButton tag={tag} key={tag.id} />
                ))}
              </>
            )}
          </Stack>
          <Typography variant={smUp ? 'h1' : 'h6'} sx={{ pb: 4 }}>
            {journey?.title != null ? (
              journey?.title
            ) : (
              <Skeleton
                data-testid="TemplateViewTitleSkeleton"
                sx={{
                  width: { xs: '100%', sm: '50%' },
                  maxWidth: { xs: 200, sm: 400 }
                }}
              />
            )}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {journey?.description != null ? (
              journey.description
            ) : (
              <>
                {[0, 1].map((value) => (
                  <Skeleton key={value} width="100%" />
                ))}
              </>
            )}
          </Typography>

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: 4,
              pt: 4,
              mt: 'auto'
            }}
          >
            <CreateJourneyButton signedIn={authUser?.id != null} />
            <PreviewTemplateButton slug={journey?.slug} />
            {isPublisher === true && <TemplateEditButton />}
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, pt: 6 }} gap={2}>
        <CreateJourneyButton signedIn={authUser?.id != null} />
        <PreviewTemplateButton slug={journey?.slug} />
        {isPublisher === true && authUser.id != null && <TemplateEditButton />}
      </Box>
    </Stack>
  )
}
