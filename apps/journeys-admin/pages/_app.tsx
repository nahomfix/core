import { ApolloProvider } from '@apollo/client'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { AppProps as NextJsAppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { SSRConfig, appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { SnackbarProvider } from 'notistack'
import { ReactElement, useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { useTranslation } from 'react-i18next'

import { createEmotionCache } from '@core/shared/ui/createEmotionCache'

import i18nConfig from '../next-i18next.config'
import { HelpScoutBeacon } from '../src/components/HelpScoutBeacon'
import { TeamProvider } from '../src/components/Team/TeamProvider'
import { ThemeProvider } from '../src/components/ThemeProvider'
import { useApollo } from '../src/libs/apolloClient'
import { initAuth } from '../src/libs/firebaseClient/initAuth'

import '../public/swiper-pagination-override.css'

initAuth()
const clientSideEmotionCache = createEmotionCache({})

type JourneysAdminAppProps = NextJsAppProps<{
  userSerialized?: string
}> & {
  pageProps: SSRConfig
  emotionCache?: EmotionCache
}

function JourneysAdminApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: JourneysAdminAppProps): ReactElement {
  const { t } = useTranslation('apps-journeys-admin')

  const user =
    pageProps.userSerialized != null
      ? JSON.parse(pageProps.userSerialized)
      : null

  const token = user?._token ?? ''
  const apolloClient = useApollo(token)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GTM_ID != null)
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID })

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles != null) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

    TagManager.dataLayer({ dataLayer: { userId: user?.id } })
  }, [user])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <DefaultSeo
          titleTemplate={t('%s | Next Steps')}
          defaultTitle={t('Admin | Next Steps')}
        />
        <HelpScoutBeacon />
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link
            rel="preconnect"
            href={process.env.NEXT_PUBLIC_GATEWAY_URL}
            crossOrigin=""
          />
        </Head>
        {process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID != null &&
          process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID !== '' &&
          process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN != null &&
          process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN !== '' && (
            <Script id="datadog-rum">
              {`
             (function(h,o,u,n,d) {
               h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
               d=o.createElement(u);d.async=1;d.src=n
               n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
             })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
             window.DD_RUM.onReady(function() {
               window.DD_RUM.init({
                applicationId: '${
                  process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID ?? ''
                }',
                clientToken: '${
                  process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? ''
                }',
                site: 'datadoghq.com',
                service: 'journeys-admin',
                env: '${process.env.NEXT_PUBLIC_VERCEL_ENV ?? ''}',
                version: '${
                  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? ''
                }',
                sampleRate: 50,
                sessionReplaySampleRate: 10,
                trackInteractions: true,
                defaultPrivacyLevel: 'mask-user-input'
               });
             })
           `}
            </Script>
          )}
        <ApolloProvider client={apolloClient}>
          <TeamProvider>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Component {...pageProps} />
            </SnackbarProvider>
          </TeamProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(JourneysAdminApp, i18nConfig)
