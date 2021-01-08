import Head from 'next/head'
import { useCallback, useState, useEffect } from "react"
import {
  Layout,
  Card,
  Icon,
  FormLayout,
  TextField,
  Stack,
  Page
} from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'
import Footer from '../components/footer'
import Nominations from '../components/nominations'
import SuccessBanner from '../components/banner'
import Results from '../components/results'

export default function Home() {
  const [query, setQuery] = useState('')
  const [resultsTitle, setResultsTitle] = useState('')
  const [results, setResults] = useState([])
  const [nominations, setNominations] = useState({})
  const [nominated, setNominated] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const handleQuery = useCallback((newQuery) => setQuery(newQuery), [])

  const handleNominate = useCallback((nomination) => {
    setNominations({ ...nominations, [nomination.imdbID]: nomination })
  })

  const handleRemove = useCallback((imdbID) => {
    setNominations(nominations => {
      const { [imdbID]: value, ...remainder } = nominations
      return remainder
    })
  })

  const handleDismiss = useCallback(() => setBannerDismissed(true), [])

  useEffect(() => {
    const savedNominations = window.localStorage.getItem("nominations")
    if (savedNominations) setNominations(JSON.parse(savedNominations))
  }, [])

  useEffect(() => {
    if (query.length <= 2) {
      setResultsTitle('Results')
      setResults([])
      return
    }
    setResultsTitle(`Results for "${query}"`)
    fetch(
      `https://www.omdbapi.com/?apikey=7f720b3d&s=${query}`,
      { method: "GET" }
    )
      .then(res => res.json())
      .then(res => {
        if (res.Response == "True") { setResults(res.Search) }
        else setResults([])
      })
    return
  }, [query])

  useEffect(() => {
    setNominated(Object.keys(nominations).length >= 5)
    window.localStorage.setItem("nominations", JSON.stringify(nominations))
  }, [nominations])

  const banner = (nominated && !bannerDismissed) ?
    <SuccessBanner dismissHandler={handleDismiss} />
    : null

  return (
    <div style={{ "paddingTop": "15vh" }}>
      <Head>
        <title>The Shoppies</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Page
        title="The Shoppies"
        style={{ "maxWidth": "900px" }}
      >
        <Stack vertical>
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Movie title"
                value={query}
                onChange={handleQuery}
                prefix={<Icon source={SearchMinor} color="inkLighter" />}
                placeholder="Search"
              />
            </FormLayout>
          </Card>
          <Layout>
            <Layout.Section oneHalf>
              <Card title={resultsTitle} sectioned>
                <Results
                  resultsList={results}
                  nominations={nominations}
                  nominateHandler={handleNominate}
                />
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card title="Nominations" sectioned>
                {banner}
                <Nominations nominations={nominations} removeHandler={handleRemove} />
              </Card>
            </Layout.Section>
          </Layout>
        </Stack>
      </Page>

      <Footer />
    </div>
  )
}
