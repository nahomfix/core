// 'use client'

// import Stack from '@mui/material/Stack'
// import { useRouter } from 'next/router'
// import { useUser, withUser } from 'next-firebase-auth'
// import { NextSeo } from 'next-seo'
// import { ReactElement } from 'react'
// import { useTranslation } from 'react-i18next'

// import { useFlags } from '@core/shared/ui/FlagsProvider'

// import { GetOnboardingJourneys_onboardingJourneys as OnboardingJourneys } from '../__generated__/GetOnboardingJourneys'
// import { JourneyList } from '../src/components/JourneyList'
// import { PageWrapper } from '../src/components/NewPageWrapper'
// import { OnboardingPanelContent } from '../src/components/OnboardingPanelContent'
// import { TeamMenu } from '../src/components/Team/TeamMenu'
// import { TeamSelect } from '../src/components/Team/TeamSelect'

// interface IndexPageProps {
//   onboardingJourneys: OnboardingJourneys[]
// }

// function IndexPage({ onboardingJourneys }: IndexPageProps): ReactElement {
//   const { t } = useTranslation('apps-journeys-admin')
//   const user = useUser()
//   const { teams } = useFlags()
//   const router = useRouter()

//   return (
//     <>
//       <NextSeo title={t('Journeys')} />
//       <PageWrapper
//         title={!teams ? t('Journeys') : undefined}
//         user={user}
//         mainHeaderChildren={
//           teams && (
//             <Stack
//               direction="row"
//               flexGrow={1}
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <TeamSelect onboarding={router.query.onboarding === 'true'} />
//               <TeamMenu />
//             </Stack>
//           )
//         }
//         sidePanelChildren={
//           <OnboardingPanelContent onboardingJourneys={onboardingJourneys} />
//         }
//         sidePanelTitle={t('Create a New Journey')}
//       >
//         <JourneyList user={user} />
//       </PageWrapper>
//     </>
//   )
// }

// export default withUser<IndexPageProps>({
//   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
// })(IndexPage)
