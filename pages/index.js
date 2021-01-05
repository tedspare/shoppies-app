import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout, Card, FormLayout, TextField } from '@shopify/polaris'

export default function Home() {
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
              <TextField label="Movie title" onChange={console.log} />
            </FormLayout>
          </Card>
          <Card sectioned>
            Results
          </Card>
          <Card sectioned>
            Nominations
          </Card>
        </Layout.AnnotatedSection>
      </Layout>

      <footer className={styles.footer}>
        To Shopify ❤️
        <a
          href="https://github.com/tedspare"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "10px" }}
        >
          Ted Spare
        </a>
      </footer>
    </div>
  )
}
