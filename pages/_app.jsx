import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { useRouter } from "next/router";
import store from "../store/store";
import { Layout } from "../components";

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <StoreProvider store={store}>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
