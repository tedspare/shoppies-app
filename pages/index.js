import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Shoppies</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Shoppies
        </h1>
      </main>

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
