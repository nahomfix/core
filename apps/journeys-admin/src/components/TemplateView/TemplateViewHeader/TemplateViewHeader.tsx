import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { intlFormat, parseISO } from 'date-fns'
import { User } from 'next-firebase-auth'
import { ReactElement, useEffect, useState } from 'react'

import { useJourney } from '@core/journeys/ui/JourneyProvider'

import { JourneyFields_tags as Tag } from '../../../../__generated__/JourneyFields'
import { CreateJourneyButton } from '../CreateJourneyButton'

import { PreviewTemplateButton } from './PreviewTemplateButton'
import { SocialImage } from './SocialImage'
import { TemplateCollectionsButton } from './TemplateCollectionsButton'
import { TemplateCreatorDetails } from './TemplateCreatorDetails/TemplateCreatorDetails'
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
  const [collectionTags, setCollectionTags] = useState<Tag[] | undefined>()
  const hasCreatorDescription = journey?.creatorDescription != null
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  useEffect(() => {
    setCollectionTags(
      journey?.tags.filter(
        (tag) =>
          tag.name[0].value === 'Jesus Film' || tag.name[0].value === 'NUA'
      )
    )
  }, [journey?.tags])

  return (
    <Stack data-testid="JourneysAdminTemplateViewHeader">
      <Typography
        variant="overline"
        sx={{
          color: 'secondary.light',
          display: { xs: 'block', sm: 'none' },
          pb: 4
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
      <Stack direction="row" sx={{ gap: { xs: 4, sm: 7 } }}>
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: '107px', sm: '244px' }
          }}
        >
          <SocialImage hasCreatorDescription={hasCreatorDescription} />
          {hasCreatorDescription && (
            <TemplateCreatorDetails
              creatorDetails={journey?.creatorDescription}
              creatorImage={journey?.creatorImageBlock?.src}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            />
          )}
        </Box>
        <Stack
          direction="column"
          sx={{
            width: '100%'
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              height: 16,
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <Typography
              variant="overline"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                color: 'secondary.light'
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
                {collectionTags.map((tag, i) => (
                  <TemplateCollectionsButton tag={tag} key={tag.id} index={i} />
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
            {journey != null && isPublisher === true && (
              <TemplateEditButton journeyId={journey.id} />
            )}
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, pt: 6 }} gap={2}>
        <CreateJourneyButton signedIn={authUser?.id != null} />
        <PreviewTemplateButton slug={journey?.slug} />
        {journey != null && isPublisher === true && (
          <TemplateEditButton journeyId={journey.id} />
        )}
      </Box>
    </Stack>
  )
}
