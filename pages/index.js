import Head from 'next/head'
import { useCallback, useState, useEffect } from "react"
import styles from '../styles/Home.module.css'
import {
  Layout,
  Card,
  Icon,
  Link,
  FormLayout,
  TextField,
  Stack,
  Page,
  ResourceList,
  ResourceItem,
  TextStyle,
  Avatar,
  Banner,
  TextContainer
} from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

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

  const banner = nominated && !bannerDismissed ? (
    <TextContainer>
      <Banner
        title="Complete 🎉"
        status="success"
        action={{
          content: 'Keep nominating',
          onClick: () => { setBannerDismissed(true) }
        }}
        onDismiss={() => { setBannerDismissed(true) }}
      >
        <p>Thank you for nominating five movies! You are free to continue nominating.</p>
      </Banner>
    </TextContainer>
  ) : null

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
                <ResourceList
                  resourceName={{ singular: 'Result', plural: 'Results' }}
                  items={results}
                  emptyState="Keep searching!"
                  renderItem={(item) => {
                    const { imdbID, Title, Year, Poster } = item;
                    const shortcutActions = {
                      content: 'Nominate',
                      accessibilityLabel: `Nominate ${Title}`,
                      disabled: Object.keys(nominations).includes(item.imdbID),
                      primary: true,
                      onClick: () => handleNominate(item)
                    }
                    return (
                      <ResourceItem
                        id={imdbID}
                        accessibilityLabel={`Nominate ${Title}`}
                        shortcutActions={shortcutActions}
                        media={<Avatar
                          customer
                          name={Title}
                          source={Poster}
                          initials="OMDB"
                          accessibilityLabel={`Poster for ${Title}`}
                        />}
                      >
                        <h3 style={{ maxWidth: "60%" }}>
                          <TextStyle variation="strong">{Title}</TextStyle>
                        </h3>
                        <p>{Year}</p>
                      </ResourceItem>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card title="Nominations" sectioned>
                {banner}
                <ResourceList
                  resourceName={{ singular: 'Nomination', plural: 'Nominations' }}
                  items={Object.values(nominations)}
                  emptyState="Add your first nomination!"
                  renderItem={(item) => {
                    const { imdbID, Title, Year, Poster } = item;
                    const shortcutActions = {
                      content: 'Remove',
                      accessibilityLabel: `Remove ${Title}`,
                      onClick: () => handleRemove(item.imdbID),
                      destructive: true,
                      outline: true
                    }
                    return (
                      <ResourceItem
                        id={imdbID}
                        accessibilityLabel={`Remove ${Title}`}
                        shortcutActions={shortcutActions}
                      >
                        <h3 style={{ maxWidth: "60%" }}>
                          <TextStyle variation="strong">{Title}</TextStyle>
                        </h3>
                        <p>{Year}</p>
                      </ResourceItem>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
          </Layout>
        </Stack>
      </Page>

      <footer className={styles.footer}>
        <p style={{ padding: "10px" }}> To Shopify ❤️</p>
        <Link
          external
          url="https://github.com/tedspare"
        >
          Ted Spare
        </Link>
      </footer>
    </div>
  )
}
