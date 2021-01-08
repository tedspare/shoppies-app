import { useCallback, useState, useEffect } from "react"
import { Layout, Card, Stack, Page } from '@shopify/polaris'
import Footer from '../components/footer'
import Nominations from '../components/nominations'
import SuccessBanner from '../components/banner'
import Results from '../components/results'
import SearchBar from '../components/searchbar'
import Header from '../components/header'

/**
 * Main component for rendering the search bar, search results,
 * nominations, and success banner components.
 * 
 * @return {element} Div containing the page header, footer, and
 * Page component containing the layout and sub-components.
 */
export default function Home() {

  /**
   * State initialization with getters and setters
   */

  const [query, setQuery] = useState('')
  const [resultsTitle, setResultsTitle] = useState('')
  const [results, setResults] = useState([])
  const [nominations, setNominations] = useState({})
  const [nominated, setNominated] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [pageTitle, setPageTitle] = useState('The Shoppies')

  /**
   * Event handlers
   */

  // Query (search) from text input
  const handleQuery = useCallback((newQuery) => setQuery(newQuery), [])

  // Nomination of a search result
  const handleNominate = useCallback((nomination) => {
    setNominations({ ...nominations, [nomination.imdbID]: nomination })
  })

  // Nomination removal
  const handleRemove = useCallback((imdbID) => {
    setNominations(nominations => {
      const { [imdbID]: value, ...remainder } = nominations
      return remainder
    })
  })

  // Success banner dismissal
  const handleDismiss = useCallback(() => setBannerDismissed(true), [])

  /**
   * State watchers with side-effects
   */

  // On first mount, check if the user has previously stored nominations
  // If so, get them from local storage and set them to state
  useEffect(() => {
    const savedNominations = window.localStorage.getItem("nominations")
    if (savedNominations) setNominations(JSON.parse(savedNominations))
  }, [])

  // To avoid broad API calls, treat short search terms as empty
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

  // User has nominated five movies - indicate success in several ways
  useEffect(() => {
    if (Object.keys(nominations).length >= 5) {
      setNominated(true)
      setPageTitle('The Shoppies 🎉')
    }
    window.localStorage.setItem("nominations", JSON.stringify(nominations))
  }, [nominations])

  // Render the success banner if the user has completed five nominations
  // and has not yet dismissed the banner
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
