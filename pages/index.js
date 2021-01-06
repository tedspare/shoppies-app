import Head from 'next/head'
import { useCallback, useState, useEffect } from "react"
import styles from '../styles/Home.module.css'
import { Layout, Card, Icon, Link, FormLayout, TextField, List, Stack, Page, Button } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

export default function Home() {
  const [query, setQuery] = useState('')
  const [resultsTitle, setResultsTitle] = useState('')
  const [results, setResults] = useState([])

  const handleQuery = useCallback((newQuery) => setQuery(newQuery), [])

  const handleNominate = (event) => console.log(event)

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
                <List type="bullet">
                  {results.map((result) => {
                    return (
                      <List.Item key={result.imdbID}>
                        <Stack distribution="equalSpacing" alignment="center">
                          <p style={{ "word-wrap": "break-word", width: "250px" }}>{result.Title} ({result.Year})</p>
                          <Button outline size="slim" onClick={handleNominate}>Nominate</Button>
                        </Stack>
                      </List.Item>
                    )
                  })}
                </List>
                {results.length == 0 && <p>Keep searching!</p>}
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card title="Nominations" sectioned>
                Nominations
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
