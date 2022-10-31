import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { useRouter } from "next/router";
import store from "../store/store";
import { Layout, Modal } from "../components";
import { SessionProvider } from "next-auth/react";

import '../styles/index.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <StoreProvider store={store}>
        <Layout>
          <Modal />
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </StoreProvider>
    </SessionProvider>
  )
}

export default MyApp
