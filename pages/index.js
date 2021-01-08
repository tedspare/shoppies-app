import { useCallback, useState, useEffect } from "react"
import { Layout, Card, Stack, Page } from '@shopify/polaris'
import Footer from '../components/footer'
import Nominations from '../components/nominations'
import SuccessBanner from '../components/banner'
import Results from '../components/results'
import SearchBar from '../components/searchbar'
import Header from '../components/header'

export default function Home() {
  const [query, setQuery] = useState('')
  const [resultsTitle, setResultsTitle] = useState('')
  const [results, setResults] = useState([])
  const [nominations, setNominations] = useState({})
  const [nominated, setNominated] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [pageTitle, setPageTitle] = useState('The Shoppies')

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
        setResults(res.Response == "True" ? res.Search : [])
      })
    return
  }, [query])

  useEffect(() => {
    if (Object.keys(nominations).length >= 5) {
      setNominated(true)
      setPageTitle('The Shoppies 🎉')
    }
    window.localStorage.setItem("nominations", JSON.stringify(nominations))
  }, [nominations])

  const banner = (nominated && !bannerDismissed) ?
    <SuccessBanner dismissHandler={handleDismiss} />
    : null

  return (
    <div style={{ "paddingTop": "15vh" }}>
      <Header pageTitle={pageTitle} />
      <Page title="The Shoppies" style={{ "maxWidth": "900px" }}>
        <Stack vertical>
          <Card sectioned>
            <SearchBar query={query} queryHandler={handleQuery} />
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
