import { ReactElement } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ThemeProvider } from '@core/shared/ui/ThemeProvider'
import { transformer } from '@core/journeys/ui/transformer'
import { JourneyProvider } from '@core/journeys/ui/JourneyProvider'
import { getJourneyRTL } from '@core/journeys/ui/rtl'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Conductor } from '../src/components/Conductor'
import { createApolloClient } from '../src/libs/apolloClient'
import i18nConfig from '../next-i18next.config'
import { graphql } from '../__generated__'
import { GetJourneyQuery } from '../__generated__/graphql'

interface JourneyPageProps {
  journey: NonNullable<GetJourneyQuery['journey']>
}

function JourneyPage({ journey }: JourneyPageProps): ReactElement {
  const router = useRouter()
  const { rtl, locale } = getJourneyRTL(journey)
  const isIframe = typeof window !== 'undefined' && window.self !== window.top
  if (isIframe) {
    void router.push('/embed/[journeySlug]', `/embed/${journey.slug}`)
  }
  return (
    <>
      <NextSeo
        title={journey.title}
        description={journey.description ?? undefined}
        openGraph={{
          type: 'website',
          title: journey.seoTitle ?? journey.title,
          url: `https://${
            process.env.NEXT_PUBLIC_VERCEL_URL ?? 'your.nextstep.is'
          }/${journey.slug}`,
          description:
            journey.seoDescription ?? journey.description ?? undefined,
          images:
            journey.primaryImageBlock?.src != null
              ? [
                  {
                    url: journey.primaryImageBlock.src,
                    width: journey.primaryImageBlock.width,
                    height: journey.primaryImageBlock.height,
                    alt: journey.primaryImageBlock.alt,
                    type: 'image/jpeg'
                  }
                ]
              : []
        }}
        facebook={
          process.env.NEXT_PUBLIC_FACEBOOK_APP_ID != null
            ? {
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
              }
            : undefined
        }
        twitter={{
          site: '@YourNextStepIs',
          cardType: 'summary_large_image'
        }}
      />
      <JourneyProvider value={{ journey }}>
        <ThemeProvider
          themeName={journey.themeName}
          themeMode={journey.themeMode}
          rtl={rtl}
          locale={locale}
        >
          {journey.blocks != null && (
            <Conductor blocks={transformer(journey.blocks)} />
          )}
        </ThemeProvider>
      </JourneyProvider>
    </>
  )
}

export const GET_JOURNEY = graphql(`
  query GetJourney($id: ID!) {
    journey(id: $id, idType: slug) {
      ...JourneyFields
    }
  }
`)

export const getStaticProps: GetStaticProps<JourneyPageProps> = async (
  context
) => {
  const apolloClient = createApolloClient()
  const { data } = await apolloClient.query({
    query: GET_JOURNEY,
    variables: {
      id: context.params?.journeySlug
    }
  })

  if (data.journey == null) {
    return {
      props: {
        ...(await serverSideTranslations(
          context.locale ?? 'en',
          ['apps-journeys', 'libs-journeys-ui'],
          i18nConfig
        ))
      },
      notFound: true,
      revalidate: 60
    }
  } else {
    return {
      props: {
        ...(await serverSideTranslations(
          context.locale ?? 'en',
          ['apps-journeys', 'libs-journeys-ui'],
          i18nConfig
        )),
        journey: data.journey
      },
      revalidate: 60
    }
  }
}

export const GET_JOURNEY_SLUGS = graphql(`
  query GetJourneySlugs {
    journeys {
      slug
    }
  }
`)

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = createApolloClient()
  const { data } = await apolloClient.query({
    query: GET_JOURNEY_SLUGS
  })

  const paths = data.journeys.map(({ slug: journeySlug }) => ({
    params: { journeySlug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export default JourneyPage
