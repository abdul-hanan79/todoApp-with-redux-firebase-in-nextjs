import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as React from 'react'
import { Provider } from 'react-redux'
// import store from '../store/store'
import store from '../store/store'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
