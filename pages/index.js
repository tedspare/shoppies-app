import Head from 'next/head'
import { useCallback, useState, useEffect } from "react"
import styles from '../styles/Home.module.css'
import { Layout, Card, Icon, Link, FormLayout, TextField, List } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

export default function Home() {
  const [query, setQuery] = useState('')
  const [resultsTitle, setResultsTitle] = useState('')
  const [results, setResults] = useState([])

  const handleQuery = useCallback((newQuery) => setQuery(newQuery), [])

  useEffect(() => {
    if (query.length <= 2) {
      setResultsTitle('Results')
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
    <div className={styles.container}>
      <Head>
        <title>The Shoppies</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Layout>
        <Layout.AnnotatedSection
          title="The Shoppies"
          description="Shopify and your customers will use this information to contact you."
        >
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
          <Card title={resultsTitle} sectioned>
            <List type="bullet">
              {results.map((result) => {
                return <List.Item key={result.imdbID}>{result.Title} ({result.Year})</List.Item>
              })}
            </List>
          </Card>
          <Card title="Nominations" sectioned>
            Nominations
          </Card>
        </Layout.AnnotatedSection>
      </Layout>

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
