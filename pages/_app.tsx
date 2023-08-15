import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from '../components/layouts/NextPageWithLayout'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />)
}
