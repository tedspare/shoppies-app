import '../styles/globals.css'
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

function App({ Component, pageProps }) {
  return (
    <AppProvider i18n={enTranslations}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App
