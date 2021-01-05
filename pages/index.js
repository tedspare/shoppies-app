import Head from 'next/head'
import { useCallback, useState } from "react";
import styles from '../styles/Home.module.css'
import { Layout, Card, Icon, Link, FormLayout, TextField } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

export default function Home() {
  const [query, setQuery] = useState('');

  const handleQuery = useCallback((newQuery) => setQuery(newQuery), []);

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
          <Card title="Results" sectioned>
            Results
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
