import fetch from 'node-fetch'
import { aql } from 'arangojs'
import { ArangoDB } from './db'
import { Country, Translation } from './seed'
import { isEmpty } from 'lodash'

// 156
interface WessCountry {
  COUNTRY_NAME: string
  COUNTRY_CODE: string
  AOA_NAME: string
  COUNTRY_POPULATION: number
  LANG_COUNT: number
  GEO_NO: number
}

// 155
interface WessCountryLanguage {
  COUNTRY: string
  GEO_NO: number
  LAN_NAME: string
  LAN_NO: number
  SPEAKERS: number
}

// 154
interface WessLanguage {
  LAN_NO: number
  LAN_NAME: string
  LAN_ALTERNAME_LAN_NO: number
  ISO_CODE: string
  LAN_GEO_NO: number
  COUNTRY_NAME: string
  COUNTRY_CODE: string
  IS_DIALECT: number
}

const db = ArangoDB()

async function getWessCountries(): Promise<WessCountry[]> {
  return await (
    await fetch(
      'https://www.mydigitalwork.space/QueryRunner/rest/QueryAPI/GetData?QueryId=156',
      {
        headers: {
          token: process.env.WESS_API_TOKEN ?? '',
          accept: 'application/json'
        }
      }
    )
  ).json()
}

async function getCountry(countryCode: string): Promise<Country | undefined> {
  const rst = await db.query(aql`
  FOR item IN ${db.collection('countries')}
    FILTER item._key == ${countryCode}
    LIMIT 1
    RETURN item`)
  return await rst.next()
}

async function digestCountry(wessCountry: WessCountry): Promise<void> {
  let country = await getCountry(wessCountry.COUNTRY_CODE)
  if (country == null)
    country = {
      _key: wessCountry.COUNTRY_CODE,
      name: []
    } as unknown as Country

  if (!isEmpty(wessCountry.COUNTRY_NAME)) {
    const name = country.name.find(({ languageId }) => languageId === '529')
    if (name == null)
      country.name.push({
        languageId: '529',
        primary: true,
        value: wessCountry.COUNTRY_NAME
      })
    else name.value = wessCountry.COUNTRY_NAME
  }
  country.aoa =
    isEmpty(wessCountry.AOA_NAME) || wessCountry.AOA_NAME === 'NAME'
      ? undefined
      : wessCountry.AOA_NAME
  country.population = wessCountry.COUNTRY_POPULATION ?? 0
}

async function main(): Promise<void> {
  const wessCountries = await getWessCountries()
  for (const country of wessCountries) {
    await digestCountry(country)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
