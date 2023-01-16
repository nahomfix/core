import { ReactElement } from 'react'
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { getLaunchDarklyClient } from '@core/shared/ui/getLaunchDarklyClient'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import { PageWrapper } from '../../src/components/PageWrapper'
import i18nConfig from '../../next-i18next.config'
import { VisitorsConnection } from '../../../api-journeys/src/app/__generated__/graphql'
import { MemoizedDynamicReport } from '../../src/components/DynamicPowerBiReport'
import { JourneysReportType } from '../../__generated__/globalTypes'

export const GET_VISITOR_CONNECTION = gql`
  query VisitorsConnection($teamId: String!) {
    visitorsConnection(teamId: $teamId) {
      edges {
        cursor
        node {
          id
          createdAt
        }
      }
    }
  }
`

function ReportsJourneysPage(): ReactElement {
  const router = useRouter()
  const { t } = useTranslation('apps-journeys-admin')
  const AuthUser = useAuthUser()
  const { data } = useQuery<VisitorsConnection>(GET_VISITOR_CONNECTION, {
    variables: { teamId: 'jfp-team' }
  })

  return (
    <>
      <NextSeo title={t('Journeys Report')} />
      <PageWrapper
        title={t('Journeys Report')}
        authUser={AuthUser}
        router={router}
      >
        <Box sx={{ height: 'calc(100vh - 48px)' }}>
          {/* <MemoizedDynamicReport reportType={JourneysReportType.multipleFull} /> */}
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell align="right">Item</TableCell>
                  <TableCell align="right">Quantity&nbsp;(kg)</TableCell>
                  <TableCell align="right">Price&nbsp;($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(data)}
                {/* {data != null ? data.edges.map((row) => (
                  <TableRow key={row.number}>
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="right">{row.item}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow> 
                )): <></>} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PageWrapper>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser, locale }) => {
  const ldUser = {
    key: AuthUser.id as string,
    firstName: AuthUser.displayName ?? undefined,
    email: AuthUser.email ?? undefined
  }
  const launchDarklyClient = await getLaunchDarklyClient(ldUser)
  const flags = (await launchDarklyClient.allFlagsState(ldUser)).toJSON() as {
    [key: string]: boolean | undefined
  }
  return {
    props: {
      flags,
      ...(await serverSideTranslations(
        locale ?? 'en',
        ['apps-journeys-admin', 'libs-journeys-ui'],
        i18nConfig
      ))
    }
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(ReportsJourneysPage)
