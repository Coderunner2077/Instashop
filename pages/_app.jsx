import React from "react";
import { Provider as StoreProvider } from "react-redux";
import store from "../store/store";
import { Layout } from "../components";

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
