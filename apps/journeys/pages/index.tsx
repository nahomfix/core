import { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@core/shared/ui/ThemeProvider'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { createApolloClient } from '../src/libs/apolloClient'
import { graphql } from '../__generated__'
import {
  GetJourneysQuery,
  ThemeMode,
  ThemeName
} from '../__generated__/graphql'
import i18nConfig from '../next-i18next.config'

interface JourneysPageProps {
  journeys: GetJourneysQuery['journeys']
}

function JourneysPage({ journeys }: JourneysPageProps): ReactElement {
  return (
    <ThemeProvider themeName={ThemeName.base} themeMode={ThemeMode.light}>
      <Container>
        {journeys.map(({ id, title, slug }) => (
          <Box key={id} my={2}>
            <Link href={`/${slug}`} passHref>
              <Button variant="contained" color="primary" fullWidth>
                {title}
              </Button>
            </Link>
          </Box>
        ))}
      </Container>
    </ThemeProvider>
  )
}

export const getStaticProps: GetStaticProps<JourneysPageProps> = async (
  context
) => {
  const apolloClient = createApolloClient()
  const { data } = await apolloClient.query({
    query: graphql(`
      query GetJourneys {
        journeys(where: { featured: true }) {
          id
          title
          slug
        }
      }
    `)
  })

  if (data.journeys === null) {
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
        journeys: data.journeys
      },
      revalidate: 60
    }
  }
}

export default JourneysPage
